/**
 * Credential Helper Library
 * 
 * Functions for managing verifiable credentials on-chain:
 * - Self-certifying DID generation from wallet public keys
 * - Recording credentials issued off-chain
 * - Verifying credentials on-chain
 */

import { createHash } from 'crypto';
import { bytesToHex } from './crypto.js';

// DID types for actors
export type DidType = 'user' | 'org' | 'gov';

// Credential roles
export const CREDENTIAL_ROLES = {
    EMERGENCY_SERVICES: 'EMERGENCY_SERVICES',
    HEALTHCARE_PROVIDER: 'HEALTHCARE_PROVIDER',
    FAMILY_MEMBER: 'FAMILY_MEMBER',
    LAW_ENFORCEMENT: 'LAW_ENFORCEMENT',
    GOVERNMENT: 'GOVERNMENT'
} as const;

export type CredentialRole = keyof typeof CREDENTIAL_ROLES;

/**
 * Create a self-certifying DID from wallet public key
 * The DID is derived from the wallet's encryption public key hash
 * Format: did:pdm:<type>:<first16HexCharsOfSha256(pubKey)>
 */
export function createDid(walletPubKey: string | Uint8Array, type: DidType = 'user'): string {
    const pubKeyStr = typeof walletPubKey === 'string'
        ? walletPubKey
        : bytesToHex(walletPubKey);

    const hash = createHash('sha256').update(pubKeyStr).digest('hex');
    return `did:pdm:${type}:${hash.slice(0, 16)}`;
}

/**
 * Convert a DID string to Bytes<32> for contract calls
 * Pads or truncates to exactly 32 bytes
 */
export function didToBytes32(did: string): Uint8Array {
    const encoder = new TextEncoder();
    const bytes = new Uint8Array(32);
    bytes.set(encoder.encode(did).slice(0, 32));
    return bytes;
}

/**
 * Convert Bytes<32> back to DID string
 */
export function bytes32ToDid(bytes: Uint8Array): string {
    const decoder = new TextDecoder('utf-8');
    // Find null terminator and decode only up to it
    let end = bytes.indexOf(0);
    if (end === -1) end = bytes.length;
    return decoder.decode(bytes.slice(0, end));
}

/**
 * Set up contract admin (registers as first trusted issuer)
 * Should be called immediately after contract deployment
 */
export async function setContractAdmin(
    contract: any,
    adminDid: Uint8Array,
    waitForBlock: (address: string, height: any) => Promise<void>,
    contractAddress: string
): Promise<{ txHash: string; blockHeight: number }> {
    const result = await contract.callTx.setContractAdmin(adminDid);
    await waitForBlock(contractAddress, result.public?.blockHeight);
    return {
        txHash: result.public?.txHash || '',
        blockHeight: result.public?.blockHeight || 0
    };
}

/**
 * Register a trusted issuer (only existing trusted issuers can register new ones)
 */
export async function registerTrustedIssuer(
    contract: any,
    issuerDid: Uint8Array,
    callerDid: Uint8Array,
    waitForBlock: (address: string, height: any) => Promise<void>,
    contractAddress: string
): Promise<{ txHash: string; blockHeight: number }> {
    const result = await contract.callTx.registerTrustedIssuer(issuerDid, callerDid);
    await waitForBlock(contractAddress, result.public?.blockHeight);
    return {
        txHash: result.public?.txHash || '',
        blockHeight: result.public?.blockHeight || 0
    };
}

/**
 * Record a credential on-chain (after off-chain issuance)
 * Only trusted issuers can record credentials
 */
export async function recordCredential(
    contract: any,
    subjectDid: Uint8Array,
    issuerDid: Uint8Array,
    role: string,
    expiryTimestamp: bigint,
    waitForBlock: (address: string, height: any) => Promise<void>,
    contractAddress: string
): Promise<{ txHash: string; blockHeight: number }> {
    const result = await contract.callTx.recordCredential(
        subjectDid,
        issuerDid,
        role,
        expiryTimestamp
    );
    await waitForBlock(contractAddress, result.public?.blockHeight);
    return {
        txHash: result.public?.txHash || '',
        blockHeight: result.public?.blockHeight || 0
    };
}

/**
 * Check if a DID has a valid, unexpired credential using local circuit execution
 */
export function hasValidCredential(
    contractInstance: any,
    queryState: any,
    subjectDid: Uint8Array,
    currentTimestamp: bigint,
    QueryContext: any,
    contractAddress: string
): boolean {
    try {
        const { state } = queryState;
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

        const result = contractInstance._hasValidCredential_0(
            context,
            partialProofData,
            subjectDid,
            currentTimestamp
        );

        return result === true;
    } catch (e: any) {
        // If lookup fails (no credential), return false
        if (e.message?.includes('received null')) {
            return false;
        }
        throw e;
    }
}

/**
 * Get the credential role for a DID using local circuit execution
 */
export function getCredentialRole(
    contractInstance: any,
    queryState: any,
    subjectDid: Uint8Array,
    QueryContext: any,
    contractAddress: string
): string | null {
    try {
        const { state } = queryState;
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

        return contractInstance._getCredentialRole_0(
            context,
            partialProofData,
            subjectDid
        );
    } catch (e: any) {
        if (e.message?.includes('received null')) {
            return null;
        }
        throw e;
    }
}

/**
 * Generate a 1-year expiry timestamp from now
 */
export function getDefaultExpiry(): bigint {
    const oneYearMs = 365 * 24 * 60 * 60 * 1000;
    return BigInt(Date.now() + oneYearMs);
}

/**
 * Get current timestamp as bigint (for contract calls)
 */
export function getCurrentTimestamp(): bigint {
    return BigInt(Date.now());
}
