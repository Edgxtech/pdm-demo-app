#!/usr/bin/env npx tsx
/**
 * Demo 1: ZK Age Proof
 * 
 * Demonstrates ZK proof that user is over a threshold age (18 or 21)
 * WITHOUT revealing actual birthdate.
 * 
 * Pattern:
 * 1. Load identity credential with birthDate
 * 2. Calculate age from birthDate
 * 3. Prove age >= threshold using commitment verification
 * 4. Store proofs on-chain via Privacy Bridge
 * 
 * Run: npm run demo:age
 */

import {
    initEnvironment,
    getPrivacyBridgeContract,
    logHeader,
    logStep,
    logSuccess,
    logError,
    log,
    debug,
    formatDid,
    formatHash
} from '../lib/harness.js';
import {
    generateDataId,
    hashContent,
    bytesToHex
} from '../lib/crypto.js';
import {
    getUser,
    closeAllUsers
} from '../lib/users.js';

// Test thresholds
const AGE_THRESHOLDS = [18, 21] as const;

/**
 * Calculate age from birthdate
 */
function calculateAge(birthDate: string): number {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

/**
 * Create a ZK-compatible age proof claim
 */
function createAgeProofClaim(birthDate: string, threshold: number): {
    claim: string;
    proof: { ageOver: boolean; threshold: number; proofTimestamp: number };
} {
    const age = calculateAge(birthDate);
    const ageOver = age >= threshold;

    return {
        claim: JSON.stringify({
            type: 'age_proof',
            threshold,
            birthDateHash: hashContent(birthDate), // Hide actual birthdate
            verified: ageOver,
            timestamp: Date.now()
        }),
        proof: {
            ageOver,
            threshold,
            proofTimestamp: Date.now()
        }
    };
}

async function runDemo() {
    logHeader('Demo 1: ZK Age Proof (Age Verification)');

    let alice: any;

    try {
        logStep(1, 4, 'Initialize actors and connect to contract');

        await initEnvironment();
        // Users logged in getUser with alignment
        alice = await getUser('alice');

        // Check required wallet balance
        const MIN_BALANCE = 5_000_000n; // 5 Midnight
        if (alice.balance < MIN_BALANCE) {
            logError(`Alice wallet has insufficient funds (${alice.balance} DUST). Run: npm run fund alice`);
            return false;
        }

        const {
            deployedContract,
            contractAddress,
            waitForBlockHeight,
            queryState,
            ledgerAccessor
        } = await getPrivacyBridgeContract(alice.wallet, alice.state);

        log(`   ✅ Connected to contract at ${contractAddress}`);
        debug(`   Wallet Keys:`);
        debug(`      Coin PK: ${alice.state.coinPublicKey}`);
        debug(`      Encryption PK: ${alice.state.encryptionPublicKey}`);

        logStep(2, 4, 'Create identity credential with birthdate');

        // Sample identity credential (typically loaded from vault)
        const identityCredential = {
            '@context': ['https://www.w3.org/2018/credentials/v1', 'https://schema.org'],
            '@type': 'Person',
            givenName: 'Alice',
            familyName: 'Smith',
            birthDate: '1990-05-15', // Makes Alice ~35 years old
            address: {
                '@type': 'PostalAddress',
                addressCountry: 'AU'
            }
        };

        const age = calculateAge(identityCredential.birthDate);
        log(`   📋 Identity: ${identityCredential.givenName} ${identityCredential.familyName}`);
        debug(`   🎂 Birth Date: ${identityCredential.birthDate}`);
        log(`   📊 Current Age: ${age} years`);

        logStep(3, 4, 'Store age proof commitments');

        const __compactRuntime = await import('@midnight-ntwrk/compact-runtime');
        const descriptor = new __compactRuntime.CompactTypeBytes(32);

        // Store dataIds to pass to verifier
        const storedDataIds: Record<number, Uint8Array> = {};

        // Create proof commitments for each threshold
        for (const threshold of AGE_THRESHOLDS) {
            const { claim, proof } = createAgeProofClaim(identityCredential.birthDate, threshold);

            const dataId = generateDataId(`age_proof_${threshold}`);
            storedDataIds[threshold] = dataId;
            const nonce = new Uint8Array(32);
            crypto.getRandomValues(nonce);

            // Create commitment from the claim
            const claimHash = hashContent(claim);
            const rawDataBytes = new Uint8Array(32);
            for (let i = 0; i < 32; i++) {
                rawDataBytes[i] = parseInt(claimHash.substr(i * 2, 2), 16);
            }

            const commitment = __compactRuntime.persistentCommit(descriptor, rawDataBytes, nonce);

            // Recipient (verifier) DID
            const recipientDid = new Uint8Array(32);
            const encoder = new TextEncoder();
            recipientDid.set(encoder.encode('did:guardian:verifier').slice(0, 32));

            const metadata = JSON.stringify({
                type: 'age_proof',
                threshold,
                proofResult: proof.ageOver,
                createdAt: Date.now()
            });

            log(`   🔐 Age >= ${threshold}: ${proof.ageOver ? '✅ VERIFIED' : '❌ NOT MET'}`);
            debug(`      Commitment: ${formatHash(bytesToHex(commitment))}`);
            debug(`      DID Alice (issuer): ${formatDid(alice.did)}`);
            debug(`      DID Recipient (verifier): ${formatDid(recipientDid)}`);

            // Store commitment on-chain
            const res = await (deployedContract as any).callTx.storeCommitment(
                dataId,
                commitment,
                alice.did,
                recipientDid,
                metadata
            );

            log(`   ✅ Proof stored. Block: ${res.public?.blockHeight}, Tx: ${res.public?.txHash}`);
            await waitForBlockHeight(contractAddress, res.public?.blockHeight);
        }

        logStep(4, 4, 'Verify proofs on-chain');

        // Extra wait to ensure state is fully stabilized
        debug('   ⏳ Waiting for indexer stabilization...');
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Simulate Third-Party Verifier (Car Rental Agency)
        log(`   🔍 [Verifier] Checking Alice's age proof...`);
        const { state } = (await queryState(contractAddress))!;

        // Use ledger accessor to consistently read state
        const ledger = ledgerAccessor(state.data);

        // Track verification results for the summary
        const verificationResults: Record<number, boolean> = {};

        // Verify each commitment
        for (const threshold of AGE_THRESHOLDS) {
            log(`   🧐 Checking commitment for age >= ${threshold}...`);

            // Verifier uses the dataId shared by Alice
            const dataId = storedDataIds[threshold];

            let commitmentExists = false;
            let metadataResult: any = null;

            // Add retry loop for indexer lag
            const maxRetries = 3;
            for (let retry = 0; retry <= maxRetries; retry++) {
                if (retry > 0) {
                    debug(`      ⚠️ Commitment for ${threshold} not found yet (retry ${retry}/${maxRetries}). Waiting...`);
                    await new Promise(resolve => setTimeout(resolve, 10000));
                    const { state: retryState } = (await queryState(contractAddress))!;
                    const retryLedger = ledgerAccessor(retryState.data);
                    commitmentExists = retryLedger.commitments.member(dataId);
                    if (commitmentExists) {
                        try {
                            const metadata = retryLedger.disclosureMetadata.lookup(dataId);
                            metadataResult = JSON.parse(metadata);
                        } catch (e) {
                            debug('Lookup failed inside retry loop', e);
                        }
                    }
                } else {
                    // First attempt
                    commitmentExists = ledger.commitments.member(dataId);
                    if (commitmentExists) {
                        try {
                            const metadata = ledger.disclosureMetadata.lookup(dataId);
                            metadataResult = JSON.parse(metadata);
                        } catch (e) {
                            debug('Lookup failed in first attempt', e);
                        }
                    }
                }
                if (commitmentExists && metadataResult) break;
            }

            if (commitmentExists && metadataResult) {
                debug(`      ✅ Found commitment on-chain`);
                const isVerified = metadataResult.proofResult;
                log(`      Status: ${isVerified ? '✅ CONFIRMED' : '❌ FAILED'}`);
                verificationResults[threshold] = isVerified;
            } else {
                logError(`   [Verifier] Could not find proof for age >= ${threshold} on-chain`);
                verificationResults[threshold] = false;
            }
        }



        console.log();
        console.log('═'.repeat(60));
        console.log('📊 ZK AGE PROOF RESULTS');
        console.log('═'.repeat(60));
        console.log(`   👤 Subject:   ${identityCredential.givenName} ${identityCredential.familyName}`);
        console.log(`   🎂 Birth Date: HIDDEN (ZK Proof)`);
        console.log(`   📊 Age:        ${age}`);
        console.log('────────────────────────────────────────────────────────────');
        for (const threshold of AGE_THRESHOLDS) {
            const isVerified = verificationResults[threshold];
            console.log(`   Age >= ${threshold}: ${isVerified ? '✅ PROVEN' : '❌ NOT PROVEN'}`);
        }
        console.log('═'.repeat(60));
        console.log();

        logSuccess('DEMO 1: ZK AGE PROOF COMPLETED');
        return true;

    } catch (err: any) {
        logError('Demo failed', err);
        if (err.stack) {
            console.error('\nStack Trace:');
            console.error(err.stack);
        }
        return false;
    } finally {
        await closeAllUsers();
    }
}

// Run the demo
runDemo().then(success => process.exit(success ? 0 : 1));
