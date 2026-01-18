#!/usr/bin/env npx tsx
/**
 * Register Credentials Script
 * 
 * Post-deployment script to set up the credential registry:
 * 1. Register Admin as a trusted issuer
 * 2. Issue EMERGENCY_SERVICES credential to Emergency org
 * 
 * This simulates the off-chain credential issuance process where:
 * - Government (Admin) has already verified Emergency Services
 * - Admin records the credential on-chain for public verification
 * 
 * Run: npm run register-credentials
 */

import {
    initEnvironment,
    getPrivacyBridgeContract,
    logHeader,
    logStep,
    logSuccess,
    logError,
    log,
    debug
} from '../lib/harness.js';
import {
    getUser,
    closeAllUsers
} from '../lib/users.js';
import {
    CREDENTIAL_ROLES,
    getDefaultExpiry,
    getCurrentTimestamp
} from '../lib/credentials.js';

export async function registerCredentials() {
    logHeader('Register Credentials - Post-Deployment Setup');

    let admin: any;
    let emergency: any;

    try {
        logStep(1, 4, 'Initialize Admin and Emergency wallets');

        await initEnvironment();
        admin = await getUser('admin');
        emergency = await getUser('emergency');

        // Check wallet balances
        const MIN_BALANCE = 5_000_000n;
        if (admin.balance < MIN_BALANCE) {
            logError(`Admin wallet has insufficient funds. Run: npm run fund admin`);
            return false;
        }

        // Connect to contract with admin wallet
        const { deployedContract, contractAddress, waitForBlockHeight } =
            await getPrivacyBridgeContract(admin.wallet, admin.state);

        log(`   ✅ Connected to contract at ${contractAddress}`);
        log(`   👤 Admin DID:     ${admin.didString}`);
        log(`   🚒 Emergency DID: ${emergency.didString}`);

        logStep(2, 4, 'Register Admin as trusted issuer.....');

        try {
            const adminResult = await (deployedContract as any).callTx.setContractAdmin(admin.did);
            await waitForBlockHeight(contractAddress, adminResult.public?.blockHeight);
            log(`   ✅ Admin registered as trusted issuer. Block: ${adminResult.public?.blockHeight}, Tx: ${adminResult.public?.txHash}`);
        } catch (e: any) {
            // May already be registered
            if (e.message?.includes('already')) {
                log(`   ⚠️  Admin already registered as issuer (skipping)`);
            } else {
                log(`   ⚠️  Admin registration: ${e.message.slice(0, 50)}...`);
            }
        }

        logStep(3, 4, 'Issue EMERGENCY_SERVICES credential to Emergency org.....');

        const expiry = getDefaultExpiry(); // 1 year from now

        try {
            const credResult = await (deployedContract as any).callTx.recordCredential(
                emergency.did,
                admin.did,
                CREDENTIAL_ROLES.EMERGENCY_SERVICES,
                expiry
            );
            await waitForBlockHeight(contractAddress, credResult.public?.blockHeight);
            log(`   ✅ Credential issued to Emergency Services. Block: ${credResult.public?.blockHeight}, Tx: ${credResult.public?.txHash}`);
            log(`   📋 Role: ${CREDENTIAL_ROLES.EMERGENCY_SERVICES}`);
            log(`   ⏰ Expiry: ${new Date(Number(expiry)).toISOString()}`);
        } catch (e: any) {
            logError(`Failed to issue credential: ${e.message}`);
            return false;
        }

        logStep(4, 4, 'Verify credential was recorded');

        // Query the contract state to verify
        const { queryState: queryStateFull, ContractClass, QueryContext } =
            await getPrivacyBridgeContract(admin.wallet, admin.state);

        const stateResult = await queryStateFull(contractAddress);
        if (stateResult) {
            const contractInstance = new (ContractClass as any)({});
            const currentTs = getCurrentTimestamp();

            try {
                const context = {
                    originalState: stateResult.state,
                    transactionContext: new QueryContext(stateResult.state.data, contractAddress)
                };
                const partialProofData = {
                    input: { value: [], alignment: [] },
                    output: undefined as any,
                    publicTranscript: [],
                    privateTranscriptOutputs: []
                };

                const isValid = contractInstance._hasValidCredential_0(
                    context,
                    partialProofData,
                    emergency.did,
                    currentTs
                );

                if (isValid === true) {
                    log(`   ✅ Credential verification: PASS`);
                } else {
                    log(`   ⚠️  Credential verification returned: ${isValid}`);
                }
            } catch (e: any) {
                log(`   ⚠️  Verification query: ${e.message.slice(0, 50)}...`);
            }
        }

        // Summary
        console.log();
        console.log('═'.repeat(60));
        console.log('CREDENTIAL REGISTRY SETUP COMPLETE');
        console.log('═'.repeat(60));
        console.log('   Trusted Issuers:');
        console.log(`      ✅ Admin (${admin.didString.slice(0, 30)}...)`);
        console.log('   ');
        console.log('   Issued Credentials:');
        console.log(`      🚒 Emergency Services: ${CREDENTIAL_ROLES.EMERGENCY_SERVICES}`);
        console.log('═'.repeat(60));
        console.log();

        logSuccess('CREDENTIAL REGISTRATION COMPLETED');
        return true;

    } catch (error: any) {
        logError('Registration failed', error);
        return false;
    } finally {
        await closeAllUsers();
    }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1].endsWith('register-credentials.ts')) {
    registerCredentials().then(success => process.exit(success ? 0 : 1));
}
