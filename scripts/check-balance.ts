#!/usr/bin/env npx tsx
/**
 * Check Wallet Balance
 * 
 * Verifies your wallet is funded and ready for demos.
 * 
 * Run: npm run check-balance
 */

import { initEnvironment, createWallet, log, logHeader, logSuccess, logError } from '../lib/harness.js';

const WALLET_ENV_VARS: Record<string, string> = {
    admin: 'ADMIN_WALLET_SEED',
    alice: 'ALICE_WALLET_SEED',
    bob: 'BOB_WALLET_SEED',
    charlie: 'CHARLIE_WALLET_SEED',
    emergency: 'EMERGENCY_WALLET_SEED',
};

async function checkBalance() {
    const args = process.argv.slice(2);
    const specificWallet = args[0]?.toLowerCase();

    logHeader('PDM Demo - Check Wallet Balance');

    try {
        await initEnvironment();

        // Get configured wallets
        const wallets: { name: string; seed: string }[] = [];
        for (const [name, envVar] of Object.entries(WALLET_ENV_VARS)) {
            const seed = process.env[envVar];
            if (seed && seed.length >= 64) {
                wallets.push({ name, seed });
            }
        }

        if (wallets.length === 0 && !process.env.WALLET_SEED) {
            logError('No wallets configured in .env');
            process.exit(1);
        }

        // Add legacy if present
        if (process.env.WALLET_SEED) {
            wallets.push({ name: 'legacy', seed: process.env.WALLET_SEED });
        }

        // Filter if specific requested
        let targets = wallets;
        if (specificWallet) {
            targets = wallets.filter(w => w.name === specificWallet);
            if (targets.length === 0) {
                logError(`Wallet "${specificWallet}" not found`);
                process.exit(1);
            }
        }

        console.log(`🔍 Checking balance for ${targets.length} wallet(s)...`);

        for (const target of targets) {
            const { wallet, balance, address } = await createWallet(target.seed);

            const shortAddr = address.length > 24
                ? `${address.slice(0, 9)}...${address.slice(-12)}`
                : address;

            log(`   📦 ${target.name.toUpperCase().padEnd(10)} | ${shortAddr} | ${balance} DUST`);

            await wallet.close();
        }

        console.log();
        logSuccess('Balance check complete.');

    } catch (error: any) {
        logError('Failed to check balance', error);
        process.exit(1);
    }
}

checkBalance();
