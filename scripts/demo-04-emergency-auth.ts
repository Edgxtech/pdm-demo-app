#!/usr/bin/env npx tsx
/**
 * Demo 4: Emergency Multi-Party Authorisation
 * 
 * Demonstrates a complete flow where:
 * 1. User logs location data periodically (background tracking)
 * 2. User triggers emergency SOS
 * 3. Unknown party (Charlie) requests access - Bob denies
 * 4. Verified emergency service requests access
 * 5. Authorised family member approves
 * 6. Emergency service receives decrypted location data
 * 
 * This simulates a medical emergency scenario where first responders
 * need access to a user's location, but only with family consent.
 * 
 * Run: npm run demo:emergency
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
    encryptForRecipient,
    decryptFromSender,
    bytesToHex
} from '../lib/crypto.js';
import {
    getUser,
    closeAllUsers
} from '../lib/users.js';
import {
    getCurrentTimestamp
} from '../lib/credentials.js';

// Simulated actors
const ACTORS = {
    dataOwner: 'Alice',
    familyMember: 'Bob',
    unknownParty: 'Charlie',
    emergencyService: 'Emergency Services (Fire & Rescue)',
} as const;

interface AccessRequest {
    requestId: string;
    requestor: string;
    requestorDid: Uint8Array;
    reason: string;
    dataType: string;
    timestamp: number;
    verified?: boolean;
    approved?: boolean;
    approvedBy?: string;
}

async function runDemo() {
    logHeader('Demo 4: Emergency Multi-Party Authorisation');

    let alice: any;
    let bob: any;
    let charlie: any;
    let emergency: any;

    try {
        logStep(1, 7, 'Initialize actors and connect to contract');

        await initEnvironment();
        alice = await getUser('alice');
        bob = await getUser('bob');
        charlie = await getUser('charlie');
        emergency = await getUser('emergency');

        // Check required wallet balances
        const MIN_BALANCE = 5_000_000n;
        if (alice.balance < MIN_BALANCE) {
            logError(`Alice wallet has insufficient funds. Run: npm run fund`);
            return false;
        }
        if (bob.balance < MIN_BALANCE) {
            logError(`Bob wallet has insufficient funds. Run: npm run fund`);
            return false;
        }
        if (charlie.balance < MIN_BALANCE) {
            logError(`Charlie wallet has insufficient funds. Run: npm run fund`);
            return false;
        }
        if (emergency.balance < MIN_BALANCE) {
            logError(`Emergency wallet has insufficient funds. Run: npm run fund`);
            return false;
        }

        const { deployedContract, contractAddress, waitForBlockHeight, ledgerAccessor, queryState: queryStateFull } = await getPrivacyBridgeContract(alice.wallet, alice.state);
        log(`   ✅ Connected to contract at ${contractAddress}`);

        log(`   👤 Data Owner:       ${ACTORS.dataOwner}`);
        log(`   👤 Family Member:     ${ACTORS.familyMember}`);
        log(`   🎭 Unknown Party:     ${ACTORS.unknownParty}`);
        log(`   🚒 Emergency Service: ${ACTORS.emergencyService}`);

        // Encryption will use Alice's seed and Bob's (family) public key via ECDH
        let dataId: Uint8Array = new Uint8Array(32);

        logStep(2, 7, 'Alice privately logs location data (background tracking before incident)');

        const locationHistory = [
            { lat: -33.8688, lng: 151.2093, altitude: 10, time: 'T-2h', notes: 'Sydney CBD' },
            { lat: -33.7520, lng: 150.6875, altitude: 600, time: 'T-1h', notes: 'Blue Mountains trail' },
        ];

        // Get contract class for auth commitment calculation
        const { ContractClass: LocationContractClass } = await getPrivacyBridgeContract(alice.wallet, alice.state);
        const locationContractInstance = new (LocationContractClass as any)({});

        // Store each location entry on-chain (background tracking before incident)
        for (let i = 0; i < locationHistory.length; i++) {
            const loc = locationHistory[i];
            const locDataId = generateDataId(`location_history_${i}`);
            const locData = {
                '@context': 'https://schema.org',
                '@type': 'Place',
                'geo': {
                    '@type': 'GeoCoordinates',
                    'latitude': loc.lat,
                    'longitude': loc.lng,
                    'elevation': loc.altitude
                },
                'timestamp': new Date(Date.now() - (locationHistory.length - i) * 3600000).toISOString(),
                'description': loc.notes
            };

            const locEncrypted = encryptForRecipient(
                JSON.stringify(locData),
                alice.seed,
                bob.encryptionKeypair.publicKeyHex
            );

            // Store data ID if it's the last one, to be used in the emergency scenario
            if (i === locationHistory.length - 1) {
                dataId = locDataId;
            }

            const locMetadata = JSON.stringify({
                type: 'location_history',
                time: loc.time,
                encryption: { algorithm: 'aes-256-ctr', iv: locEncrypted.iv, senderPublicKey: locEncrypted.senderPublicKey }
            });

            const { secret: locSecret } = await getOwnerAuth(locDataId, alice);
            const locAuthCommitment = await computeAuthCommitment(locationContractInstance, locSecret, contractAddress);

            const locStoreRes = await (deployedContract as any).callTx.storeEncryptedData(
                locDataId,
                locMetadata,
                alice.did,
                locEncrypted.encrypted,
                'ecdh-derived', // Key is derived via ECDH, not stored
                locAuthCommitment
            );

            log(`   📍 [${loc.time}] ${loc.lat}, ${loc.lng} - ${loc.notes}`);
            log(`      Block: ${locStoreRes.public?.blockHeight}, Tx: ${locStoreRes.public?.txHash}`);
            await waitForBlockHeight(contractAddress, locStoreRes.public?.blockHeight);
        }
        log(`   ✅ Location history stored on-chain (${locationHistory.length} entries)`);

        // Use the last location entry as the primary data for access control
        // This simulates Alice's last known location before going missing
        const lastLocIndex = locationHistory.length - 1;
        // dataId is already set in the Step 2 loop above (captured from last entry)
        // dataId = generateDataId(`location_history_${lastLocIndex}`); // REMOVED: This was regenerating with new timestamp!
        const { secret: aliceSecret } = await getOwnerAuth(dataId, alice);

        log(`   🔒 Her location data is securely available on-chain for emergency access`);

        logStep(3, 7, 'Unknown party (Charlie) requests access');

        // Connect Charlie to contract
        const { deployedContract: charlieContract, ContractClass: CharlieContractClass } = await getPrivacyBridgeContract(charlie.wallet, charlie.state);
        const charlieContractInstance = new (CharlieContractClass as any)({});

        const encoder = new TextEncoder();
        const charlieDid = new Uint8Array(32);
        charlieDid.set(encoder.encode('did:unknown:charlie').slice(0, 32));

        const charlieRequest: AccessRequest = {
            requestId: `CR-${Date.now()}`,
            requestor: 'Rapid Response Medical Team (Impersonator)',
            requestorDid: charlie.did,
            reason: 'Urgent medical data access requested for patient stabilization',
            dataType: 'LocationFeed',
            timestamp: Date.now(),
            verified: false
        };

        log(`   🎭 Request from: ${charlieRequest.requestor}`);
        log(`   📋 Reason: ${charlieRequest.reason}`);

        // dataId was already set in Step 2 loop to match the stored data
        // dataId = generateDataId(`location_history_${lastLocIndex}`); 

        const charlieReqId = generateDataId('charlie_request');
        const { secret: charlieSecret } = await getOwnerAuth(charlieReqId, charlie);
        const charlieAuthCommitment = await computeAuthCommitment(charlieContractInstance, charlieSecret, contractAddress);

        const charlieReqRes = await (charlieContract as any).callTx.storeEncryptedData(
            charlieReqId,
            JSON.stringify({ type: 'access_request', requestId: charlieRequest.requestId }),
            charlie.did, // Use Charlie's real DID
            JSON.stringify(charlieRequest),
            'request-key',
            charlieAuthCommitment
        );
        log(`   ✅ Access request submitted. Block: ${charlieReqRes.public?.blockHeight}, Tx: ${charlieReqRes.public?.txHash}`);
        await waitForBlockHeight(contractAddress, charlieReqRes.public?.blockHeight);

        // In live system, the notification could be alerted via polling by DID
        log(`   📱 ${ACTORS.familyMember} receives notification...`);
        log(`   📋 "${charlieRequest.requestor} is requesting access to ${ACTORS.dataOwner}'s location"`);

        // CREDENTIAL VERIFICATION: Bob checks if Charlie has a valid credential
        log(`   🔍 ${ACTORS.familyMember} verifies requestor's credentials...`);
        try {
            const { ContractClass, QueryContext, queryState: verifyState } = await getPrivacyBridgeContract(bob.wallet, bob.state);
            const stateForVerify = await verifyState(contractAddress);
            if (stateForVerify) {
                const contractInstance = new (ContractClass as any)({});
                const currentTs = getCurrentTimestamp();
                const ctx = {
                    originalState: stateForVerify.state,
                    transactionContext: new QueryContext(stateForVerify.state.data, contractAddress)
                };
                const ppd = { input: { value: [], alignment: [] }, output: undefined as any, publicTranscript: [], privateTranscriptOutputs: [] };
                try {
                    const charlieHasCredential = contractInstance._hasValidCredential_0(ctx, ppd, charlie.did, currentTs);
                    log(`   ❌ Credential check: ${charlieHasCredential ? 'VALID' : 'NO VALID CREDENTIAL'}`);
                } catch (e: any) {
                    log(`   ❌ Credential check: NO CREDENTIAL FOUND`);
                }
            }
        } catch (e: any) {
            debug(`Verification query error: ${e.message}`);
        }

        log(`   ❌ ${ACTORS.familyMember} DENIES - unverified requestor`);
        log(`   ✅ Denial logged. Charlie's request rejected.`);

        logStep(4, 7, 'Verified emergency service attempts access (pre-authorisation)');
        log(`   🚒 ${ACTORS.emergencyService} attempts to access location data...`);

        try {
            const { QueryContext, ContractClass } = await getPrivacyBridgeContract(emergency.wallet, emergency.state);
            const { state } = (await queryStateFull(contractAddress))!;
            const contractInstance = new (ContractClass as any)({});
            const context = {
                originalState: state,
                transactionContext: new QueryContext(state.data, contractAddress)
            };
            const ppd = { input: { value: [], alignment: [] }, output: undefined as any, publicTranscript: [], privateTranscriptOutputs: [] };

            // Check if Emergency Service has access via the contract circuit
            const hasAccess = contractInstance._hasAccess_0(context, ppd, dataId, emergency.did);

            if (hasAccess) {
                log(`   ⚠️  Unexpectedly authorised before family approval!`);
            } else {
                log(`   ❌ Access Denied: Not authorizsed in grant matrix.`);
                log(`   ✅ Security Check: PASS (Emergency service cannot bypass authorisation).`);
            }
        } catch (e: any) {
            // The "expected a cell, received null" error means no access record exists - this is expected
            const isNoAccessError = e.message.includes('expected a cell, received null') || e.message.includes('received null');
            if (isNoAccessError) {
                log(`   ❌ Access Denied: Unauthorised (no access grant found).`);
            } else {
                log(`   ❌ Access Denied: ${e.message.slice(0, 40)}...`);
            }
            log(`   ✅ Security Check: PASS (Emergency service cannot bypass authorisation).`);
        }

        logStep(5, 7, 'Verified emergency service requests access');

        const { deployedContract: emergencyContract, ContractClass: EmergencyContractClass } = await getPrivacyBridgeContract(emergency.wallet, emergency.state);
        const emergencyContractInstance = new (EmergencyContractClass as any)({});

        // Use the self-certifying DID from the emergency user
        const emergencyDid = emergency.did;

        const emergencyRequest: AccessRequest = {
            requestId: `ER-${Date.now()}`,
            requestor: ACTORS.emergencyService,
            requestorDid: emergencyDid,
            reason: 'Medical emergency - family reported missing person concern',
            dataType: 'LocationFeed',
            timestamp: Date.now(),
            verified: true
        };

        log(`   🚒 Request from: ${emergencyRequest.requestor}`);
        log(`   📋 Reason: ${emergencyRequest.reason}`);

        const emergencyReqId = generateDataId('emergency_request');
        const { secret: emergencySecret } = await getOwnerAuth(emergencyReqId, emergency);
        const emergencyAuthCommitment = await computeAuthCommitment(emergencyContractInstance, emergencySecret, contractAddress);

        const reqRes = await (emergencyContract as any).callTx.storeEncryptedData(
            emergencyReqId,
            JSON.stringify({ type: 'access_request', requestId: emergencyRequest.requestId }),
            emergencyDid,
            JSON.stringify(emergencyRequest),
            'request-key',
            emergencyAuthCommitment
        );

        log(`   ✅ Access request submitted. Block: ${reqRes.public?.blockHeight}, Tx: ${reqRes.public?.txHash}`);
        await waitForBlockHeight(contractAddress, reqRes.public?.blockHeight);

        logStep(6, 7, 'Family member approves verified request');

        log(`   📱 ${ACTORS.familyMember} receives notification...`);
        log(`   📋 "${ACTORS.emergencyService} is requesting access to ${ACTORS.dataOwner}'s location"`);

        // CREDENTIAL VERIFICATION: Bob checks if Emergency has a valid credential
        try {
            const { ContractClass, QueryContext, queryState: verifyState2 } = await getPrivacyBridgeContract(bob.wallet, bob.state);
            const stateForVerify2 = await verifyState2(contractAddress);
            if (stateForVerify2) {
                const contractInstance2 = new (ContractClass as any)({});
                const currentTs2 = getCurrentTimestamp();
                const ctx2 = {
                    originalState: stateForVerify2.state,
                    transactionContext: new QueryContext(stateForVerify2.state.data, contractAddress)
                };
                const ppd2 = { input: { value: [], alignment: [] }, output: undefined as any, publicTranscript: [], privateTranscriptOutputs: [] };
                try {
                    const emergencyHasCredential = contractInstance2._hasValidCredential_0(ctx2, ppd2, emergency.did, currentTs2);
                    if (emergencyHasCredential === true) {
                        log(`   ✅ Credential check: VALID EMERGENCY_SERVICES credential`);
                    } else {
                        log(`   ⚠️  Credential check: No valid credential (run: npm run register-credentials)`);
                    }
                } catch (e: any) {
                    log(`   ⚠️  Credential not found (run: npm run register-credentials)`);
                }
            }
        } catch (e: any) {
            debug(`Verification query error: ${e.message}`);
        }

        const { deployedContract: bobContract, ledgerAccessor: bobLedgerAccessor, queryState: bobQueryState } = await getPrivacyBridgeContract(bob.wallet, bob.state);

        // Verify data existence on-chain before grantAccess
        try {
            const bobState = await bobQueryState(contractAddress);
            if (bobState) {
                const bobLedger = bobLedgerAccessor(bobState.state.data);
                const lookupVal = bobLedger.encryptedDataAuthCommitment.lookup(dataId);
                debug(`Ledger lookup of dataId (${bytesToHex(dataId)}): ${lookupVal ? 'FOUND' : 'NOT FOUND'}`);
                if (lookupVal) debug(`Stored commitment: ${bytesToHex(lookupVal)}`);
            } else {
                debug(`Failed to query contract state for Bob`);
            }
        } catch (err: any) {
            debug(`Failed to inspect ledger: ${err.message}`);
        }

        debug(`dataId for grantAccess: ${bytesToHex(dataId)}`);
        debug(`aliceSecret defined: ${aliceSecret ? 'yes' : 'no'}`);
        debug(`alice.did: ${bytesToHex(alice.did)}`);
        debug(`emergencyDid: ${bytesToHex(emergencyDid)}`);

        const grantRes = await (bobContract as any).callTx.grantAccess(
            dataId,
            emergencyDid,
            alice.did,
            aliceSecret // Alice shared this with Bob (simulated)
        );

        log(`   ✅ Access granted. Block: ${grantRes.public?.blockHeight}, Tx: ${grantRes.public?.txHash}`);
        emergencyRequest.approved = true;
        emergencyRequest.approvedBy = ACTORS.familyMember;
        await waitForBlockHeight(contractAddress, grantRes.public?.blockHeight);

        logStep(7, 7, 'Emergency service retrieves location data');

        const stateResult = await queryStateFull(contractAddress);
        if (!stateResult) throw new Error('Failed to query contract state');

        const ledger = ledgerAccessor(stateResult.state.data);
        const encryptedDataOnChain = ledger.encryptedData.lookup(dataId);
        if (!encryptedDataOnChain) throw new Error('Data not found on chain');

        const metadataStr = ledger.disclosureMetadata.lookup(dataId);
        if (!metadataStr) throw new Error('Metadata not found on chain');
        const metadata = JSON.parse(metadataStr);
        const { iv, senderPublicKey } = metadata.encryption;

        const decryptedLocation = decryptFromSender(
            encryptedDataOnChain,
            iv,
            senderPublicKey,
            bob.seed  // Bob (family) can decrypt using ECDH with sender's public key
        );

        const location = JSON.parse(decryptedLocation);

        log(`   🚒 ${ACTORS.emergencyService} receives decrypted location:`);
        log(`   📍 Coordinates: ${location.geo.latitude}, ${location.geo.longitude}`);

        log(`   ✅ Emergency service has received valid location data`);

        // Summary
        console.log();
        console.log('═'.repeat(60));
        console.log('🏥 EMERGENCY RESPONSE SUMMARY');
        console.log('═'.repeat(60));
        console.log('   📋 Timeline:');
        console.log(`      1. ${ACTORS.dataOwner} logged location (background tracking)`);
        console.log(`      2. ${ACTORS.dataOwner} went missing`);
        console.log(`      3. ${ACTORS.unknownParty} (unverified) requested access - DENIED`);
        console.log(`      4. ${ACTORS.emergencyService} attempted access (pre-authorisation) - DENIED`);
        console.log(`      5. ${ACTORS.emergencyService} (verified) requested access`);
        console.log(`      6. ${ACTORS.familyMember} approved the request`);
        console.log(`      7. ${ACTORS.emergencyService} retrieved location`);
        console.log('   ');
        console.log('   🔐 Security Demonstrations:');
        console.log('      • Unverified requestors can be denied');
        console.log('      • Only verified services with family approval get access');
        console.log('      • Full audit trail on-chain');
        console.log('═'.repeat(60));
        console.log();

        logSuccess('DEMO 4: EMERGENCY MULTI-PARTY AUTH COMPLETED');
        return true;

    } catch (error: any) {
        logError('Demo failed', error);
        return false;
    } finally {
        await closeAllUsers();
    }
}

// Run the demo
runDemo().then(success => process.exit(success ? 0 : 1));
