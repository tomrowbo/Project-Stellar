import { Account, Keypair, StrKey } from "@stellar/stellar-sdk/minimal";
import { basicNodeSigner } from "@stellar/stellar-sdk/minimal/contract";
import { Buffer } from "buffer";
import { PasskeyKit, SACClient } from "passkey-kit";
import { Server } from "@stellar/stellar-sdk/minimal/rpc";

// NOTE: Only runs on client-side
const createClientCommon = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  const rpc = new Server(process.env.NEXT_PUBLIC_RPC_URL || '');

  const mockPubkey = StrKey.encodeEd25519PublicKey(Buffer.alloc(32));
  const mockSource = new Account(mockPubkey, '0');

  const account = new PasskeyKit({
    rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || '',
    networkPassphrase: process.env.NEXT_PUBLIC_NETWORK_PASSPHRASE || '',
    walletWasmHash: process.env.NEXT_PUBLIC_WALLET_WASM_HASH || '',
  });

  const getFundKeypair = async (): Promise<Keypair> => {
    const now = new Date();
    now.setMinutes(0, 0, 0);
    const nowData = new TextEncoder().encode(now.getTime().toString());
    const hashBuffer = crypto.subtle ? await crypto.subtle.digest('SHA-256', nowData) : crypto.getRandomValues(new Uint8Array(32)).buffer;
    const keypair = Keypair.fromRawEd25519Seed(Buffer.from(hashBuffer));
    const publicKey = keypair.publicKey();

    rpc.getAccount(publicKey)
      .catch(() => rpc.requestAirdrop(publicKey))
      .then(console.log)
      .catch(() => { });

    return keypair;
  };

  const sac = new SACClient({
    rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || '',
    networkPassphrase: process.env.NEXT_PUBLIC_NETWORK_PASSPHRASE || '',
  });

  const native = sac.getSACClient(process.env.NEXT_PUBLIC_NATIVE_CONTRACT_ID || '');

  return {
    rpc,
    mockPubkey,
    mockSource,
    account,
    getFundKeypair,
    sac,
    native,
  };
};

export default createClientCommon; 