#!/usr/bin/env npx tsx
/**
 * Demo 3: Encrypted On-Chain Storage
 * 
 * Demonstrates the full flow of encrypting data for a specific recipient
 * using wallet public keys, storing on-chain, and recipient decryption.
 * 
 * Flow:
 * 1. Alice encrypts data for Bob using Bob's wallet encryptionPublicKey
 * 2. Alice stores encrypted payload on-chain
 * 3. Alice grants access to herself (owner)
 * 4. Bob cannot access (pre-grant)
 * 5. Alice grants access to Bob
 * 6. Charlie cannot access (never granted)
 * 7. Charlie attempts unauthorised self-grant - FAILS
 * 8. Alice revokes Bob's access
 * 
 * Run: npm run demo:storage
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
    formatHash,
    getOwnerAuth,
    computeAuthCommitment
} from '../lib/harness.js';
import {
    generateDataId,
    bytesToHex,
    createEncryptionEnvelope,
    decryptEnvelope,
    generateEncryptionKey
} from '../lib/crypto.js';
import {
    getUser,
    closeAllUsers
} from '../lib/users.js';

async function runDemo() {
    logHeader('Demo 3: Encrypted On-Chain Storage & Access Control');

    let alice: any;
    let bob: any;
    let charlie: any;
    const results: any[] = [];

    try {
        logStep(1, 8, 'Initialize actors and connect to contract');

        await initEnvironment();
        alice = await getUser('alice');
        bob = await getUser('bob');
        charlie = await getUser('charlie');

        // Check required wallet balances
        const MIN_BALANCE = 5_000_000n;
        if (alice.balance < MIN_BALANCE) {
            logError(`Alice wallet has insufficient funds (${alice.balance} DUST). Run: npm run fund`);
            return false;
        }
        if (charlie.balance < MIN_BALANCE) {
            logError(`Charlie wallet has insufficient funds (${charlie.balance} DUST). Run: npm run fund`);
            return false;
        }

        const {
            deployedContract,
            contractAddress,
            queryState: queryStateFull,
            waitForBlockHeight,
            ledgerAccessor,
            ContractClass,
            QueryContext
        } = await getPrivacyBridgeContract(alice.wallet, alice.state);

        log(`   ✅ Connected to contract at ${contractAddress}`);

        logStep(2, 8, 'Alice encrypts and stores sensitive data for Bob');
        const dataId = generateDataId('sensitive_info_02');

        // Use envelope-based encryption for on-chain storage
        // Use envelope-based encryption for on-chain storage (Schema.org/Person)
        const sensitiveContent = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            'name': 'Alice Smith',
            'knows': {
                '@type': 'Person',
                'name': 'Bob',
                'telephone': '123456789',
                'disambiguatingDescription': 'Emergency Contact'
            },
            'medicalCondition': {
                '@type': 'MedicalCondition',
                'name': 'Blood Type O+',
                'code': {
                    '@type': 'MedicalCode',
                    'code': 'O+',
                    'codingSystem': 'ABO'
                }
            }
        });
        log(`   📝 Sensitive Data: "${sensitiveContent}"`);

        const { encryptedPayload, metadata } = createEncryptionEnvelope(
            sensitiveContent,
            alice.seed,
            bob.encryptionKeypair.publicKeyHex
        );

        const { secret: aliceSecret, secretHex } = await getOwnerAuth(dataId, alice);
        const contractInstance = new (ContractClass as any)({});
        const authCommitment = await computeAuthCommitment(contractInstance, aliceSecret, contractAddress);

        const truncatedCiphertext = encryptedPayload.length > 32
            ? `${encryptedPayload.substring(0, 32)}...`
            : encryptedPayload;
        log(`   🔒 Encrypted Ciphertext: ${truncatedCiphertext}`);

        debug(`Alice Secret verify: ${secretHex}`);
        debug(`Auth Commitment to store: ${bytesToHex(authCommitment)}`);

        log(`   🚀 Submitting storeEncryptedData (ID: ${formatHash(dataId)})...`);
        const storeRes = await (deployedContract as any).callTx.storeEncryptedData(
            dataId,
            metadata, // Store the envelope metadata
            alice.did,
            encryptedPayload,
            '', // We don't use separate key storage in this demo (it's in the envelope)
            authCommitment
        );
        log(`   ✅ Alice's data stored. Block: ${storeRes.public?.blockHeight}, Tx: ${storeRes.public?.txHash}`);
        await waitForBlockHeight(contractAddress, storeRes.public?.blockHeight);

        // Debug: Check commitment on-chain
        const { state: debugState } = (await queryStateFull(contractAddress))!;
        const debugLedger = ledgerAccessor(debugState.data);
        const onChainCommitment = debugLedger.encryptedDataAuthCommitment.lookup(dataId);
        debug(`on-chain authCommitment: ${bytesToHex(onChainCommitment)}`);
        debug(`expected commitment (Alice): ${bytesToHex(authCommitment)}`);

        // Helper to run local check
        const checkAccess = async (label: string, recipientDid: Uint8Array, expected: boolean, statusLabel?: string, recipientUser?: any) => {
            try {
                const { state } = (await queryStateFull(contractAddress))!;
                const context = {
                    originalState: state,
                    transactionContext: new QueryContext(state.data, contractAddress)
                };
                const partialProofData = {
                    input: { value: [], alignment: [] },
                    output: undefined as any,
                    publicTranscript: [],
                    privateTranscriptOutputs: []
                };

                const result = contractInstance._hasAccess_0(context, partialProofData, dataId, recipientDid);
                debug('   DEBUG hasAccess result:', result);

                let actual = result === true;
                const passed = actual === expected;
                results.push({ scenario: label, expected, actual, passed });

                if (passed && statusLabel) {
                    let decryptedContent = '';
                    if (actual && recipientUser) {
                        try {
                            const ledger = ledgerAccessor(state.data);
                            const encryptedPayload = ledger.encryptedData.lookup(dataId);
                            const metadata = ledger.disclosureMetadata.lookup(dataId);
                            if (encryptedPayload && metadata) {
                                decryptedContent = decryptEnvelope(encryptedPayload, metadata, recipientUser.seed);
                            }
                        } catch (decryptErr: any) {
                            debug('Full decryption error:', decryptErr);
                        }
                    }

                    if (decryptedContent) {
                        log(`   🔓 Decrypted Content: "${decryptedContent}"`);
                    }
                    log(`   ✅ ${statusLabel}.`);
                } else if (!passed) {
                    log(`   ⚠️ ${label}: FAILED (Actual: ${actual})`);
                }
            } catch (e: any) {
                if (e.message.includes('expected a cell, received null') || e.message.includes('received null')) {
                    debug(`   Caught known "no access" error: ${e.message}`);
                    const actual = false;
                    const passed = actual === expected;
                    results.push({ scenario: label, expected, actual, passed });

                    if (passed && statusLabel) {
                        log(`   ✅ ${statusLabel}.`);
                    } else if (!passed) {
                        log(`   ⚠️ ${label}: FAILED (Actual: ${actual})`);
                    }
                    return;
                }

                log(`   ⚠️ ${label}: FAILED (Threw: ${e.message.slice(0, 40)})`);
                results.push({ scenario: label, expected, actual: false, passed: false });
            }
        };

        logStep(3, 8, 'Test: Owner access (Alice)');
        debug('   Waiting for store indexing to stabilize...');
        await new Promise(resolve => setTimeout(resolve, 5000));

        const selfGrantResult = await (deployedContract as any).callTx.grantAccess(dataId, alice.did, alice.did, aliceSecret);
        log(`   ✅ Alice granted access to herself. Block: ${selfGrantResult.public?.blockHeight}, Tx: ${selfGrantResult.public?.txHash}`);
        await waitForBlockHeight(contractAddress, selfGrantResult.public?.blockHeight);

        await checkAccess('Owner (Alice) can access own data', alice.did, true, 'Owner access: PASS', alice);

        logStep(4, 8, 'Test: Bob access (pre-grant)');
        await checkAccess('Bob cannot access before grant', bob.did, false, 'Pre-grant denial: PASS');

        logStep(5, 8, 'Test: Bob access (post-grant)');
        const grantBobResult = await (deployedContract as any).callTx.grantAccess(dataId, bob.did, alice.did, aliceSecret);
        log(`   ✅ Alice granted access to Bob. Block: ${grantBobResult.public?.blockHeight}, Tx: ${grantBobResult.public?.txHash}`);
        await waitForBlockHeight(contractAddress, grantBobResult.public?.blockHeight);

        await checkAccess('Bob can access after grant', bob.did, true, 'Post-grant access: PASS', bob);

        logStep(6, 8, 'Test: Charlie access (never granted)');
        await checkAccess('Charlie cannot access (never granted)', charlie.did, false, 'Unsed denial: PASS');

        logStep(7, 8, 'Test: Charlie attempts unauthorised self-grant');

        log(`   🎭 Charlie attempts to grant himself access to Alice's data...`);

        // Connect Charlie to contract with his own wallet
        const { deployedContract: charlieContract } = await getPrivacyBridgeContract(charlie.wallet, charlie.state);

        try {
            // Charlie tries to grant access to himself, but doesn't have Alice's secret.
            // He provides his own secret (or a random one), which will fail the on-chain commitment check.
            const { secret: charlieSecret, secretHex: charlieSecretHex } = await getOwnerAuth(dataId, charlie);
            const charlieCommitment = await computeAuthCommitment(contractInstance, charlieSecret, contractAddress);
            log(`   DEBUG: Charlie Secret: ${charlieSecretHex}`);
            log(`   DEBUG: Charlie Commitment (hash of his secret): ${bytesToHex(charlieCommitment)}`);
            log(`   DEBUG: Stored Commitment (Alice's): ${bytesToHex(onChainCommitment)}`);

            const selfGrantRes = await (charlieContract as any).callTx.grantAccess(
                dataId,
                charlie.did,
                alice.did,
                charlieSecret
            );

            await waitForBlockHeight(contractAddress, selfGrantRes.public?.blockHeight);
            log(`   ⚠️  Transaction submitted (Block: ${selfGrantRes.public?.blockHeight})`);

            // Now verify Charlie STILL doesn't have access
            await checkAccess('Charlie cannot access after self-grant attempt', charlie.did, false, 'Self-grant attack prevented: PASS');

        } catch (e: any) {
            // Transaction was rejected outright - even better
            log(`   ❌ Transaction rejected by contract`);
            results.push({ scenario: 'Charlie self-grant attack rejected', expected: false, actual: false, passed: true });
            log(`   ✅ Self-grant attack prevented: PASS.`);
        }

        logStep(8, 8, 'Test: Bob access (revoked)');
        const revokeResult = await (deployedContract as any).callTx.revokeAccess(dataId, bob.did, alice.did, aliceSecret);
        log(`   ✅ Alice revoked access from Bob. Block: ${revokeResult.public?.blockHeight}, Tx: ${revokeResult.public?.txHash}`);
        await waitForBlockHeight(contractAddress, revokeResult.public?.blockHeight);

        await checkAccess('Bob cannot access after revoke', bob.did, false, 'Post-revoke denial: PASS');

        // Print final summary matrix
        console.log();
        console.log('═'.repeat(60));
        console.log('ACCESS CONTROL MATRIX RESULTS');
        console.log('═'.repeat(60));

        let passCount = 0;
        for (const r of results) {
            const status = r.passed ? '✅ PASS' : '❌ FAIL';
            console.log(`${status} | ${r.scenario} | Expected: ${r.expected}, Actual: ${r.actual}`);
            if (r.passed) passCount++;
        }

        console.log('─'.repeat(60));
        console.log(`Total: ${passCount}/${results.length} tests passed`);
        console.log('═'.repeat(60));
        console.log();

        logSuccess('DEMO 3: ENCRYPTED STORAGE & ACCESS CONTROL COMPLETED');
        return true;

    } catch (error: any) {
        logError('Demo failed', error);
        if (error.stack) {
            console.error('\nStack Trace:');
            console.error(error.stack);
        }
        return false;
    } finally {
        await closeAllUsers();
    }
}

// Run the demo
runDemo().then(success => process.exit(success ? 0 : 1));
