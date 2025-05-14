# Stellar Passkey Demo (Next.js)

This is a Next.js version of the Stellar Passkey-kit demo, showcasing passkey authentication with the Stellar blockchain.

## Features

- Passkey registration and authentication
- Wallet creation and management 
- Fund wallet with test tokens
- View wallet signers
- Remove signers

## Architecture

This demo uses a clean client/server architecture:

**Client-side:**
- React components with clean state management
- Client-only Passkey operations with proper type checking
- LocalStorage for persistence

**Server-side:**
- Next.js API routes for server operations
- Proper handling of server-only operations
- Environment variable management

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
```

Next, create a `.env.local` file in the root directory with the following environment variables:

```
# Stellar Network Configuration
NEXT_PUBLIC_RPC_URL="https://soroban-testnet.stellar.org"
NEXT_PUBLIC_NETWORK_PASSPHRASE="Test SDF Network ; September 2015"
NEXT_PUBLIC_WALLET_WASM_HASH="b0d71f6a2889ff36f73a9032c9b8c79249b599ac6fad6893ce9ff2b5ab0aa1b4"

# Native Asset Contract (SAC)
NEXT_PUBLIC_NATIVE_CONTRACT_ID="CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC"

# Launchtube Configuration (Server)
NEXT_PUBLIC_LAUNCHTUBE_URL="https://api.launchtube.stellarguardians.com/api"
LAUNCHTUBE_JWT="get_from_administrator"

# Mercury Configuration (Server)
NEXT_PUBLIC_MERCURY_PROJECT_NAME="stellar-passkey-demo"
NEXT_PUBLIC_MERCURY_URL="https://api.mercury.stellarguardians.com/api"
MERCURY_JWT="get_from_administrator"
```

> You will need to get the LAUNCHTUBE_JWT and MERCURY_JWT values from the Stellar team.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How It Works

1. **Client-side initialization:**
   - The app loads and checks for an existing passkey in localStorage
   - If found, it connects to the existing wallet
   - If not, you can create a new wallet or connect an existing one

2. **Wallet creation:**
   - Creates a new WebAuthn passkey on your device
   - Deploys a smart contract wallet on the Stellar network
   - Funds the wallet with test tokens

3. **Server-side operations:**
   - Transaction signing and deployment
   - Getting wallet signers
   - Resolving contract IDs

The client-server architecture ensures that sensitive operations happen server-side, while keeping the UI responsive.

## Differences from the Svelte Demo

This Next.js implementation includes:

- React hooks for state management instead of Svelte reactivity
- Client-side only rendering for passkey-related functionality
- Improved error handling and loading states
- TailwindCSS for styling

## Key Components

- `src/components/PasskeyWallet.tsx` - Main wallet component
- `src/lib/common.ts` - Setup for Stellar SDK and passkey-kit

## Learn More

- [Stellar Documentation](https://developers.stellar.org/)
- [Passkey-kit Repository](https://github.com/stellar/passkey-kit)
- [Next.js Documentation](https://nextjs.org/docs)
