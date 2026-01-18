#!/usr/bin/env npx tsx
/**
 * Crypto Utilities - Encryption/decryption helpers for PDM demos
 * 
 * Self-contained module providing all cryptographic operations.
 */

import CryptoJS from 'crypto-js';
import { deriveSharedSecretFromSeeds, deriveEncryptionKeypair, deriveSharedSecretECDH } from './ecdh.js';

/**
 * Generate a 32-byte data ID from a prefix
 */
export function generateDataId(prefix: string = 'data'): Uint8Array {
    const idStr = `${prefix}_${Date.now().toString(36)}`;
    const dataId = new Uint8Array(32);
    const encoder = new TextEncoder();
    dataId.set(encoder.encode(idStr).slice(0, 32));
    return dataId;
}

/**
 * Generate DID bytes from a human-readable name
 */
export function generateDid(name: string): Uint8Array {
    const did = new Uint8Array(32);
    const encoder = new TextEncoder();
    const didStr = `did:guardian:${name}`;
    did.set(encoder.encode(didStr).slice(0, 32));
    return did;
}

/**
 * Convert bytes to hex string  
 */
export function bytesToHex(bytes: Uint8Array): string {
    return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Convert hex string to bytes
 */
export function hexToBytes(hex: string): Uint8Array {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
        bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
    }
    return bytes;
}

/**
 * Encrypt data with AES-256-CTR
 */
export function encryptData(content: string, password: string): {
    encrypted: string;
    iv: string;
} {
    const iv = CryptoJS.lib.WordArray.random(12);
    const key = CryptoJS.PBKDF2(password, 'privacy-vault-salt', {
        keySize: 256 / 32,
        iterations: 1000
    });

    const encrypted = CryptoJS.AES.encrypt(content, key, {
        iv: iv,
        mode: CryptoJS.mode.CTR,
        padding: CryptoJS.pad.NoPadding
    });

    return {
        encrypted: encrypted.toString(),
        iv: iv.toString(CryptoJS.enc.Hex)
    };
}

/**
 * Parse hex-encoded data from Midnight ledger
 */
export function parseMidnightStateValue(payloadHex: string): string {
    let asciiString = payloadHex;
    if (/^[0-9a-fA-F]+$/.test(payloadHex) && payloadHex.length % 2 === 0) {
        try {
            asciiString = Buffer.from(payloadHex, 'hex').toString('utf8');
        } catch (e) {
            // Not valid UTF-8 hex, keep original
        }
    }

    if (asciiString.includes(',') && /^[\d,\s]+$/.test(asciiString.slice(0, 100))) {
        try {
            const byteValues = asciiString.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n) && n >= 0 && n <= 255);
            if (byteValues.length > 0) {
                return Buffer.from(new Uint8Array(byteValues)).toString('utf8');
            }
        } catch (e) {
            // Parse failed
        }
    }

    return asciiString;
}

/**
 * Decrypt data with AES-256-CTR
 */
export function decryptData(encrypted: string, password: string, ivHex: string): string {
    const retrievedEncrypted = parseMidnightStateValue(encrypted);

    const iv = CryptoJS.enc.Hex.parse(ivHex);
    const key = CryptoJS.PBKDF2(password, 'privacy-vault-salt', {
        keySize: 256 / 32,
        iterations: 1000
    });

    const decrypted = CryptoJS.AES.decrypt(retrievedEncrypted, key, {
        iv: iv,
        mode: CryptoJS.mode.CTR,
        padding: CryptoJS.pad.NoPadding
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
}

/**
 * Hash content for commitment-based disclosures
 */
export function hashContent(content: string): string {
    return CryptoJS.SHA256(content).toString(CryptoJS.enc.Hex);
}

/**
 * Generate a random encryption key
 */
export function generateEncryptionKey(): string {
    return CryptoJS.lib.WordArray.random(32).toString(CryptoJS.enc.Hex);
}

// ═══════════════════════════════════════════════════════════════════════════
// WALLET-BASED ENCRYPTION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Derive a shared secret from sender's wallet seed and recipient's public key
 * 
 * Uses real X25519 ECDH key exchange.
 */
export function deriveSharedSecret(mySeed: string, theirPublicKeyHex: string): string {
    return deriveSharedSecretFromSeeds(mySeed, theirPublicKeyHex);
}

/**
 * Derive shared secret from keypairs directly (for demos using encryptionKeypair)
 */
export function deriveSharedSecretFromKeypairs(
    myPrivateKey: Uint8Array,
    theirPublicKey: Uint8Array
): string {
    return bytesToHex(deriveSharedSecretECDH(myPrivateKey, theirPublicKey));
}

/**
 * Encrypt data for a specific recipient using ECDH-derived shared secret
 * 
 * @param content - Data to encrypt
 * @param senderSeed - Sender's wallet seed (for ECDH private key derivation)
 * @param recipientPublicKeyHex - Recipient's public key (hex string)
 */
export function encryptForRecipient(
    content: string,
    senderSeed: string,
    recipientPublicKeyHex: string
): {
    encrypted: string;
    iv: string;
    senderPublicKey: string;
} {
    const senderKeypair = deriveEncryptionKeypair(senderSeed);

    const sharedSecret = deriveSharedSecret(senderSeed, recipientPublicKeyHex);
    const key = CryptoJS.enc.Hex.parse(sharedSecret.slice(0, 64));
    const iv = CryptoJS.lib.WordArray.random(12);

    const encrypted = CryptoJS.AES.encrypt(content, key, {
        iv: iv,
        mode: CryptoJS.mode.CTR,
        padding: CryptoJS.pad.NoPadding
    });

    return {
        encrypted: encrypted.toString(),
        iv: iv.toString(CryptoJS.enc.Hex),
        senderPublicKey: senderKeypair.publicKeyHex
    };
}

/**
 * Decrypt data received from a sender using ECDH-derived shared secret
 * 
 * @param encrypted - Encrypted data
 * @param ivHex - Initialization vector (hex)
 * @param senderPublicKeyHex - Sender's public key (hex string)
 * @param recipientSeed - Recipient's wallet seed (for ECDH private key derivation)
 */
export function decryptFromSender(
    encrypted: string,
    ivHex: string,
    senderPublicKeyHex: string,
    recipientSeed: string
): string {
    const sharedSecret = deriveSharedSecret(recipientSeed, senderPublicKeyHex);
    const key = CryptoJS.enc.Hex.parse(sharedSecret.slice(0, 64));
    const iv = CryptoJS.enc.Hex.parse(ivHex);

    const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
        iv: iv,
        mode: CryptoJS.mode.CTR,
        padding: CryptoJS.pad.NoPadding
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
}

/**
 * Create an encryption envelope for on-chain storage
 * 
 * @param content - Data to encrypt
 * @param senderSeed - Sender's wallet seed (for ECDH key derivation)
 * @param recipientPublicKeyHex - Recipient's public key (hex string from encryptionKeypair.publicKeyHex)
 */
export function createEncryptionEnvelope(
    content: string,
    senderSeed: string,
    recipientPublicKeyHex: string
): {
    encryptedPayload: string;
    metadata: string;
} {
    const { encrypted, iv, senderPublicKey } = encryptForRecipient(
        content,
        senderSeed,
        recipientPublicKeyHex
    );

    const metadata = JSON.stringify({
        encryption: 'aes-256-ctr',
        iv,
        senderPublicKey,
        recipientPublicKey: recipientPublicKeyHex,
        timestamp: Date.now()
    });

    return {
        encryptedPayload: encrypted,
        metadata
    };
}

/**
 * Decrypt an encryption envelope received from on-chain
 * 
 * @param encryptedPayload - Encrypted data from chain
 * @param metadata - Metadata JSON containing iv and senderPublicKey
 * @param recipientSeed - Recipient's wallet seed (for ECDH key derivation)
 */
export function decryptEnvelope(
    encryptedPayload: string,
    metadata: string,
    recipientSeed: string
): string {
    const meta = JSON.parse(metadata);

    const retrievedEncrypted = parseMidnightStateValue(encryptedPayload);

    return decryptFromSender(
        retrievedEncrypted,
        meta.iv,
        meta.senderPublicKey,
        recipientSeed
    );
}
