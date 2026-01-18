#!/usr/bin/env npx tsx
/**
 * Test Users - Multi-user wallet management for PDM demos
 * 
 * Provides deterministic test users with known seeds for reproducible demos.
 * These seeds are for LOCAL DEVELOPMENT ONLY - never use on mainnet.
 */

import { createWallet } from './harness.js';
import { createDid, didToBytes32, type DidType } from './credentials.js';
import { deriveEncryptionKeypair } from './ecdh.js';

/**
 * Test user seeds - read from environment with fallbacks
 * WARNING: Fallback seeds are for local development only!
 */
export function getUserSeeds(): Record<string, string> {
    return {
        // Primary test user (Alice) - the data owner
        alice: process.env.ALICE_WALLET_SEED ||
            'aaaaaaaa1111111111111111111111111111111111111111111111111111aaaa',

        // Secondary user (Bob) - recipient/approver (family member)
        bob: process.env.BOB_WALLET_SEED ||
            'bbbbbbbb2222222222222222222222222222222222222222222222222222bbbb',

        // Third user (Charlie) - unauthorized party for negative tests
        charlie: process.env.CHARLIE_WALLET_SEED ||
            'cccccccc3333333333333333333333333333333333333333333333333333cccc',

        // Emergency services user (organization)
        emergency: process.env.EMERGENCY_WALLET_SEED ||
            'eeeeeeee4444444444444444444444444444444444444444444444444444eeee',

        // Admin/Government user (credential issuer)
        admin: process.env.ADMIN_WALLET_SEED ||
            'aaaaaaa15555555555555555555555555555555555555555555555555555aaaa',

        // Genesis faucet (for funding test users)
        genesis: '0000000000000000000000000000000000000000000000000000000000000001'
    };
}

// Legacy support for USER_SEEDS constant - DEPRECATED
export const USER_SEEDS = getUserSeeds();

import { updateConfig } from './harness.js';
export { updateConfig };

/**
 * User DID types - defines whether each user is individual, organization, or government
 */
export const USER_DID_TYPES: Record<string, DidType> = {
    alice: 'user',
    bob: 'user',
    charlie: 'user',
    emergency: 'org',    // Emergency Services is an organization
    admin: 'gov',        // Admin is government/issuer
    genesis: 'gov'
};

/**
 * User wallet cache to avoid re-syncing
 */
const walletCache: Map<string, any> = new Map();

/**
 * Get a wallet for a named test user
 */
export async function getUser(name: string): Promise<{
    wallet: any;
    state: any;
    balance: bigint;
    address: string;
    did: Uint8Array;
    didString: string;
    didType: DidType;
    name: string;
    seed: string;
    encryptionKeypair: {
        privateKey: Uint8Array;
        publicKey: Uint8Array;
        publicKeyHex: string;
    };
}> {
    const seeds = getUserSeeds();
    const seed = (seeds as any)[name];
    if (!seed) {
        throw new Error(`Unknown test user: ${name}`);
    }

    // Check cache
    if (walletCache.has(name)) {
        return walletCache.get(name);
    }

    const walletData = await createWallet(seed);

    // Log wallet info with truncated address (start...end)
    const addr = walletData.address || 'unknown';
    const shortAddr = addr.length > 24 ? `${addr.slice(0, 9)}...${addr.slice(-12)}` : addr;
    const balance = walletData.balance || 0n;
    // All active demo participants need funding for transactions
    const isFundedUser = name === 'alice' || name === 'bob' || name === 'charlie' || name === 'emergency' || name === 'admin';
    let balanceStr: string;
    if (balance > 0n) {
        balanceStr = `${balance} DUST`;
    } else if (isFundedUser) {
        balanceStr = '0 DUST ⚠️ NEEDS FUNDING (run: npm run fund)';
    } else {
        balanceStr = '0 DUST';
    }
    const namePadded = name.padEnd(12);
    console.log(`   ${namePadded}: ${shortAddr}, ${balanceStr}`);

    // Generate self-certifying DID from wallet public key
    const didType = USER_DID_TYPES[name] || 'user';
    const pubKey = walletData.state?.encryptionPublicKey || seed; // Use pubkey if available, else seed as fallback
    const didString = createDid(pubKey, didType);
    const did = didToBytes32(didString);

    const result = {
        ...walletData,
        did,
        didString,
        didType,
        name,
        seed,  // Include seed for owner auth generation
        encryptionKeypair: deriveEncryptionKeypair(seed)  // ECDH keypair for E2E encryption
    };

    walletCache.set(name, result);
    return result;
}

/**
 * Close all cached wallets (cleanup)
 */
export async function closeAllUsers(): Promise<void> {
    for (const [name, userData] of walletCache) {
        try {
            await userData.wallet.close();
        } catch (e) {
            // Ignore close errors
        }
    }
    walletCache.clear();
}

/**
 * Get multiple users at once
 */
export async function getUsers(...names: string[]): Promise<Map<string, any>> {
    const users = new Map();
    for (const name of names) {
        users.set(name, await getUser(name));
    }
    return users;
}
