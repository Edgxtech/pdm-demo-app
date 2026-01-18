#!/usr/bin/env npx tsx
/**
 * PDM Demo - Master Setup Orchestrator
 * 
 * Orchestrates the entire setup process:
 * 1. Create Wallets (Idempotent)
 * 2. Fund Wallets (Idempotent)
 * 3. Deploy Contract (Conditional/Idempotent)
 * 4. Register Credentials (Idempotent)
 * 
 * Usage:
 *   npm run setup
 *   npm run setup -- --force         # Re-generate seeds and redeploy
 *   npm run setup -- --force-deploy  # Only redeploy contract
 */

import { createWallets } from './create-wallets.js';
import { fundWallets } from './fund-wallet.js';
import { deploy } from './deploy-contract.js';
import { registerCredentials } from './register-credentials.js';
import { updateConfig } from '../lib/harness.js';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env
config({ path: path.resolve(__dirname, '../.env') });

async function main() {
    const force = process.argv.includes('--force');
    const forceDeploy = process.argv.includes('--force-deploy') || force;

    console.log();
    console.log('═'.repeat(60));
    console.log('🌙 PDM Demo - Master Setup Orchestrator');
    console.log('═'.repeat(60));
    console.log();

    // Step 1: Create Wallets
    console.log('🏁 Step 1: Wallet Creation');
    await createWallets(force, false);
    console.log();

    // Reload env after wallet creation - force dotenv to re-read the file
    config({ path: path.resolve(__dirname, '../.env'), override: true });
    updateConfig();

    // Step 2: Fund Wallets
    console.log('🏁 Step 2: Wallet Funding');
    await fundWallets();
    console.log();

    // Step 3: Deploy Contract
    console.log('🏁 Step 3: Contract Deployment');
    const existingContract = process.env.PRIVACY_BRIDGE_CONTRACT;

    if (existingContract && !forceDeploy) {
        console.log(`   ✅ Contract already deployed: ${existingContract}`);
        console.log('   (Use --force-deploy to redeploy)');
    } else {
        if (forceDeploy && existingContract) {
            console.log('   ⚠️ Force redeploying contract...');
        }
        const newAddress = await deploy(false); // Ask user to confirm .env update
        if (!newAddress) {
            console.error('❌ Contract deployment failed. Aborting setup.');
            process.exit(1);
        }
        // Update local process.env for subsequent steps
        process.env.PRIVACY_BRIDGE_CONTRACT = newAddress;
    }
    console.log();

    // Step 4: Register Credentials
    console.log('🏁 Step 4: Credential Registration');
    const success = await registerCredentials();

    if (!success) {
        console.error('❌ Credential registration failed.');
        process.exit(1);
    }

    console.log();
    console.log('═'.repeat(60));
    console.log('✅ PDM Demo - Full Setup Complete!');
    console.log('═'.repeat(60));
    console.log();
    console.log('You are now ready to run the demos:');
    console.log('   npm run demo:age       # Demo 1: ZK Age Proof');
    console.log('   npm run demo:p2p       # Demo 2: P2P Share');
    console.log('   npm run demo:storage   # Demo 3: Encrypted Storage');
    console.log('   npm run demo:emergency # Demo 4: Emergency Auth');
    console.log();
}

main().catch(err => {
    console.error('\n❌ Master setup failed:');
    console.error(err);
    process.exit(1);
});
