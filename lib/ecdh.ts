/**
 * ECDH Key Exchange - Wallet-derived shared secrets
 * 
 * Uses X25519 (Curve25519 ECDH) for key agreement, compatible with
 * Midnight's encryptionPublicKey format.
 * 
 * This module enables real cryptographic key exchange between wallet holders
 * without requiring out-of-band secret sharing.
 */

import { x25519 } from '@noble/curves/ed25519.js';
import { sha256 } from '@noble/hashes/sha2.js';
import { bytesToHex, hexToBytes } from './crypto.js';

/**
 * Derive a shared secret from your private key and their public key
 * 
 * Uses X25519 ECDH followed by SHA-256 for key derivation.
 * The resulting secret is identical regardless of which party initiates.
 */
export function deriveSharedSecretECDH(
    myPrivateKey: Uint8Array,
    theirPublicKey: Uint8Array
): Uint8Array {
    // X25519 ECDH - produces 32-byte shared secret
    const rawSecret = x25519.getSharedSecret(myPrivateKey, theirPublicKey);
    // Hash for uniform output and domain separation
    return sha256(rawSecret);
}

/**
 * Generate ephemeral keypair for one-time use
 * 
 * Use this for session keys where forward secrecy is desired.
 */
export function generateEphemeralKeypair(): {
    privateKey: Uint8Array;
    publicKey: Uint8Array
} {
    const privateKey = x25519.utils.randomSecretKey();
    const publicKey = x25519.getPublicKey(privateKey);
    return { privateKey, publicKey };
}

/**
 * Derive deterministic encryption keypair from wallet seed
 * 
 * This produces a stable keypair for a given wallet, enabling
 * consistent key exchange without storing separate keys.
 */
export function deriveEncryptionKeypair(walletSeed: string): {
    privateKey: Uint8Array;
    publicKey: Uint8Array;
    publicKeyHex: string;
} {
    // Use first 32 bytes of seed (64 hex chars)
    const seedBytes = hexToBytes(walletSeed.slice(0, 64));
    // Derive private key via SHA-256 for domain separation
    const privateKey = sha256(seedBytes);
    // Compute corresponding public key
    const publicKey = x25519.getPublicKey(privateKey);

    return {
        privateKey,
        publicKey,
        publicKeyHex: bytesToHex(publicKey)
    };
}

/**
 * Derive shared secret from two wallet seeds (convenience wrapper)
 * 
 * Returns hex-encoded shared secret suitable for use as AES key.
 */
export function deriveSharedSecretFromSeeds(
    mySeed: string,
    theirPublicKeyHex: string
): string {
    const myKeypair = deriveEncryptionKeypair(mySeed);
    const theirPubKey = hexToBytes(theirPublicKeyHex);
    const shared = deriveSharedSecretECDH(myKeypair.privateKey, theirPubKey);
    return bytesToHex(shared);
}

/**
 * Verify that two parties derive the same shared secret
 * 
 * This is useful for debugging - both parties should get identical output.
 */
export function verifyECDHExchange(
    aliceSeed: string,
    bobSeed: string
): { aliceSecret: string; bobSecret: string; match: boolean } {
    const aliceKeypair = deriveEncryptionKeypair(aliceSeed);
    const bobKeypair = deriveEncryptionKeypair(bobSeed);

    // Alice computes shared secret with Bob's public key
    const aliceSecret = bytesToHex(
        deriveSharedSecretECDH(aliceKeypair.privateKey, bobKeypair.publicKey)
    );

    // Bob computes shared secret with Alice's public key
    const bobSecret = bytesToHex(
        deriveSharedSecretECDH(bobKeypair.privateKey, aliceKeypair.publicKey)
    );

    return {
        aliceSecret,
        bobSecret,
        match: aliceSecret === bobSecret
    };
}
