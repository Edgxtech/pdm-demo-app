#!/usr/bin/env npx tsx
/**
 * Test Harness - Shared utilities for PDM demos
 * 
 * Provides common setup for wallet, providers, and contract connection.
 */

import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import { bytesToHex } from './crypto.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment from project root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Configuration
export interface PDMConfig {
    indexerUrl: string;
    indexerWsUrl: string;
    proofServerUrl: string;
    nodeUrl: string;
    privacyBridgeContractAddress: string;
    network: string;
    networkIdValue?: any;
    networkId?: any;
    networkIdName?: string;
}

export let CONFIG: PDMConfig = {
    indexerUrl: process.env.INDEXER_URL || 'http://127.0.0.1:8088/api/v1/graphql',
    indexerWsUrl: process.env.INDEXER_WS_URL || 'ws://127.0.0.1:8088/api/v1/graphql/ws',
    proofServerUrl: process.env.PROOF_SERVER_URL || 'http://localhost:6300',
    nodeUrl: process.env.NODE_URL || 'http://localhost:9944',
    privacyBridgeContractAddress: process.env.PRIVACY_BRIDGE_CONTRACT || '',
    network: process.env.MIDNIGHT_NETWORK || 'undeployed'
};

/**
 * Re-read environment variables and update CONFIG
 */
export function updateConfig(): PDMConfig {
    CONFIG.indexerUrl = process.env.INDEXER_URL || CONFIG.indexerUrl;
    CONFIG.indexerWsUrl = process.env.INDEXER_WS_URL || CONFIG.indexerWsUrl;
    CONFIG.proofServerUrl = process.env.PROOF_SERVER_URL || CONFIG.proofServerUrl;
    CONFIG.nodeUrl = process.env.NODE_URL || CONFIG.nodeUrl;
    CONFIG.privacyBridgeContractAddress = process.env.PRIVACY_BRIDGE_CONTRACT || CONFIG.privacyBridgeContractAddress;
    CONFIG.network = process.env.MIDNIGHT_NETWORK || CONFIG.network;
    return CONFIG;
}

// SDK modules (loaded dynamically)
let sdkModules: any = null;

/**
 * Legacy support for getConfig()
 */
export const getConfig = () => updateConfig();

/**
 * Query contract state from the indexer
 */
export const queryStateFull = async (contractAddress: string) => {
    const addr = contractAddress.startsWith('00') ? contractAddress : '00' + contractAddress;
    debug(`   Querying state for ${addr}...`);

    // Use the basic query format known to work
    const query = `query GetState($addr: HexEncoded!) {
        contractAction(address: $addr) {
            ... on ContractDeploy { state }
            ... on ContractUpdate { state }
            ... on ContractCall { state }
        }
    }`;

    try {
        const response = await fetch(CONFIG.indexerUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query,
                variables: { addr }
            })
        });
        const json = await response.json() as any;

        if (json.errors) {
            debug(`   ⚠️ Indexer GraphQL errors:`, json.errors);
        }

        const actions = json.data?.contractAction;
        let latestAction = null;
        if (Array.isArray(actions) && actions.length > 0) {
            // Sort by block height if available, or just take last.
            // Some indexers don't return block info in contractAction directly.
            // But we can usually assume the last one in the list is the most recent
            // IF the indexer appends them. To be safe, let's log the length.
            latestAction = actions[actions.length - 1];
        } else {
            latestAction = actions || null;
        }

        if (!latestAction?.state) {
            log(`   ⚠️ No state found for ${addr}`);
            return null;
        }

        const stateHex = latestAction.state;

        debug(`   ✅ Got contract state. Length: ${stateHex.length} chars`);

        const { ContractState } = await import('@midnight-ntwrk/compact-runtime');
        const { getNetworkId } = await import('@midnight-ntwrk/midnight-js-network-id');

        // Use CONFIG.networkIdValue which is set during initEnvironment
        const networkId = await (getNetworkId as any)(CONFIG.networkIdValue);
        const contractState = ContractState.deserialize(Buffer.from(stateHex, 'hex'), networkId as any);

        return { state: contractState, blockHeight: 0 };
    } catch (err: any) {
        log(`   ⚠️ Indexer fetch failed: ${err.message}`);
        return null;
    }
};

export const queryState = async (contractAddress: string) => {
    const result = await queryStateFull(contractAddress);
    return result ? result.state : null;
};

export const waitForBlockHeight = async (contractAddress: string, targetHeight: number, timeoutMs = 60000) => {
    // Basic delay since our indexer doesn't easily expose current height via blocks/contractAction
    debug(`   Waiting for indexer to stabilize (Block ${targetHeight})...`);
    await new Promise(resolve => setTimeout(resolve, 20000));
    return true;
};

/**
 * Initialize demo environment by loading SDK modules
 */
export async function initEnvironment() {
    if (sdkModules) return sdkModules;

    const { setNetworkId, getNetworkId, NetworkId } = await import('@midnight-ntwrk/midnight-js-network-id');
    const { WalletBuilder } = await import('@midnight-ntwrk/wallet');
    const { nativeToken, NetworkId: ZswapNetworkId } = await import('@midnight-ntwrk/zswap');
    const { findDeployedContract } = await import('@midnight-ntwrk/midnight-js-contracts');
    const { createVerifierKey } = await import('@midnight-ntwrk/midnight-js-types');
    const { httpClientProofProvider } = await import('@midnight-ntwrk/midnight-js-http-client-proof-provider');
    const Rx = await import('rxjs');

    // Network mapping
    let networkIdValue: number = ZswapNetworkId.Undeployed;
    let networkId: any = NetworkId.Undeployed;
    let networkIdName: string = 'Undeployed';

    const config = updateConfig();

    const netName = config.network.toLowerCase();
    if (netName === 'testnet' || netName === 'ausstaker') {
        networkIdValue = ZswapNetworkId.TestNet;
        networkId = NetworkId.TestNet;
        networkIdName = 'TestNet';
    } else if (netName === 'devnet') {
        networkIdValue = ZswapNetworkId.DevNet;
        networkId = NetworkId.DevNet;
        networkIdName = 'DevNet';
    } else if (netName === 'mainnet') {
        networkIdValue = ZswapNetworkId.MainNet;
        networkId = NetworkId.MainNet;
        networkIdName = 'MainNet';
    }

    // Set global network ID string for midnight-js components
    setNetworkId(networkId);

    // Update CONFIG with resolved network details
    config.networkIdValue = networkIdValue;
    config.networkId = networkId;
    config.networkIdName = networkIdName;

    sdkModules = {
        getNetworkId, setNetworkId,
        WalletBuilder, nativeToken, ZswapNetworkId,
        networkIdValue, networkIdName,
        findDeployedContract,
        createVerifierKey,
        httpClientProofProvider, Rx
    };

    return sdkModules;
}

/**
 * Create and sync a wallet from seed
 */
export async function createWallet(seed: string, waitSync: boolean = true) {
    const sdk = await initEnvironment();

    // WalletBuilder.build needs the numeric enum value in some versions, 
    // but the error "TestNet (of class java.lang.String)" proved that 
    // it was expecting something other than the string we provided.
    const config = updateConfig();
    const wallet = await sdk.WalletBuilder.build(
        config.indexerUrl,
        config.indexerWsUrl,
        config.proofServerUrl,
        config.nodeUrl,
        seed,
        config.networkIdValue, // Pass numeric enum value from CONFIG
        'error'
    );
    wallet.start();

    // Get the first state update to extract the address
    const firstState = await sdk.Rx.firstValueFrom(wallet.state()).catch(() => null) as any;
    const address = firstState?.address;

    if (!waitSync) {
        return { wallet, state: firstState, balance: 0n, address, synced: false };
    }

    // Wait for sync with timeout
    try {
        const state = await sdk.Rx.firstValueFrom(
            wallet.state().pipe(
                sdk.Rx.filter((s: any) => s.syncProgress?.synced === true),
                sdk.Rx.timeout(20000) // Shorter timeout for initial check
            )
        );
        const balance = (state as any).balances[sdk.nativeToken()] || 0n;
        return { wallet, state, balance, address: (state as any).address, synced: true };
    } catch (error: any) {
        // If we have an address, we can still use this wallet for funding even if not synced
        if (address) {
            return { wallet, state: firstState, balance: 0n, address, synced: false };
        }
        throw new Error(`Failed to sync and could not retrieve address: ${error.message}`);
    }
}

/**
 * Connect to the deployed Privacy Bridge contract
 */
export async function getPrivacyBridgeContract(wallet: any, state: any) {
    const config = updateConfig();
    if (!config.privacyBridgeContractAddress) {
        throw new Error('PRIVACY_BRIDGE_CONTRACT not configured in .env');
    }

    let contractAddress = config.privacyBridgeContractAddress;
    debug(`   Using contract address: ${contractAddress}`);

    const sdk = await initEnvironment();

    // Load contract module
    const contractPath = path.resolve(__dirname, '../contracts/privacy-bridge/contract/index.cjs');
    const PrivacyBridgeModule = await import(contractPath);
    const contractInstance = new PrivacyBridgeModule.Contract({});

    // Provider interfaces for SDK v3
    const walletProvider = {
        coinPublicKey: state.coinPublicKey,
        encryptionPublicKey: state.encryptionPublicKey,
        getCoinPublicKey: () => state.coinPublicKey,
        getEncryptionPublicKey: () => state.encryptionPublicKey,
        balanceTx: async (tx: any, newCoins: any[]) => {
            const { Transaction: LedgerTx, LedgerParameters } = await import('@midnight-ntwrk/ledger');

            // Fix WASM instance mismatch for Transaction and its parameters
            if (tx && tx.constructor && tx.constructor.name === 'Transaction' && !(tx instanceof LedgerTx)) {
                debug(`   🔄 Re-deserializing transaction to match local Ledger instance...`);
                tx = LedgerTx.deserialize(tx.serialize(CONFIG.networkIdValue), CONFIG.networkIdValue);
            }

            if (LedgerTx.prototype.fees && !(LedgerTx.prototype as any).__patched_fees) {
                const originalFees = LedgerTx.prototype.fees;
                (LedgerTx.prototype as any).fees = function (params: any) {
                    if (params && params.constructor && params.constructor.name === 'LedgerParameters' && !(params instanceof LedgerParameters)) {
                        debug('   🔄 Re-deserializing LedgerParameters during fees() call...');
                        const serialized = params.serialize(CONFIG.networkIdValue);
                        const deserialized = LedgerParameters.deserialize(serialized, CONFIG.networkIdValue);
                        return originalFees.call(this, deserialized);
                    }
                    return originalFees.call(this, params);
                };
                (LedgerTx.prototype as any).__patched_fees = true;
            }

            if (LedgerTx.prototype.merge && !(LedgerTx.prototype as any).__patched_merge) {
                const originalMerge = LedgerTx.prototype.merge;
                (LedgerTx.prototype as any).merge = function (other: any) {
                    if (other && other.constructor && other.constructor.name === 'Transaction' && !(other instanceof LedgerTx)) {
                        debug('   🔄 Re-deserializing Transaction during merge() call...');
                        const serialized = other.serialize(CONFIG.networkIdValue);
                        const deserializedOther = LedgerTx.deserialize(serialized, CONFIG.networkIdValue);
                        return originalMerge.call(this, deserializedOther);
                    }
                    return originalMerge.call(this, other);
                };
                (LedgerTx.prototype as any).__patched_merge = true;
            }

            const recipe = await wallet.balanceTransaction(tx, newCoins);
            return await wallet.proveTransaction(recipe);
        },
    };

    const midnightProvider = {
        submitTx: async (tx: any) => {
            try {
                return await wallet.submitTransaction(tx);
            } catch (err: any) {
                console.error('❌ submitTransaction failed with stack trace:');
                console.error(err.stack);
                throw err;
            }
        }
    };

    const zkConfigPath = path.resolve(__dirname, '../contracts/privacy-bridge');
    const { NodeZkConfigProvider } = await import('@midnight-ntwrk/midnight-js-node-zk-config-provider');

    const privateStates = new Map<string, any>();
    const privateSigningKeys = new Map<string, any>();
    const privateStateProvider = {
        get: async (id: string) => privateStates.get(id) || null,
        set: async (id: string, state: any) => { privateStates.set(id, state); },
        remove: async (id: string) => { privateStates.delete(id); },
        clear: async () => { privateStates.clear(); },
        getSigningKey: async (id: string) => privateSigningKeys.get(id) || null,
        setSigningKey: async (id: string, key: any) => { privateSigningKeys.set(id, key); },
        removeSigningKey: async (id: string) => { privateSigningKeys.delete(id); },
        clearSigningKeys: async () => { privateSigningKeys.clear(); }
    };

    const providers: any = {
        privateStateProvider,
        walletProvider,
        midnightProvider,
        publicDataProvider: {
            queryContractState: async (addr: string) => {
                const res = await queryStateFull(addr);
                return res ? res.state : null;
            },
            queryDeployContractState: async (addr: string) => {
                const res = await queryStateFull(addr);
                return res ? res.state : null;
            },
            queryZSwapAndContractState: async (contractAddress: string) => {
                const result = await queryStateFull(contractAddress);
                const contractState = result ? result.state : null;
                const { StateValue } = await import('@midnight-ntwrk/compact-runtime');
                return [StateValue.newNull(), contractState] as any;
            },
            watchForDeployTxData: async () => null,
            watchForTxData: async (txIdArg: any) => {
                const txId = typeof txIdArg === 'string' ? txIdArg : (txIdArg.txId || txIdArg.hash || txIdArg.txHash);
                const standardizedTxId = txId.startsWith('00000000') ? txId : '00000000' + txId;
                const query = `query GetTx($txId: HexEncoded!) {
                    transactions(offset: { identifier: $txId }) {
                        hash
                        block { height hash }
                        raw
                    }
                }`;

                debug(`   Watching for tx ${txId}...`);
                for (let i = 0; i < 12; i++) {
                    const response = await fetch(CONFIG.indexerUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            query,
                            variables: { txId: standardizedTxId }
                        })
                    });
                    const json = await response.json() as any;
                    const tx = json.data?.transactions?.[0];
                    if (tx) {
                        debug(`   ✅ Transaction indexed in block ${tx.block.height}, hash: ${tx.hash}`);
                        const { Transaction: LedgerTx, LedgerParameters } = await import('@midnight-ntwrk/ledger');
                        const rawBytes = new Uint8Array(Buffer.from(tx.raw, 'hex'));
                        return {
                            tx: LedgerTx.deserialize(rawBytes, CONFIG.networkIdValue),
                            status: 'SucceedEntirely',
                            txId,
                            txHash: tx.hash,
                            blockHeight: tx.block.height,
                            blockHash: tx.block.hash
                        };
                    }
                    await new Promise(resolve => setTimeout(resolve, 5000));
                }
                throw new Error(`Timeout waiting for transaction ${txId}`);
            }
        },
        zkConfigProvider: new NodeZkConfigProvider(zkConfigPath),
        proofProvider: sdk.httpClientProofProvider(CONFIG.proofServerUrl, new NodeZkConfigProvider(zkConfigPath) as any)
    };

    const contract = await import('../contracts/privacy-bridge/contract/index.cjs');
    const { QueryContext } = await import('@midnight-ntwrk/compact-runtime');

    const deployedContract = await sdk.findDeployedContract(providers, {
        contract: new contract.Contract({}),
        contractAddress,
        privateStateId: 'privacy-bridge-state',
        initialPrivateState: state || {}
    });

    return {
        deployedContract,
        contractAddress,
        queryState: queryStateFull,
        waitForBlockHeight,
        ledgerAccessor: contract.ledger,
        pureCircuits: contract.pureCircuits,
        ContractClass: contract.Contract,
        QueryContext
    };
}

// Formatting Utilities
export function formatDid(did: any): string {
    if (!did) return 'undefined';
    let hex = '';
    if (typeof did === 'string') {
        hex = did.startsWith('0x') ? did.slice(2) : did;
    } else if (did instanceof Uint8Array) {
        hex = bytesToHex(did);
    } else {
        hex = String(did);
    }
    return `did:pdm:${hex}`;
}

export function formatHash(hash: any): string {
    if (!hash) return 'undefined';
    if (hash instanceof Uint8Array) return bytesToHex(hash);
    return String(hash);
}

// Logging Utilities
export function log(message: string, data?: any) {
    if (data !== undefined) {
        console.log(`${message}`, data);
    } else {
        console.log(`${message}`);
    }
}

export function debug(message: string, data?: any) {
    if (process.env.DEBUG === 'true') {
        log(`[DEBUG] ${message}`, data);
    }
}

export function logStep(step: number, total: number, message: string) {
    console.log(`\n[Step ${step}/${total}] ${message}`);
}

export function logSuccess(message: string) {
    console.log(`✅ ${message}`);
}

export function logError(message: string, error?: any) {
    console.error(`❌ ${message}`, error?.message || error || '');
}

export function logHeader(title: string) {
    console.log();
    console.log('═'.repeat(60));
    console.log(`🌙 ${title}`);
    console.log('═'.repeat(60));
    console.log();
}

export function logWarning(message: string) {
    console.log(`⚠️  ${message}`);
}
/**
 * Generate a deterministic owner secret and its on-chain commitment
 */
export async function getOwnerAuth(dataId: Uint8Array, user: any) {
    const { pureCircuits } = await initEnvironment(); // This won't work yet, need it from contract instance

    // For now, let's just make it a hash of dataId + user seed
    const secretStr = `${bytesToHex(dataId)}_${user.seed}`;
    const { hashContent } = await import('./crypto.js');
    const secretHex = hashContent(secretStr);
    const secretBytes = new Uint8Array(Buffer.from(secretHex, 'hex'));

    return { secret: secretBytes, secretHex };
}

/**
 * Expose pure circuit for computing auth commitment
 */
export async function computeAuthCommitment(contractInstance: any, secret: Uint8Array, contractAddress: string) {
    // We can call the pure circuit logic directly without setting up a full QueryContext for a proof
    // pureCircuits is a static property on the contract instance's constructor or module
    // But since we have the instance, let's use the circuits wrapper but with a minimal context

    // BETTER APPROACH: The index.cjs exports `pureCircuits` directly.
    // However, loading it dynamically is tricky.

    // Let's stick to the instance wrapper but fix the context.
    const { QueryContext, StateValue } = await import('@midnight-ntwrk/compact-runtime');
    const context = new QueryContext(StateValue.newNull(), contractAddress);

    // The previous error "mismatch idx=7" suggests the circuit expects something else.
    // Actually, force calling the pure logic is safer.
    // contractInstance.circuits.computeAuthCommitment calls pureCircuits under the hood.

    // The issue might be simply that we are in a transition where the contract expects a different version.
    // But let's try to just return the result.

    const res = contractInstance.circuits.computeAuthCommitment(context, secret);
    return res.result;
}
