/**
 * PDM Demo - Wallet Creation Script
 * 
 * Ensures all required wallet seeds exist in .env.
 * Does not overwrite existing seeds unless --force is passed.
 */

import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import { log, logHeader, logSuccess, logError } from '../lib/harness.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load existing environment variables
config();

const WALLETS = [
    { name: 'ADMIN', description: 'Contract deployment only', envVar: 'ADMIN_WALLET_SEED' },
    { name: 'ALICE', description: 'Primary user (data owner)', envVar: 'ALICE_WALLET_SEED' },
    { name: 'BOB', description: 'Secondary user (recipient/approver)', envVar: 'BOB_WALLET_SEED' },
    { name: 'CHARLIE', description: 'Third user (unauthorized party)', envVar: 'CHARLIE_WALLET_SEED' },
    { name: 'EMERGENCY', description: 'Emergency services', envVar: 'EMERGENCY_WALLET_SEED' },
];

function generateSeed(): string {
    return crypto.randomBytes(32).toString('hex');
}

async function askYesNo(question: string): Promise<boolean> {
    const readline = await import('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer.toLowerCase().startsWith('y'));
        });
    });
}

export async function createWallets(force: boolean = false, silent: boolean = false) {
    if (!silent) {
        logHeader('PDM Demo - Wallet Configuration');
    }

    const envPath = path.resolve(__dirname, '../.env');
    let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf-8') : '';
    let lines = envContent.split(/\r?\n/);
    let updated = false;

    if (!silent) log('🔍 Checking wallet configurations...');

    for (const wallet of WALLETS) {
        const existingValue = process.env[wallet.envVar];

        if (existingValue && !force) {
            if (!silent) log(`   ✅ ${wallet.name.padEnd(12)}: Found existing seed`);
            continue;
        }

        const newSeed = generateSeed();
        const newLine = `${wallet.envVar}=${newSeed}`;
        let found = false;

        lines = lines.map(line => {
            if (line.trim().startsWith(wallet.envVar + '=') || line.trim().startsWith(wallet.envVar + ' =')) {
                found = true;
                return newLine;
            }
            return line;
        });

        if (!found) {
            lines.push(newLine);
        }

        updated = true;
        if (!silent) log(`   ✨ ${wallet.name.padEnd(12)}: Generated new seed`);
    }

    if (updated) {
        fs.writeFileSync(envPath, lines.join('\n'));
        if (!silent) logSuccess(`Updated .env file with wallet seeds.`);
    } else {
        if (!silent) logSuccess(`No changes needed to .env file.`);
    }

    if (!silent) {
        console.log('═'.repeat(60));
    }
    return updated;
}

// If run directly
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1].endsWith('create-wallets.ts')) {
    const force = process.argv.includes('--force');
    createWallets(force).catch(err => {
        logError('Failed to create wallets:', err);
        process.exit(1);
    });
}
