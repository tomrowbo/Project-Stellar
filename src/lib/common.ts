import { PasskeyKit, PasskeyServer, SACClient } from "passkey-kit";
import { Account, Keypair, StrKey } from "@stellar/stellar-sdk/minimal";
import { Buffer } from "buffer";
import { basicNodeSigner } from "@stellar/stellar-sdk/minimal/contract";
import { Server } from "@stellar/stellar-sdk/minimal/rpc";

// Environment variables
const ENV = {
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || '',
  networkPassphrase: process.env.NEXT_PUBLIC_NETWORK_PASSPHRASE || '',
  walletWasmHash: process.env.NEXT_PUBLIC_WALLET_WASM_HASH || '',
  launchtubeUrl: process.env.NEXT_PUBLIC_LAUNCHTUBE_URL || '',
  launchtubeJwt: process.env.NEXT_PUBLIC_LAUNCHTUBE_JWT || '',
  mercuryProjectName: process.env.NEXT_PUBLIC_MERCURY_PROJECT_NAME || '',
  mercuryUrl: process.env.NEXT_PUBLIC_MERCURY_URL || '',
  mercuryJwt: process.env.NEXT_PUBLIC_MERCURY_JWT || '',
  nativeContractId: process.env.NEXT_PUBLIC_NATIVE_CONTRACT_ID || '',
};

// Ensures we're only running this on client side where crypto is available
export const createCommon = () => {
  const rpc = new Server(ENV.rpcUrl);

  const mockPubkey = StrKey.encodeEd25519PublicKey(Buffer.alloc(32));
  const mockSource = new Account(mockPubkey, '0');

  const getFundKeypair = async (): Promise<Keypair> => {
    const now = new Date();
    now.setMinutes(0, 0, 0);
    const nowData = new TextEncoder().encode(now.getTime().toString());
    const hashBuffer = await crypto.subtle.digest('SHA-256', nowData);
    const keypair = Keypair.fromRawEd25519Seed(Buffer.from(hashBuffer));
    const publicKey = keypair.publicKey();

    rpc.getAccount(publicKey)
      .catch(() => rpc.requestAirdrop(publicKey))
      .catch(() => { });

    return keypair;
  };

  const account = new PasskeyKit({
    rpcUrl: ENV.rpcUrl,
    networkPassphrase: ENV.networkPassphrase,
    walletWasmHash: ENV.walletWasmHash,
  });

  const server = new PasskeyServer({
    rpcUrl: ENV.rpcUrl,
    launchtubeUrl: ENV.launchtubeUrl,
    launchtubeJwt: ENV.launchtubeJwt,
    mercuryProjectName: ENV.mercuryProjectName,
    mercuryUrl: ENV.mercuryUrl,
    mercuryJwt: ENV.mercuryJwt,
  });

  const sac = new SACClient({
    rpcUrl: ENV.rpcUrl,
    networkPassphrase: ENV.networkPassphrase,
  });

  const native = sac.getSACClient(ENV.nativeContractId);

  return {
    rpc,
    mockPubkey,
    mockSource,
    getFundKeypair,
    account,
    server,
    sac,
    native,
  };
};

export default createCommon; 