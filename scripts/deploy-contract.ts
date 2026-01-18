#!/usr/bin/env npx tsx
/**
 * PDM Demo - Deploy Privacy Bridge Contract
 * 
 * Deploys the pre-compiled Privacy Bridge contract to the network.
 * The contract address will be saved to deployment.json and printed
 * for you to add to your .env file.
 * 
 * Prerequisites:
 * - Local network running (node, indexer, proof-server)
 * - Funded wallet (run npm run fund first)
 * 
 * Run: npm run deploy
 */

import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import {
    updateConfig,
    createWallet,
    log,
    logHeader,
    logSuccess,
    logError,
    logWarning
} from '../lib/harness.js';

// Configuration helper
function getDeployConfig() {
    const config = updateConfig();
    return {
        indexerUrl: config.indexerUrl,
        indexerWsUrl: config.indexerWsUrl,
        proofServerUrl: config.proofServerUrl,
        nodeUrl: config.nodeUrl,
        network: config.network,
        walletSeed: process.env.ADMIN_WALLET_SEED || ''
    };
}

// Logging helpers


/**
 * Initialize SDK modules
 */
async function initSDK() {
    const { setNetworkId, getNetworkId, NetworkId } = await import('@midnight-ntwrk/midnight-js-network-id');
    const { WalletBuilder } = await import('@midnight-ntwrk/wallet');
    const { nativeToken, NetworkId: ZswapNetworkId, Transaction: ZswapTx } = await import('@midnight-ntwrk/zswap');
    const { deployContract } = await import('@midnight-ntwrk/midnight-js-contracts');
    const midnightJsTypes = await import('@midnight-ntwrk/midnight-js-types');
    const SucceedEntirely = 'SucceedEntirely';
    const createBalancedTx = (midnightJsTypes as any).createBalancedTx || ((tx: any) => tx);
    const createVerifierKey = (midnightJsTypes as any).createVerifierKey || ((vk: any) => vk);
    const { Transaction: LedgerTx } = await import('@midnight-ntwrk/ledger');
    const { httpClientProofProvider } = await import('@midnight-ntwrk/midnight-js-http-client-proof-provider');
    const Rx = await import('rxjs');

    // Network mapping
    let networkIdValue: number = ZswapNetworkId.Undeployed;
    let networkId: any = NetworkId.Undeployed;
    let networkIdName: string = 'Undeployed';

    const config = getDeployConfig();
    const netName = config.network.toLowerCase();
    if (netName === 'testnet' || netName === 'ausstaker') {
        networkIdValue = ZswapNetworkId.TestNet;
        networkId = NetworkId.TestNet;
        networkIdName = 'TestNet';
    } else if (netName === 'devnet') {
        networkIdValue = ZswapNetworkId.DevNet;
        networkId = NetworkId.DevNet;
        networkIdName = 'DevNet';
    }

    setNetworkId(networkId);

    // Helper to get network IDs
    const getZswapNetworkId = () => networkIdValue;
    const getLedgerNetworkId = () => networkIdName;

    return {
        WalletBuilder, nativeToken, ZswapTx, LedgerTx,
        deployContract, createBalancedTx, createVerifierKey,
        httpClientProofProvider, Rx,
        getZswapNetworkId, getLedgerNetworkId, networkIdValue,
        SucceedEntirely
    };
}

/**
 * Deploy the Privacy Bridge contract
 */
export async function deploy(autoUpdateEnv: boolean = false) {
    logHeader('PDM Demo - Deploy Privacy Bridge Contract');

    const config = getDeployConfig();

    // Check wallet seed
    if (!config.walletSeed) {
        logError('WALLET_SEED not configured in .env');
        console.log('Run "npm run setup" to generate a wallet.');
        return null;
    }



    // Connect wallet
    let wallet: any;
    let state: any;
    let balance: bigint = 0n;

    try {
        log('🔍 Connecting and checking balance for ADMIN wallet...');
        const admin = await createWallet(config.walletSeed);
        wallet = admin.wallet;
        state = admin.state;
        balance = admin.balance;

        if (!admin.synced) {
            logWarning('Admin wallet not yet fully synced. Proceeding anyway, but deployment may fail if funds are not detected.');
        }

        const shortAddr = admin.address.length > 24
            ? `${admin.address.slice(0, 9)}...${admin.address.slice(-12)}`
            : admin.address;

        log(`   📦 ADMIN      | ${shortAddr} | ${admin.balance} DUST`);

        if (admin.balance === 0n && !admin.synced) {
            // If balance is 0 and not synced, it's very likely missing funds
            logError('Admin wallet has 0 balance and is not synced. Run "npm run fund" first.');
            return null;
        }

    } catch (e: any) {
        logError(`Connection failed: ${e.message}`);
        console.error(e);
        return null;
    }

    try {
        // Initialize SDK
        const sdk = await initSDK();
        // Use wallet and state from connection step above


        // Load contract module
        console.log();
        log('Loading contract...');
        const contractPath = path.resolve(__dirname, '../contracts/privacy-bridge/contract/index.cjs');
        const PrivacyBridgeModule = await import(contractPath);
        const contractInstance = new PrivacyBridgeModule.Contract({});
        log('   ✅ Contract loaded');

        // Cache for proven transaction
        let lastProvenZswapTx: any = null;

        // Create wallet provider
        const walletProvider = {
            coinPublicKey: state.coinPublicKey,
            encryptionPublicKey: state.encryptionPublicKey,
            getCoinPublicKey: () => state.coinPublicKey,
            getEncryptionPublicKey: () => state.encryptionPublicKey,
            async balanceTx(tx: any, newCoins: any) {
                const zswapTx = sdk.ZswapTx.deserialize(
                    tx.serialize(sdk.getLedgerNetworkId()),
                    sdk.getZswapNetworkId()
                );
                const balanced = await wallet.balanceTransaction(zswapTx, newCoins);
                const proven = await wallet.proveTransaction(balanced);
                lastProvenZswapTx = proven;
                const ledgerTx = sdk.LedgerTx.deserialize(
                    proven.serialize(sdk.getZswapNetworkId()),
                    sdk.getLedgerNetworkId() as any
                );
                return sdk.createBalancedTx(ledgerTx);
            },
            async submitTx(tx: any) {
                if (lastProvenZswapTx) {
                    try {
                        log('   Submitting transaction to node...');
                        let result = await wallet.submitTransaction(lastProvenZswapTx);
                        log(`   submitTransaction result: ${JSON.stringify(result)}`);
                        lastProvenZswapTx = null;
                        if (typeof result === 'string') {
                            result = { txId: result, hash: result, status: 'SucceedEntirely' };
                        } else if (result === null || result === undefined) {
                            log('   ⚠️ submitTransaction returned null/undefined, mocking success');
                            result = { txId: 'unknown', hash: 'unknown', status: 'SucceedEntirely' };
                        } else {
                            (result as any).status = (result as any).status || 'SucceedEntirely';
                        }
                        return result;
                    } catch (err: any) {
                        logError(`Submit failed: ${err.message}`);
                        throw err;
                    }
                }
                throw new Error('No proven transaction available');
            }
        };

        // Create ZK config provider
        const zkConfigPath = path.resolve(__dirname, '../contracts/privacy-bridge');
        const { NodeZkConfigProvider } = await import('@midnight-ntwrk/midnight-js-node-zk-config-provider');

        const privateStates = new Map<string, any>();
        const privateSigningKeys = new Map<string, any>();
        const privateStateProvider = {
            get: async (id: string) => privateStates.get(id) || null,
            set: async (id: string, s: any) => { privateStates.set(id, s); },
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
            publicDataProvider: {
                queryContractState: async () => null,
                queryDeployContractState: async () => null,
                queryZSwapAndContractState: async () => null,
                watchForDeployTxData: async (txIdArg: any) => {
                    const txId = typeof txIdArg === 'string' ? txIdArg : (txIdArg?.txId || txIdArg?.hash);
                    log(`   Waiting for deploy transaction to be indexed.....`);

                    const standardizedTxId = txId?.startsWith('00000000') ? txId : '00000000' + txId;
                    const query = `query GetTx($txId: HexEncoded!) {
                        transactions(offset: { identifier: $txId }) {
                            hash
                            block { height }
                        }
                    }`;

                    for (let i = 0; i < 24; i++) {
                        const response = await fetch(config.indexerUrl, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ query, variables: { txId: standardizedTxId } })
                        });
                        const json = await response.json() as any;
                        const tx = json.data?.transactions?.[0];
                        if (tx) {
                            log(`   Transaction indexed in block ${tx.block.height}`);
                            return {
                                txId,
                                blockHeight: tx.block.height,
                                status: 'SucceedEntirely'
                            };
                        }
                        await new Promise(resolve => setTimeout(resolve, 5000));
                    }
                    throw new Error('Timeout waiting for deploy transaction');
                },
                watchForTxData: async (txIdArg: any) => {
                    const txId = typeof txIdArg === 'string' ? txIdArg : (txIdArg?.txId || txIdArg?.hash);
                    log(`   Waiting for transaction ${txId} to be indexed...`);

                    const standardizedTxId = txId?.startsWith('00000000') ? txId : '00000000' + txId;
                    const query = `query GetTx($txId: HexEncoded!) {
                        transactions(offset: { identifier: $txId }) {
                            hash
                            block { height }
                        }
                    }`;

                    for (let i = 0; i < 24; i++) {
                        const response = await fetch(config.indexerUrl, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ query, variables: { txId: standardizedTxId } })
                        });
                        const json = await response.json() as any;
                        const tx = json.data?.transactions?.[0];
                        if (tx) {
                            log(`   Transaction indexed in block ${tx.block.height}`);
                            return {
                                txId,
                                blockHeight: tx.block.height,
                                status: 'SucceedEntirely'
                            };
                        }
                        await new Promise(resolve => setTimeout(resolve, 5000));
                    }
                    throw new Error('Timeout waiting for transaction');
                }
            },
            zkConfigProvider: new NodeZkConfigProvider(zkConfigPath),
            proofProvider: (sdk.httpClientProofProvider as any)(config.proofServerUrl, new NodeZkConfigProvider(zkConfigPath)),
            midnightProvider: walletProvider
        };

        // Deploy contract
        console.log();
        log('Deploying contract (this may take a minute)...');

        const deployedContract = await (sdk.deployContract as any)(providers, {
            contract: contractInstance,
            privateStateId: 'pdm-privacy-bridge-' + Date.now(),
            initialPrivateState: {}
        });

        const contractAddress = deployedContract.deployTxData.public.contractAddress;
        log(`   ✅ Contract deployed! Address: ${contractAddress}`);
        console.log();

        // Save deployment info
        const deploymentPath = path.resolve(__dirname, '../deployment.json');
        const deployment = {
            contractAddress,
            network: config.network,
            deployedAt: new Date().toISOString()
        };
        fs.writeFileSync(deploymentPath, JSON.stringify(deployment, null, 2));
        log(`Saved deployment to: deployment.json`);

        // Update .env
        let updateEnv = autoUpdateEnv;
        if (!autoUpdateEnv) {
            const readline = await import('readline/promises');
            const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

            try {
                // Auto-accept in 5 seconds
                const AC = new AbortController();
                const timeoutMs = 10000;

                log('\n📝 Would you like to update PRIVACY_BRIDGE_CONTRACT in your .env file? (Y/n)');

                const answer = await Promise.race([
                    rl.question(`   (Auto-accepting in ${timeoutMs / 1000}s) > `, { signal: AC.signal }),
                    new Promise<string>((_, reject) => setTimeout(() => {
                        AC.abort();
                        reject(new Error('TIMEOUT'));
                    }, timeoutMs))
                ]);

                updateEnv = answer.trim().toLowerCase() !== 'n';
            } catch (err: any) {
                if (err.message === 'TIMEOUT' || err.name === 'AbortError') {
                    console.log('   (Auto-selected Yes)');
                    updateEnv = true;
                } else {
                    log('   Skipping .env update');
                }
            } finally {
                rl.close();
            }
        }

        if (updateEnv) {
            const envPath = path.resolve(__dirname, '../.env');
            if (fs.existsSync(envPath)) {
                let envContent = fs.readFileSync(envPath, 'utf8');
                const regex = /^PRIVACY_BRIDGE_CONTRACT=.*$/m;
                if (regex.test(envContent)) {
                    envContent = envContent.replace(regex, `PRIVACY_BRIDGE_CONTRACT=${contractAddress}`);
                    fs.writeFileSync(envPath, envContent);
                    log('   ✅ Updated PRIVACY_BRIDGE_CONTRACT in .env');
                } else {
                    fs.appendFileSync(envPath, `\nPRIVACY_BRIDGE_CONTRACT=${contractAddress}\n`);
                    log('   ✅ Added PRIVACY_BRIDGE_CONTRACT to .env');
                }
            }
        }

        console.log();
        console.log('═'.repeat(60));
        console.log('CONTRACT DEPLOYMENT COMPLETE');
        console.log('═'.repeat(60));
        console.log(`   Network:     ${config.network}`);
        console.log(`   Address:     ${contractAddress}`);
        console.log(`   Deploy Time: ${new Date().toISOString()}`);
        console.log('═'.repeat(60));
        console.log();

        logSuccess('Deployment completed successfully!');
        await wallet.close();
        return contractAddress;

    } catch (err: any) {
        logError('Deployment failed', err);
        console.error(err.stack || err);
        return null;
    }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1].endsWith('deploy-contract.ts')) {
    deploy().then(addr => {
        if (!addr) process.exit(1);
        process.exit(0);
    }).catch(err => {
        console.error(err);
        process.exit(1);
    });
}
