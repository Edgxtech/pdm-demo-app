#!/usr/bin/env npx tsx
/**
 * Demo 2: P2P Direct Share
 * 
 * Full end-to-end test demonstrating:
 * 1. Alice creates P2P session with encrypted offer
 * 2. Session stored on Midnight blockchain
 * 3. Bob reads session, decrypts offer, creates answer
 * 4. Bob stores encrypted answer on-chain
 * 5. Alice completes handshake
 * 6. Simulated P2P data transfer
 * 7. Session closed
 * 
 * Uses WebRTC with blockchain-based signalling for P2P direct sharing.
 * 
 * Run: npm run demo:p2p
 */

import {
    initEnvironment,
    getPrivacyBridgeContract,
    queryState,
    logHeader,
    logStep,
    logSuccess,
    logError,
    log,
    debug,
    formatDid,
    formatHash
} from '../lib/harness.js';
import { bytesToHex } from '../lib/crypto.js';
import { deriveSharedSecretECDH } from '../lib/ecdh.js';
import {
    createP2PSession,
    acceptP2PSession,
    completeP2PSession,
    performRealDataTransfer,
    DEFAULT_STUN_SERVERS
} from '../lib/p2p.js';
import { getUser, closeAllUsers } from '../lib/users.js';

async function runDemo() {
    logHeader('Demo 2: P2P Direct Data Share');

    let alice: any;
    let bob: any;

    try {
        logStep(1, 6, 'Initialize actors and connect to contract');

        await initEnvironment();
        // Users logged in getUser with alignment
        alice = await getUser('alice');
        bob = await getUser('bob');

        // Check required wallet balance (only Alice needs funds for this demo)
        const MIN_BALANCE = 5_000_000n; // 5 Midnight
        if (alice.balance < MIN_BALANCE) {
            logError(`Alice wallet has insufficient funds (${alice.balance} DUST). Run: npm run fund alice`);
            return false;
        }

        const { deployedContract, contractAddress, waitForBlockHeight } = await getPrivacyBridgeContract(alice.wallet, alice.state);
        log(`   ✅ Connected to contract at ${contractAddress}`);

        log(`   👤 Alice (sender): wants to share data directly with Bob`);
        log(`   👤 Bob (recipient): will receive data via P2P channel`);

        // Derive shared secret via ECDH from wallet keypairs (no out-of-band secret needed)
        const sharedSecretBytes = deriveSharedSecretECDH(
            alice.encryptionKeypair.privateKey,
            bob.encryptionKeypair.publicKey
        );
        const sharedSecret = bytesToHex(sharedSecretBytes);
        debug(`   🔐 ECDH shared secret derived from wallet keys`);

        logStep(2, 6, 'Alice creates P2P session and stores offer on-chain');

        const session = await createP2PSession(
            alice.did,
            bob.did,
            sharedSecret
        );

        debug(`   🔑 Session ID: ${formatHash(bytesToHex(session.sessionId))}`);
        log(`   👤 Alice DID: ${formatDid(alice.did)}`);
        log(`   👤 Bob DID: ${formatDid(bob.did)}`);
        debug(`   🌍 STUN Servers for NAT Traversal: ${DEFAULT_STUN_SERVERS.join(', ')}`);
        debug(`   📡 ICE Candidates gathered (Local/SRFLX)`);
        debug(`   📄 Created WebRTC offer`);
        debug(`   🔐 Encrypted offer for Bob`);

        // Store on chain
        const storeRes = await (deployedContract as any).callTx.createP2PSession(
            session.sessionId,
            alice.did,
            bob.did,
            session.encryptedOffer
        );

        log(`   ✅ P2P session stored. Block: ${storeRes.public?.blockHeight}, Tx: ${storeRes.public?.txHash}`);
        await waitForBlockHeight(contractAddress, storeRes.public?.blockHeight);

        logStep(3, 6, 'Bob discovers session and reads encrypted offer');

        // Bob reads from chain
        const contractState = await queryState(contractAddress);
        if (!contractState) throw new Error('Failed to query state');

        const PrivacyBridge = await import('../contracts/privacy-bridge/contract/index.cjs');
        const ledger = PrivacyBridge.ledger(contractState.data);

        // Check if session exists
        const sessionExists = ledger.p2pSessions.member(session.sessionId);
        debug(`   📊 Session exists on-chain: ${sessionExists}`);

        if (!sessionExists) {
            throw new Error('Session not found on chain');
        }

        // Read the encrypted offer
        const encryptedOffer = ledger.p2pSessions.lookup(session.sessionId);
        log(`   📥 Retrieved encrypted offer from chain`);

        log('   ✅ Bob retrieved session offer from blockchain');

        logStep(4, 6, 'Bob processes offer and stores answer');

        // Bob accepts the session
        const bobSession = await acceptP2PSession(
            session.sessionId,
            bob.did,
            alice.did,
            encryptedOffer.toString(),
            sharedSecret
        );

        debug(`   🔓 Decrypted offer from Alice`);
        debug(`   📄 Created WebRTC answer`);
        debug(`   🔐 Encrypted answer for Alice`);

        log('   ✅ Bob created P2P answer');

        // Bob stores answer
        const answerRes = await (deployedContract as any).callTx.answerP2PSession(
            session.sessionId,
            bob.did,
            bobSession.encryptedAnswer
        );

        log(`   ✅ Answer stored. Block: ${answerRes.public?.blockHeight}, Tx: ${answerRes.public?.txHash}`);
        await waitForBlockHeight(contractAddress, answerRes.public?.blockHeight);

        logStep(5, 6, 'Alice completes handshake and transfers data');

        debug('   ⏳ Reading state for answer...');

        // Alice reads the answer
        const updatedState = await queryState(contractAddress);
        if (!updatedState) throw new Error('Failed to query updated state');

        const updatedLedger = PrivacyBridge.ledger(updatedState.data);
        let answerExists = updatedLedger.p2pAnswers.member(session.sessionId);
        let encryptedAnswer: any = null;

        // Add retry loop for indexer lag
        const maxRetries = 3;
        for (let retry = 0; retry <= maxRetries; retry++) {
            if (retry > 0) {
                log(`   ⚠️ Answer not found in current state (retry ${retry}/${maxRetries}). Waiting...`);
                await new Promise(resolve => setTimeout(resolve, 10000));
                const retryState = await queryState(contractAddress);
                if (!retryState) throw new Error('Failed to query state on retry');
                const retryLedger = PrivacyBridge.ledger(retryState.data);
                answerExists = retryLedger.p2pAnswers.member(session.sessionId);
                if (answerExists) {
                    encryptedAnswer = retryLedger.p2pAnswers.lookup(session.sessionId);
                }
            } else {
                // First attempt
                if (answerExists) {
                    encryptedAnswer = updatedLedger.p2pAnswers.lookup(session.sessionId);
                }
            }
            if (answerExists && encryptedAnswer) break;
        }

        if (!answerExists || !encryptedAnswer) {
            throw new Error('Answer still not found after multiple retries. Blockchain state might be delayed.');
        }

        // Alice completes the session
        await completeP2PSession(
            session,
            encryptedAnswer.toString(),
            sharedSecret
        );

        log(`   🔓 Alice decrypted answer from Bob`);
        log(`   🤝 WebRTC handshake complete!`);

        // Real data transfer (Schema.org/Message)
        const secretData = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Message',
            'text': 'This is a secret message sent directly to Bob',
            'sender': {
                '@type': 'Person',
                'name': 'Alice',
                'identifier': formatDid(alice.did)
            },
            'dateSent': new Date().toISOString()
        });

        log(`   📤 Alice sends: "${secretData.slice(0, 50)}..."`);

        const offerData = JSON.parse(session.offer!);
        const answerData = JSON.parse(bobSession.answer!);

        const transfer = await performRealDataTransfer(
            secretData,
            '127.0.0.1', // Real P2P would use answerData.publicIP but for local demo we use localhost
            answerData.port,
            offerData.port,
            (packet: any) => {
                debug(`      [UDP] Sent packet size=${packet.size}b payload=${packet.payload}`);
            }
        );

        log(`   📥 Bob receives: "${transfer.slice(0, 50)}..."`);

        if (transfer === secretData) {
            log('   ✅ Direct P2P data transfer successful!');
        } else {
            throw new Error('Data transfer verification failed');
        }

        logStep(6, 6, 'Close P2P session');

        const closeRes = await (deployedContract as any).callTx.closeP2PSession(
            session.sessionId,
            alice.did
        );

        log(`   ✅ Session closed. Block: ${closeRes.public?.blockHeight}, Tx: ${closeRes.public?.txHash}`);
        await waitForBlockHeight(contractAddress, closeRes.public?.blockHeight);

        // Summary
        console.log();
        console.log('═'.repeat(60));
        console.log('🎉 P2P DIRECT DATA SHARE SUMMARY');
        console.log('═'.repeat(60));
        console.log('   ✅ Alice created P2P session');
        console.log('   ✅ Encrypted offer stored on Midnight blockchain');
        console.log('   ✅ Bob discovered and read session');
        console.log('   ✅ Bob created and stored encrypted answer');
        console.log('   ✅ WebRTC handshake completed');
        console.log('   ✅ Direct P2P data transfer successful');
        console.log('   ✅ Session closed on-chain');
        console.log();
        console.log('🔐 Privacy Guarantees:');
        console.log('   • ECDH-derived shared secret (no pre-sharing)');
        console.log('   • End-to-end encrypted signalling');
        console.log('   • No centralised relay server');
        console.log('   • Blockchain provides audit trail');
        console.log('   • Direct DTLS-encrypted data channel');
        console.log('═'.repeat(60));
        console.log();

        logSuccess('DEMO 2: P2P DIRECT DATA SHARE COMPLETED');
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
