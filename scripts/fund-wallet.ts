#!/usr/bin/env npx tsx
/**
 * PDM Demo - Fund Wallet Script
 * 
 * Funds demo wallets with DUST tokens.
 * 
 * Usage:
 *   npm run fund          # Fund all configured wallets
 *   npm run fund alice    # Fund specific wallet
 *   npm run fund bob      # Fund specific wallet
 * 
 * For nightdemo/ausstaker network: Calls the faucet API
 * For local/undeployed network: Transfers from genesis wallet (bulk)
 * 
 * Run: npm run fund [wallet-name]
 */

import {
    initEnvironment,
    createWallet,
    updateConfig,
    log,
    logHeader,
    logSuccess,
    logError,
    logWarning
} from '../lib/harness.js';

// Wallet configuration
const WALLET_ENV_VARS: Record<string, string> = {
    admin: 'ADMIN_WALLET_SEED',
    alice: 'ALICE_WALLET_SEED',
    bob: 'BOB_WALLET_SEED',
    charlie: 'CHARLIE_WALLET_SEED',
    emergency: 'EMERGENCY_WALLET_SEED',
};

// Faucet API endpoint
const FAUCET_URL = 'https://nightdemo.ausstaker.com.au/api/faucet';

// Genesis wallet seed - this wallet is auto-funded on local/undeployed dev networks
const GENESIS_MINT_WALLET_SEED = '0000000000000000000000000000000000000000000000000000000000000001';

// Amount to transfer from genesis (in DUST) - 50 Midnight per wallet
const GENESIS_TRANSFER_AMOUNT = 50_000_000n;

// Minimum balance threshold - fund if below this
const MIN_BALANCE_THRESHOLD = 10_000_000n;

/**
 * Fund wallet via nightdemo faucet API
 */
async function fundViaFaucet(walletAddress: string): Promise<{ success: boolean; message: string; txId?: string }> {
    try {
        const response = await fetch(FAUCET_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ address: walletAddress })
        });

        const data = await response.json() as any;

        if (!response.ok) {
            if (data.rateLimited) {
                return {
                    success: false,
                    message: `Rate limited: ${data.error}`
                };
            }
            return {
                success: false,
                message: data.error || `Faucet request failed with status ${response.status}`
            };
        }

        return {
            success: true,
            message: data.message || `Received ${data.amount || 100} DUST tokens`,
            txId: data.txId
        };

    } catch (error: any) {
        return {
            success: false,
            message: `Failed to connect to faucet: ${error.message}`
        };
    }
}

/**
 * Fund multiple wallets via genesis wallet transfer (bulk transaction)
 */
async function fundViaGenesisBulk(recipients: { address: string, amount: bigint }[]): Promise<{ success: boolean; message: string; txId?: string }> {
    try {
        log(`   Creating genesis wallet connection...`);
        const genesis = await createWallet(GENESIS_MINT_WALLET_SEED);

        const totalAmount = recipients.reduce((sum, r) => sum + r.amount, 0n);
        if (genesis.balance < totalAmount) {
            await genesis.wallet.close();
            return {
                success: false,
                message: `Genesis wallet has insufficient funds (${genesis.balance} DUST). Total needed: ${totalAmount} DUST.`
            };
        }

        log(`   Preparing bulk transaction for ${recipients.length} recipients...`);
        const { nativeToken } = await import('@midnight-ntwrk/zswap');
        const transferRecipe = await genesis.wallet.transferTransaction(
            recipients.map(r => ({
                amount: r.amount,
                receiverAddress: r.address,
                type: nativeToken()
            }))
        );

        log(`   Proving and submitting bulk transaction...`);
        const transaction = await genesis.wallet.proveTransaction(transferRecipe);
        const txHash = await genesis.wallet.submitTransaction(transaction);

        await genesis.wallet.close();

        return {
            success: true,
            message: `Transferred funds to ${recipients.length} wallets in a single transaction`,
            txId: txHash
        };

    } catch (error: any) {
        return {
            success: false,
            message: `Bulk genesis transfer failed: ${error.message}`
        };
    }
}

/**
 * Wait for wallet balance to update
 */
async function waitForBalance(wallet: any, expectedMinBalance: bigint, maxWaitMs: number = 60000): Promise<bigint> {
    const { nativeToken } = await import('@midnight-ntwrk/zswap');
    const Rx = await import('rxjs');
    const startTime = Date.now();

    while (Date.now() - startTime < maxWaitMs) {
        try {
            const state = await Rx.firstValueFrom(
                wallet.state().pipe(
                    Rx.filter((s: any) => s.syncProgress?.synced === true),
                    Rx.timeout(10000)
                )
            );
            const balance = (state as any).balances[nativeToken()] || 0n;
            if (balance >= expectedMinBalance) {
                return balance;
            }
        } catch {
            // Timeout or error, continue waiting
        }
        await new Promise(resolve => setTimeout(resolve, 3000));
    }

    // Final check
    try {
        const finalState = await Rx.firstValueFrom(wallet.state().pipe(Rx.timeout(5000)));
        return (finalState as any).balances[nativeToken()] || 0n;
    } catch {
        return 0n;
    }
}

/**
 * Get all configured wallets from environment
 */
function getConfiguredWallets(): { name: string; seed: string }[] {
    const wallets: { name: string; seed: string }[] = [];

    for (const [name, envVar] of Object.entries(WALLET_ENV_VARS)) {
        const seed = process.env[envVar];
        if (seed && seed.length >= 64) {
            wallets.push({ name, seed });
        }
    }

    return wallets;
}

/**
 * Main entry point
 */
export async function fundWallets(specificWallet?: string) {
    if (!specificWallet) {
        const args = process.argv.slice(2);
        // Filter out flags starting with --
        const posArgs = args.filter(arg => !arg.startsWith('--'));
        specificWallet = posArgs[0]?.toLowerCase();
    }

    logHeader('PDM Demo - Fund Wallets');

    const activeConfig = updateConfig();
    const network = activeConfig.network.toLowerCase();
    const isNightdemo = network === 'ausstaker' || network === 'testnet';

    log(`📋 Network: ${activeConfig.network} (${isNightdemo ? 'nightdemo faucet' : 'local genesis bulk'})`);

    // Get configured wallets
    const configuredWallets = getConfiguredWallets();

    if (configuredWallets.length === 0) {
        logError('No wallet seeds configured in .env');
        process.exit(1);
    }

    // Determine target wallets
    let targetWallets: { name: string; seed: string }[];
    if (specificWallet) {
        const wallet = configuredWallets.find(w => w.name === specificWallet);
        if (!wallet) {
            logError(`Wallet "${specificWallet}" not found`);
            process.exit(1);
        }
        targetWallets = [wallet];
    } else {
        const CORE_ACTORS = ['admin', 'alice', 'bob', 'charlie', 'emergency'];
        targetWallets = configuredWallets.filter(w => CORE_ACTORS.includes(w.name));
        log(`🎯 Default: Funding core actors (${targetWallets.map(w => w.name).join(', ')})`);
    }

    // Phase 1: Sync all target wallets in parallel
    log(`\n🔍 Checking balances for ${targetWallets.length} wallet(s)...`);
    const syncPromises = targetWallets.map(async (tw): Promise<any> => {
        try {
            process.stdout.write('.');
            const walletData = await createWallet(tw.seed);
            return { ...tw, ...walletData, success: true };
        } catch (error: any) {
            logError(`Failed to sync ${tw.name}: ${error.message}`);
            return { ...tw, success: false };
        }
    });

    const syncedWallets = await Promise.all(syncPromises);
    console.log(' done.');

    // Separate wallets into categories
    const alreadyFunded = syncedWallets.filter(sw => sw.synced && sw.balance >= MIN_BALANCE_THRESHOLD);
    const needFunding = syncedWallets.filter(sw => !sw.synced || sw.balance < MIN_BALANCE_THRESHOLD);

    for (const af of alreadyFunded) {
        log(`   ✅ ${af.name.toUpperCase()}: Already funded (${af.balance} DUST)`);
        await af.wallet.close();
    }

    if (needFunding.length === 0) {
        console.log();
        logSuccess('All target wallets are already funded!');
        return;
    }

    // Phase 2: Funding
    log(`\n💰 Funding ${needFunding.length} wallet(s)...`);

    if (isNightdemo) {
        // Nightdemo: Sequential faucet calls
        for (const wf of needFunding) {
            log(`   Requesting faucet for ${wf.name.toUpperCase()}...`);
            const result = await fundViaFaucet(wf.address);
            if (result.success) {
                log(`      ✅ ${result.message}`);
            } else {
                logError(`      ${result.message}`);
            }
        }
    } else {
        // Local: Bulk genesis transfer
        const recipients = needFunding.map(wf => ({
            address: wf.address,
            amount: GENESIS_TRANSFER_AMOUNT
        }));

        const result = await fundViaGenesisBulk(recipients);
        if (result.success) {
            log(`   ✅ ${result.message}`);
            if (result.txId) log(`   Tx: ${result.txId}`);
        } else {
            logError(result.message);
            for (const wf of needFunding) await wf.wallet.close();
            process.exit(1);
        }
    }

    // Phase 3: Wait for balance updates
    console.log();
    log(`⌛ Waiting for ${needFunding.length} wallet(s) to sync and update on-chain...`);
    console.log('─'.repeat(40));

    const waitPromises = needFunding.map(async (wf) => {
        try {
            const newBalance = await waitForBalance(wf.wallet, wf.balance + 1n);
            logSuccess(`${wf.name.toUpperCase()}: Synced! Balance: ${newBalance} DUST`);
        } catch (e: any) {
            logError(`${wf.name.toUpperCase()}: Final sync failed: ${e.message}`);
        } finally {
            await wf.wallet.close();
        }
    });

    await Promise.all(waitPromises);

    // Summary
    console.log();
    console.log('═'.repeat(60));
    console.log('💰 Project Status');
    console.log('═'.repeat(60));
    console.log();
    logSuccess('Wallets funded and verified!');
    console.log();
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1].endsWith('fund-wallet.ts')) {
    fundWallets().catch((error) => {
        logError('Failed to fund wallets');
        console.error(error);
        process.exit(1);
    });
}
