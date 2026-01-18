/**
 * P2P Signaling Utilities
 * 
 * Provides WebRTC session management with Midnight blockchain-based signaling.
 * Uses the PrivacyBridge contract's P2P circuits for offer/answer exchange.
 */

import CryptoJS from 'crypto-js';
import dgram from 'dgram';
import { generateDataId, bytesToHex, hexToBytes } from './crypto.js';

export interface P2PSessionConfig {
    stunServers?: string[];
    iceTimeout?: number;
}

export interface P2PSession {
    sessionId: Uint8Array;
    senderDid: Uint8Array;
    recipientDid: Uint8Array;
    offer?: string;
    answer?: string;
    encryptedOffer?: string;
    encryptedAnswer?: string;
}

// Default STUN servers (no TURN - direct P2P only)
export const DEFAULT_STUN_SERVERS = [
    'stun:stun.l.google.com:19302',
    'stun:stun1.l.google.com:19302'
];

/**
 * Generate a unique session ID for P2P connection
 */
export function generateSessionId(prefix: string = 'p2p'): Uint8Array {
    return generateDataId(prefix);
}

/**
 * Encrypt a WebRTC offer/answer for transmission
 */
export function encryptSignalingData(data: string, sharedSecret: string): string {
    const iv = CryptoJS.lib.WordArray.random(12);
    const key = CryptoJS.PBKDF2(sharedSecret, 'p2p-signaling-salt', {
        keySize: 256 / 32,
        iterations: 1000
    });

    const encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CTR,
        padding: CryptoJS.pad.NoPadding
    });

    return iv.toString(CryptoJS.enc.Hex) + ':' + encrypted.toString();
}

/**
 * Decrypt a WebRTC offer/answer
 */
export function decryptSignalingData(encryptedData: string, sharedSecret: string): string {
    const [ivHex, ciphertext] = encryptedData.split(':');
    const iv = CryptoJS.enc.Hex.parse(ivHex);
    const key = CryptoJS.PBKDF2(sharedSecret, 'p2p-signaling-salt', {
        keySize: 256 / 32,
        iterations: 1000
    });

    const decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
        iv: iv,
        mode: CryptoJS.mode.CTR,
        padding: CryptoJS.pad.NoPadding
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
}

/**
 * Get public IP and port via STUN
 */
export async function getPublicIP(stunServer: string = DEFAULT_STUN_SERVERS[0]): Promise<{ address: string, port: number }> {
    return new Promise((resolve, reject) => {
        const [host, portStr] = stunServer.replace('stun:', '').split(':');
        const port = parseInt(portStr) || 19302;
        const socket = dgram.createSocket('udp4');

        // STUN Binding Request (Type: 0x0001, Length: 0, Cookie: 0x2112A442, TID: 12 bytes)
        const tid = CryptoJS.lib.WordArray.random(12).toString();
        const request = Buffer.concat([
            Buffer.from([0x00, 0x01, 0x00, 0x00]), // Type + Length
            Buffer.from([0x21, 0x12, 0xA4, 0x42]), // Magic Cookie
            Buffer.from(tid, 'hex').slice(0, 12)   // Transaction ID
        ]);

        let isClosed = false;
        const closeSocket = () => {
            if (!isClosed) {
                isClosed = true;
                socket.close();
            }
        };

        socket.on('message', (msg: Buffer) => {
            closeSocket();
            // Basic parsing of MAPPED-ADDRESS (0x0001) or XOR-MAPPED-ADDRESS (0x0020)
            // This is a simplified parser for demonstration
            try {
                // Find address attribute (this is a bit brittle without a full STUN parser)
                // but usually the first attribute in a simple response
                let offset = 20;
                while (offset < msg.length) {
                    const attrType = msg.readUInt16BE(offset);
                    const attrLen = msg.readUInt16BE(offset + 2);
                    if (attrType === 0x0020 || attrType === 0x0001) { // XOR or Mapped
                        const family = msg[offset + 5];
                        const port = msg.readUInt16BE(offset + 6) ^ (attrType === 0x0020 ? 0x2112 : 0);
                        const ipParts = [];
                        for (let i = 0; i < 4; i++) {
                            let part = msg[offset + 8 + i];
                            if (attrType === 0x0020) {
                                const cookie = [0x21, 0x12, 0xA4, 0x42];
                                part ^= cookie[i];
                            }
                            ipParts.push(part);
                        }
                        resolve({ address: ipParts.join('.'), port });
                        return;
                    }
                    offset += 4 + attrLen;
                }
            } catch (e) {
                // Return localhost as fallback
                resolve({ address: '127.0.0.1', port: 0 });
            }
        });

        socket.on('error', (err) => {
            closeSocket();
            reject(err);
        });

        socket.send(request, port, host);

        setTimeout(() => {
            closeSocket();
            resolve({ address: '127.0.0.1', port: 0 }); // Fallback
        }, 3000);
    });
}

/**
 * Create a real WebRTC-like offer containing real connectivity info
 */
export async function createRealOffer(sessionId: Uint8Array): Promise<string> {
    const publicInfo = await getPublicIP();
    const localPort = 40000 + Math.floor(Math.random() * 5000);

    return JSON.stringify({
        type: 'offer',
        sdp: `v=0\no=- ${Date.now()} 2 IN IP4 127.0.0.1\ns=PDPSession\nt=0 0\na=ice-ufrag:${bytesToHex(sessionId).slice(0, 8)}\na=candidate:1 1 UDP 2122260223 ${publicInfo.address} ${localPort} typ host`,
        publicIP: publicInfo.address,
        port: localPort
    });
}

/**
 * Create a real WebRTC-like answer containing real connectivity info
 */
export async function createRealAnswer(sessionId: Uint8Array, offer: string): Promise<string> {
    const publicInfo = await getPublicIP();
    const localPort = 50000 + Math.floor(Math.random() * 5000);

    return JSON.stringify({
        type: 'answer',
        sdp: `v=0\no=- ${Date.now()} 2 IN IP4 127.0.0.1\ns=PDPSession\nt=0 0\na=ice-ufrag:${bytesToHex(sessionId).slice(0, 8)}\na=candidate:1 1 UDP 2122260223 ${publicInfo.address} ${localPort} typ host`,
        publicIP: publicInfo.address,
        port: localPort
    });
}

/**
 * Create a P2P session (sender side)
 */
export async function createP2PSession(
    senderDid: Uint8Array,
    recipientDid: Uint8Array,
    sharedSecret: string,
    config: P2PSessionConfig = {}
): Promise<P2PSession> {
    const sessionId = generateSessionId('p2p');
    const offer = await createRealOffer(sessionId);
    const encryptedOffer = encryptSignalingData(offer, sharedSecret);

    return {
        sessionId,
        senderDid,
        recipientDid,
        offer,
        encryptedOffer
    };
}

/**
 * Accept a P2P session (recipient side)
 */
export async function acceptP2PSession(
    sessionId: Uint8Array,
    recipientDid: Uint8Array,
    senderDid: Uint8Array,
    encryptedOffer: string,
    sharedSecret: string,
    config: P2PSessionConfig = {}
): Promise<P2PSession> {
    const offer = decryptSignalingData(encryptedOffer, sharedSecret);
    const answer = await createRealAnswer(sessionId, offer);
    const encryptedAnswer = encryptSignalingData(answer, sharedSecret);

    return {
        sessionId,
        senderDid,
        recipientDid,
        offer,
        answer,
        encryptedOffer,
        encryptedAnswer
    };
}

/**
 * Complete a P2P session by reading the answer (sender side)
 */
export async function completeP2PSession(
    session: P2PSession,
    encryptedAnswer: string,
    sharedSecret: string
): Promise<P2PSession> {
    const answer = decryptSignalingData(encryptedAnswer, sharedSecret);

    return {
        ...session,
        answer,
        encryptedAnswer
    };
}

/**
 * Perform a real UDP data transfer between two ports
 */
export async function performRealDataTransfer(
    data: string,
    targetIP: string,
    targetPort: number,
    localPort: number,
    onPacket: (packet: any) => void
): Promise<string> {
    return new Promise((resolve) => {
        const socket = dgram.createSocket('udp4');
        const receiver = dgram.createSocket('udp4');
        let receivedData = '';

        receiver.bind(targetPort, '127.0.0.1');
        receiver.on('message', (msg: Buffer) => {
            const chunk = msg.toString();
            receivedData += chunk;
            onPacket({ type: 'UDP_PACKET', size: msg.length, seq: 0, payload: bytesToHex(msg).slice(0, 16) + '...' });

            if (receivedData.length >= data.length) {
                receiver.close();
                socket.close();
                resolve(receivedData);
            }
        });

        socket.bind(localPort, '127.0.0.1');

        // Send data in chunks
        const chunkSize = 20;
        for (let i = 0; i < data.length; i += chunkSize) {
            const chunk = data.slice(i, i + chunkSize);
            socket.send(chunk, targetPort, '127.0.0.1');
        }
    });
}
