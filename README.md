# PDM Demo App

**Private Data Manager Demo** — Demonstrating privacy-preserving data sharing on Midnight blockchain.

This repository contains runnable demo scripts showcasing key features of a Self-Sovereign Private Data Manager (PDM):

| Demo | Script | Description |
|------|--------|-------------|
| **1** | `demo-01-zk-age-proof.ts` | ZK age verification without revealing birthdate |
| **2** | `demo-02-p2p-share.ts` | P2P direct data sharing via blockchain-brokered signalling |
| **3** | `demo-03-onchain-storage.ts` | Encrypted on-chain storage with access control |
| **4** | `demo-04-emergency-auth.ts` | Multi-party authorisation for emergency data access |

---

## Prerequisites

### 1. Install Node.js (v18 or higher)

**macOS** (using Homebrew):
```bash
brew install node
```

**Windows** (using installer):
Download from [nodejs.org](https://nodejs.org/) and run the installer.

**Linux** (using nvm - recommended):
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
```

Verify installation:
```bash
node --version   # Should show v18.x.x or higher
```

### 2. Install Docker (Only if you are running a local midnight network)

You need Docker and Docker Compose (V2) to run the local Midnight network.

**macOS**:
1. Download and install [Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/).
2. Start Docker Desktop and ensure it is running.

**Windows**:
1. Download and install [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/).
2. Ensure WSL 2 backend is selected (recommended).

**Linux**:
1. Install Docker Engine: [Instructions](https://docs.docker.com/engine/install/)
2. Install Docker Compose plugin: [Instructions](https://docs.docker.com/compose/install/linux/)
3. Ensure your user is in the `docker` group (to run without sudo).

Verify installation:
```bash
docker --version
docker compose version
```

---

## Quick Start (Local Network)

The default configuration runs a local Midnight development network using Docker.

### 1. Clone and Install

```bash
git clone https://github.com/Edgxtech/pdm-demo-app.git
```

### 2. Start Midnight Network

Start the local Midnight node, indexer, and proof server:

```bash
cd pdm-demo-app/background/midnight-node
docker compose up -d
cd ../..
```

Wait ~30 seconds for services to initialize, then verify:

```bash
docker compose ps
# Should show: node, indexer, proof-server all running

curl -s 'http://localhost:8088/api/v1/graphql' \
    -H 'Content-Type: application/json' \
    -d '{"query":"{ block { height } }"}' | jq
# Should show block height incrementing from 1
```

### 3. Master Setup

From the project root `pdm-demo-app`, install dependencies:

```bash
npm install
```

then run setup:

```bash
cp .env.template .env
npm run setup
```

This script performs the following actions:
1. **Wallet Creation**: Generates unique seeds for Alice, Bob, Charlie, and Emergency actors in your `.env`
2. **Funding**: Automatically funds all actors with test DUST tokens from the genesis wallet
3. **Contract Deployment**: Deploys the `PrivacyBridge` contract
4. **Credential Registration**: Creates and registers verified credentials (e.g., ADMIN as trusted issuer, and an EMERGENCY_SERVICES credential) used in the demos

> Each step can be run individually if needed (see Individual Setup Scripts below).

### 4. Verify Setup

```bash
npm run check-balance
```

### 5. Run Demos

```bash
npm run demo:age       # Demo 1: ZK Age Proof
npm run demo:p2p       # Demo 2: P2P Direct Share
npm run demo:storage   # Demo 3: Encrypted On-Chain Storage
npm run demo:emergency # Demo 4: Emergency Multi-Party Authorisation
```

Or run all demos:

```bash
npm run demo:all
```

Or run with Debug Logging:

```bash
DEBUG=true npm run demo:all
```

### Individual Setup Scripts

If you need to run setup steps individually:

```bash
npm run create-wallets   # Step 1: Generate wallet seeds only
npm run fund             # Step 2: Fund all wallets from genesis wallet
npm run deploy           # Step 3: Deploy Privacy Bridge contract
npm run register-creds   # Step 4: Register verified credentials
npm run check-balance    # Verify: Check wallet balances
```

### Stopping the Network

```bash
docker compose -f background/midnight-node/compose.yml down        # Stop (preserves data)
docker compose -f background/midnight-node/compose.yml down -v     # Stop and delete all data
```

---

## Alternative: Test or Demo Network

When available, it is much simpler to point to a tesnet or demonet since you don't need to run a self-hosted undeployed midnight network and the whole docker compose project above, plus you don't need to deploy the 'Privacy Bridge' smart contract, just point to an existing contract address. 

However, the Ausstaker demo network is not active at the moment, and the official midnight testnet is undergoing updates / faucet not working. Use the local Docker setup above.

#### Ausstaker Demo Network

> **Status**: NOT ACTIVE. 

1. Update your `.env` with:
```bash
MIDNIGHT_NETWORK=ausstaker
INDEXER_URL=https://indexer.nightdemo.ausstaker.com.au/api/v1/graphql
INDEXER_WS_URL=wss://indexer.nightdemo.ausstaker.com.au/api/v1/graphql/ws
NODE_URL=https://rpc.nightdemo.ausstaker.com.au
PROOF_SERVER_URL=https://proof.nightdemo.ausstaker.com.au
PRIVACY_BRIDGE_CONTRACT=TBD
```

2. Then, `npm run setup` directly.

#### Official Midnight Test Network

> **Status**: UNDERGOING UPDATES / FAUCET NOT WORKING.

1. Update your `.env` with:
```bash
MIDNIGHT_NETWORK=testnet
INDEXER_URL=https://indexer.testnet-02.midnight.network/api/v1/graphql
INDEXER_WS_URL=wss://indexer.testnet-02.midnight.network/api/v1/graphql/api/v1/graphql/ws
NODE_URL=https://rpc.testnet-02.midnight.network
PROOF_SERVER_URL=https://proof.testnet-02.midnight.network
PRIVACY_BRIDGE_CONTRACT=TBD
```

2. Then, `npm run setup` directly.

---

## Project Structure

```
pdm-demo-app/
├── scripts/                 # Runnable demo scripts
│   ├── setup.ts             # Master setup (wallets + funding + deploy + credentials)
│   ├── create-wallets.ts    # Wallet generation only
│   ├── fund-wallet.ts       # Auto-fund wallet via faucet or genesis
│   ├── deploy-contract.ts   # Deploy Privacy Bridge contract
│   ├── register-credentials.ts  # Register verified credentials
│   ├── check-balance.ts     # Verify wallet is funded
│   ├── demo-01-zk-age-proof.ts
│   ├── demo-02-p2p-share.ts
│   ├── demo-03-onchain-storage.ts
│   └── demo-04-emergency-auth.ts
│
├── lib/                     # Utility libraries
│   ├── harness.ts           # SDK initialisation & contract connection
│   ├── crypto.ts            # Encryption/decryption (ECDH + AES)
│   ├── ecdh.ts              # X25519 ECDH key exchange
│   ├── credentials.ts       # Credential management
│   ├── users.ts             # Test user management
│   └── p2p.ts               # P2P signalling utilities
│
├── contracts/               # Pre-compiled smart contract artefacts
│   └── privacy-bridge/
│
├── .env.template            # Configuration template
├── package.json
├── tsconfig.json
└── README.md
```

---

## Demo Descriptions

### Demo 1: ZK Age Proof

Proves age thresholds (≥18, ≥21) using zero-knowledge commitments **without revealing the actual birthdate**. The proof is stored on-chain as a cryptographic commitment that verifiers can trust.

**Key Privacy Feature**: Birth date stays on-device; verifiers learn *only* the Boolean result (age ≥ threshold).

### Demo 2: P2P Direct Share

Uses Midnight blockchain for signalling to establish direct peer-to-peer encrypted channels. Offers and answers are E2E encrypted using **ECDH-derived shared secrets** from wallet keypairs and stored on-chain, enabling NAT traversal without centralised relay servers.

**Key Privacy Feature**: No relay server sees the data; ECDH key exchange (no pre-shared secrets); blockchain-auditable session lifecycle.

### Demo 3: Encrypted On-Chain Storage

Demonstrates wallet-based encryption where Alice encrypts sensitive data (e.g., medical info) for Bob using **ECDH key derivation** from their wallet keypairs. The encrypted payload is stored on-chain with smart contract-enforced access control.

**Key Privacy Feature**: Data remains encrypted on-chain; ECDH provides forward secrecy; only authorised parties can decrypt.

### Demo 4: Emergency Multi-Party Authorisation

A complete emergency response workflow:
1. Patient stores encrypted location data (ECDH-encrypted for family member)
2. Emergency service (e.g., Fire & Rescue) requests access with verified credentials
3. Family member (guardian) reviews credentials and approves the request
4. Emergency service receives decrypted location data

**Key Privacy Feature**: Multi-party consent required; credential verification via DLT; full audit trail on-chain.

---

## Troubleshooting

### "PRIVACY_BRIDGE_CONTRACT not configured"

Run `npm run setup` to deploy a fresh contract, or run `npm run deploy` manually.

### "Wallet seed not configured"

Run `npm run setup` to generate wallet seeds, then either:
- Press 'y' to auto-add to `.env`, or
- Manually add them to your `.env` file

Required seeds: `ALICE_WALLET_SEED`, `BOB_WALLET_SEED`, `CHARLIE_WALLET_SEED`, `EMERGENCY_WALLET_SEED` (minimum for demos)

### "Setup script hangs"

The `npm run setup` script is interactive. It will ask you to confirm updating your `.env` file with the new contract address. Ensure you are watching the terminal to press 'y' when prompted.

### "Wallet has no funds" / "Insufficient funds"

Ensure the Midnight network is running:
```bash
docker compose ps
```

Then run the funding script:
```bash
npm run fund          # Fund all wallets
npm run fund alice    # Fund specific wallet
```

### "Connection refused" / "Network error" / "ECONNRESET"

Ensure Docker services are running:
```bash
docker compose -f background/midnight-node/compose.yml up -d
docker compose -f background/midnight-node/compose.yml ps
```

Or, The proof-server in particular might need a restart to make sure it synchs required data.

```bash
docker compose -f background/midnight-node/compose.yml restart proof-server
## check logs for "listening on: 0.0.0.0:6300"
docker compose -f background/midnight-node/compose.yml logs proof-server -f
```

---

## Technology Stack

This is a **Node.js TypeScript application** using:
- **Midnight SDK** (`@midnight-ntwrk/*`) - Blockchain interaction
- **tsx** - TypeScript execution
- **crypto-js** - Encryption utilities
- **dotenv** - Environment configuration

---

## Related Article

These demos accompany the article: [**"Private Data Management using Decentralised Ledgers"**](https://medium.com/@tdedgx/private-data-management-using-decentralised-ledgers-b972c6855e48) — a Midnight Blockchain Case Study.

---

## Licence

MIT
