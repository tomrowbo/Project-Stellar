'use client';

import createClientCommon from './common-client';

// Client-side methods to interact with the Passkey API
export const passkey = () => {
  // Ensure we're on the client side
  if (typeof window === 'undefined') {
    return null;
  }

  const client = createClientCommon();
  if (!client) return null;
  
  const { account, getFundKeypair, native } = client;
  
  let fundKeypairPromise: Promise<any> | null = null;
  let fundPubkey: string | null = null;
  let fundSigner: any = null;

  // Initialize the funding keypair (lazy loaded)
  const initFundKeypair = async () => {
    if (!fundKeypairPromise) {
      fundKeypairPromise = getFundKeypair();
      const keypair = await fundKeypairPromise;
      fundPubkey = keypair.publicKey();
      fundSigner = await import('@stellar/stellar-sdk/minimal/contract').then(
        ({ basicNodeSigner }) => basicNodeSigner(keypair, process.env.NEXT_PUBLIC_NETWORK_PASSPHRASE || '')
      );
    }
    await fundKeypairPromise;
    return { fundPubkey, fundSigner };
  };

  // Create a new wallet
  const create = async () => {
    try {
      const user = 'Stellar Passkey Demo';
      const {
        keyId: kid,
        keyIdBase64,
        contractId: cid,
        signedTx,
      } = await account.createWallet(user, user);

      await send(signedTx.toXDR());

      localStorage.setItem("stellar:keyId", keyIdBase64);
      
      return { keyId: keyIdBase64, contractId: cid };
    } catch (err: any) {
      console.error("Failed to create wallet:", err);
      throw err;
    }
  };

  // Connect to an existing wallet
  const connect = async () => {
    try {
      const { keyId: kid, keyIdBase64, contractId: cid } = await account.connectWallet({
        getContractId
      });

      localStorage.setItem("stellar:keyId", keyIdBase64);
      
      return { keyId: keyIdBase64, contractId: cid };
    } catch (err: any) {
      console.error("Failed to connect wallet:", err);
      throw err;
    }
  };

  // Fund a wallet with test tokens
  const fund = async (to: string) => {
    try {
      await initFundKeypair();
      
      if (!fundPubkey || !fundSigner) {
        throw new Error("Fund keypair not initialized");
      }
      
      const { built, ...transfer } = await native.transfer({
        to,
        from: fundPubkey,
        amount: BigInt(100 * 10_000_000),
      });

      await transfer.signAuthEntries({
        address: fundPubkey,
        signAuthEntry: (auth: any) => fundSigner.signAuthEntry(auth)
      });

      return await send(built!.toXDR());
    } catch (err: any) {
      console.error("Failed to fund wallet:", err);
      throw err;
    }
  };

  // Send a transaction to the server
  const send = async (xdr: string) => {
    const response = await fetch("/api/send", {
      method: "POST",
      body: xdr,
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }
    
    return response.json();
  };

  // Get signers for a contract
  const getSigners = async (contractId: string) => {
    const response = await fetch(`/api/signers/${contractId}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }
    
    return response.json();
  };

  // Get contract ID from a signer
  const getContractId = async (signer: string) => {
    const response = await fetch(`/api/contract-id/${signer}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }
    
    return response.text();
  };

  // Get token balance
  const getBalance = async (contractId: string) => {
    try {
      const { result } = await native.balance({ id: contractId });
      return result.toString();
    } catch (err: any) {
      console.error("Failed to get balance:", err);
      throw err;
    }
  };

  return {
    create,
    connect,
    fund,
    send,
    getSigners,
    getContractId,
    getBalance,
    account,
  };
};

export default passkey; 