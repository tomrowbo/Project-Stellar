'use client';

import { useState, useEffect, useRef } from 'react';
import { SignerKey } from 'passkey-kit';
import useKeyId from '@/store/keyId';
import useContractId from '@/store/contractId';
import passkey from '@/lib/passkey';

export default function PasskeyWallet() {
  const { keyId, setKeyId } = useKeyId();
  const { contractId, setContractId } = useContractId();
  const [balance, setBalance] = useState<string>('0');
  const [signers, setSigners] = useState<any[]>([]);
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  // Add connection state to prevent infinite loops
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const connectionAttempted = useRef(false);

  // Initialize the passkey client
  const passkeyClient = typeof window !== 'undefined' ? passkey() : null;

  // Connect existing wallet on load if we have a key ID
  useEffect(() => {
    async function connectExisting() {
      // Prevent multiple connection attempts and loops
      if (!passkeyClient || !keyId || connectionAttempted.current || isConnected) return;
      
      connectionAttempted.current = true;
      
      try {
        setLoading(prev => ({ ...prev, connect: true }));
        const { contractId: cid } = await passkeyClient.connect();
        setContractId(cid);
        setIsConnected(true);
        
        // Get initial balance and signers
        await getBalance();
        await getSigners();
      } catch (err: any) {
        console.error('Error connecting wallet:', err);
        // Don't show alert for abort errors to avoid dialog loops
        if (!err.message.includes('abort')) {
          alert(err.message);
        }
      } finally {
        setLoading(prev => ({ ...prev, connect: false }));
      }
    }

    connectExisting();
  }, [keyId, passkeyClient, isConnected]);

  // Create a new wallet
  async function handleCreate() {
    if (!passkeyClient || isConnected) return;
    
    try {
      setLoading(prev => ({ ...prev, create: true }));
      
      const { keyId: newKeyId, contractId: newContractId } = await passkeyClient.create();
      setKeyId(newKeyId);
      setContractId(newContractId);
      setIsConnected(true);
      
      // Fund the new wallet
      await passkeyClient.fund(newContractId);
      
      // Update balance and signers
      await getBalance();
      await getSigners();
    } catch (err: any) {
      console.error('Error creating wallet:', err);
      alert(err.message);
    } finally {
      setLoading(prev => ({ ...prev, create: false }));
    }
  }

  // Connect to existing wallet
  async function handleConnect() {
    if (!passkeyClient || isConnected) return;
    
    try {
      setLoading(prev => ({ ...prev, connect: true }));
      
      const { keyId: newKeyId, contractId: newContractId } = await passkeyClient.connect();
      setKeyId(newKeyId);
      setContractId(newContractId);
      setIsConnected(true);
      
      // Update balance and signers
      await getBalance();
      await getSigners();
    } catch (err: any) {
      console.error('Error connecting wallet:', err);
      // Don't show alert for abort errors to avoid dialog loops
      if (!err.message.includes('abort')) {
        alert(err.message);
      }
    } finally {
      setLoading(prev => ({ ...prev, connect: false }));
    }
  }

  // Fund the wallet
  async function handleFund() {
    if (!passkeyClient || !contractId) return;
    
    try {
      setLoading(prev => ({ ...prev, fund: true }));
      
      await passkeyClient.fund(contractId);
      await getBalance();
    } catch (err: any) {
      console.error('Error funding wallet:', err);
      alert(err.message);
    } finally {
      setLoading(prev => ({ ...prev, fund: false }));
    }
  }

  // Get the wallet balance
  async function getBalance() {
    if (!passkeyClient || !contractId) return;
    
    try {
      setLoading(prev => ({ ...prev, balance: true }));
      
      const balance = await passkeyClient.getBalance(contractId);
      setBalance(balance);
    } catch (err: any) {
      console.error('Error getting balance:', err);
    } finally {
      setLoading(prev => ({ ...prev, balance: false }));
    }
  }

  // Get wallet signers
  async function getSigners() {
    if (!passkeyClient || !contractId) return;
    
    try {
      setLoading(prev => ({ ...prev, signers: true }));
      
      const signers = await passkeyClient.getSigners(contractId);
      setSigners(signers);
    } catch (err: any) {
      console.error('Error getting signers:', err);
    } finally {
      setLoading(prev => ({ ...prev, signers: false }));
    }
  }

  // Remove a signer
  async function handleRemoveSigner(signer: string) {
    if (!passkeyClient || !keyId || !contractId) return;
    
    try {
      setLoading(prev => ({ ...prev, [signer]: true }));
      
      let transaction;
      
      if (signer.startsWith('G')) {
        // Ed25519 key
        transaction = await passkeyClient.account.remove(SignerKey.Ed25519(signer));
      } else {
        // Secp256r1 key (WebAuthn)
        transaction = await passkeyClient.account.remove(SignerKey.Secp256r1(signer));
      }
      
      await passkeyClient.account.sign(transaction, { keyId });
      await passkeyClient.send(transaction.built!.toXDR());
      
      // Refresh signers
      await getSigners();
    } catch (err: any) {
      console.error('Error removing signer:', err);
      alert(err.message);
    } finally {
      setLoading(prev => ({ ...prev, [signer]: false }));
    }
  }

  // Reset/logout
  function handleLogout() {
    localStorage.removeItem('stellar:keyId');
    setKeyId(null);
    setContractId(null);
    setBalance('0');
    setSigners([]);
    setIsConnected(false);
    connectionAttempted.current = false;
  }

  return (
    <div className="space-y-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Stellar Passkey Wallet</h2>
        
        {/* Wallet Status */}
        {keyId && contractId && isConnected ? (
          <div className="mb-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Contract ID:</span>
              <a
                href={`https://stellar.expert/explorer/testnet/contract/${contractId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline truncate max-w-[250px]"
              >
                {contractId.substring(0, 6)}...{contractId.substring(contractId.length - 6)}
              </a>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Key ID:</span>
              <span className="truncate max-w-[250px]">
                {keyId.substring(0, 6)}...{keyId.substring(keyId.length - 6)}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Balance:</span>
              <span className="font-semibold">
                {loading.balance ? (
                  <span className="text-gray-400">Loading...</span>
                ) : (
                  <span>{(parseInt(balance) / 10000000).toFixed(7)} XLM</span>
                )}
              </span>
            </div>
            
            <div className="mt-4 flex space-x-3">
              <button
                onClick={handleFund}
                disabled={loading.fund}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
              >
                {loading.fund ? 'Funding...' : 'Fund'}
              </button>
              
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
              >
                Reset
              </button>
            </div>
          </div>
        ) : (
          <div className="flex space-x-3 mb-6">
            <button
              onClick={handleCreate}
              disabled={loading.create || loading.connect}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
            >
              {loading.create ? 'Creating...' : 'Create Wallet'}
            </button>
            
            <button
              onClick={handleConnect}
              disabled={loading.connect || loading.create}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
            >
              {loading.connect ? 'Connecting...' : 'Connect Wallet'}
            </button>
          </div>
        )}
        
        {/* Signers Section */}
        {keyId && contractId && isConnected && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Signers</h3>
            {loading.signers ? (
              <p className="text-gray-500">Loading signers...</p>
            ) : signers.length > 0 ? (
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {signers.map((signer) => (
                      <tr key={signer.key}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {signer.kind}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-[200px]">
                          {signer.key.substring(0, 6)}...{signer.key.substring(signer.key.length - 6)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => handleRemoveSigner(signer.key)}
                            disabled={loading[signer.key]}
                            className="text-red-600 hover:text-red-900 disabled:opacity-50"
                          >
                            {loading[signer.key] ? 'Removing...' : 'Remove'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No signers found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 