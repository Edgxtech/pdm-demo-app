import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<T> = {
}

export type ImpureCircuits<T> = {
  storeCommitment(context: __compactRuntime.CircuitContext<T>,
                  dataId_0: Uint8Array,
                  commitment_0: Uint8Array,
                  ownerDid_0: Uint8Array,
                  recipientDid_0: Uint8Array,
                  metadata_0: string): __compactRuntime.CircuitResults<T, []>;
  verifyCommitment(context: __compactRuntime.CircuitContext<T>,
                   dataId_0: Uint8Array,
                   rawData_0: Uint8Array,
                   nonce_0: Uint8Array): __compactRuntime.CircuitResults<T, boolean>;
  revokeCommitment(context: __compactRuntime.CircuitContext<T>,
                   dataId_0: Uint8Array,
                   ownerDid_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  storeEncryptedData(context: __compactRuntime.CircuitContext<T>,
                     dataId_0: Uint8Array,
                     metadata_0: string,
                     ownerDid_0: Uint8Array,
                     encryptedPayload_0: string,
                     encryptionKey_0: string,
                     authCommitment_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  grantAccess(context: __compactRuntime.CircuitContext<T>,
              dataId_0: Uint8Array,
              recipientDid_0: Uint8Array,
              ownerDid_0: Uint8Array,
              ownerSecret_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  hasAccess(context: __compactRuntime.CircuitContext<T>,
            dataId_0: Uint8Array,
            recipientDid_0: Uint8Array): __compactRuntime.CircuitResults<T, boolean>;
  revokeAccess(context: __compactRuntime.CircuitContext<T>,
               dataId_0: Uint8Array,
               recipientDid_0: Uint8Array,
               ownerDid_0: Uint8Array,
               ownerSecret_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  registerIdentity(context: __compactRuntime.CircuitContext<T>,
                   userDid_0: Uint8Array,
                   identityHash_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  setContractAdmin(context: __compactRuntime.CircuitContext<T>,
                   adminDid_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  registerTrustedIssuer(context: __compactRuntime.CircuitContext<T>,
                        issuerDid_0: Uint8Array,
                        adminDid_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  recordCredential(context: __compactRuntime.CircuitContext<T>,
                   subjectDid_0: Uint8Array,
                   issuerDid_0: Uint8Array,
                   role_0: string,
                   expiryTimestamp_0: bigint): __compactRuntime.CircuitResults<T, []>;
  hasValidCredential(context: __compactRuntime.CircuitContext<T>,
                     subjectDid_0: Uint8Array,
                     currentTimestamp_0: bigint): __compactRuntime.CircuitResults<T, boolean>;
  getCredentialRole(context: __compactRuntime.CircuitContext<T>,
                    subjectDid_0: Uint8Array): __compactRuntime.CircuitResults<T, string>;
  revokeCredential(context: __compactRuntime.CircuitContext<T>,
                   subjectDid_0: Uint8Array,
                   issuerDid_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  recordProofForRecipient(context: __compactRuntime.CircuitContext<T>,
                          proofId_0: Uint8Array,
                          proofType_0: string,
                          proverDid_0: Uint8Array,
                          recipientDid_0: Uint8Array,
                          currentTimestamp_0: bigint,
                          expiryTimestamp_0: bigint): __compactRuntime.CircuitResults<T, []>;
  verifyAndRecordAge(context: __compactRuntime.CircuitContext<T>,
                     birthTimestamp_0: bigint,
                     currentTimestamp_0: bigint,
                     minAge_0: bigint,
                     proofId_0: Uint8Array,
                     proverDid_0: Uint8Array,
                     recipientDid_0: Uint8Array,
                     expiryTimestamp_0: bigint,
                     proofType_0: string): __compactRuntime.CircuitResults<T, []>;
  verifyAndRecordResidence(context: __compactRuntime.CircuitContext<T>,
                           countryCodeHash_0: Uint8Array,
                           allowedCountry1_0: Uint8Array,
                           allowedCountry2_0: Uint8Array,
                           allowedCountry3_0: Uint8Array,
                           proofId_0: Uint8Array,
                           proverDid_0: Uint8Array,
                           recipientDid_0: Uint8Array,
                           expiryTimestamp_0: bigint,
                           currentTimestamp_0: bigint,
                           proofType_0: string): __compactRuntime.CircuitResults<T, []>;
  verifyAndRecordLocationVisit(context: __compactRuntime.CircuitContext<T>,
                               userLat_0: bigint,
                               userLon_0: bigint,
                               targetLat_0: bigint,
                               targetLon_0: bigint,
                               maxRadius_0: bigint,
                               proofId_0: Uint8Array,
                               proverDid_0: Uint8Array,
                               recipientDid_0: Uint8Array,
                               expiryTimestamp_0: bigint,
                               currentTimestamp_0: bigint,
                               proofType_0: string): __compactRuntime.CircuitResults<T, []>;
  verifyAndRecordDataOwnership(context: __compactRuntime.CircuitContext<T>,
                               dataSecret_0: Uint8Array,
                               expectedHash_0: Uint8Array,
                               proofId_0: Uint8Array,
                               proverDid_0: Uint8Array,
                               recipientDid_0: Uint8Array,
                               expiryTimestamp_0: bigint,
                               currentTimestamp_0: bigint,
                               proofType_0: string): __compactRuntime.CircuitResults<T, []>;
  verifyAndRecordCredential(context: __compactRuntime.CircuitContext<T>,
                            credentialSecret_0: Uint8Array,
                            expectedHash_0: Uint8Array,
                            proofId_0: Uint8Array,
                            proverDid_0: Uint8Array,
                            recipientDid_0: Uint8Array,
                            expiryTimestamp_0: bigint,
                            currentTimestamp_0: bigint,
                            proofType_0: string): __compactRuntime.CircuitResults<T, []>;
  isProofValid(context: __compactRuntime.CircuitContext<T>,
               proofId_0: Uint8Array): __compactRuntime.CircuitResults<T, boolean>;
  isProofForRecipient(context: __compactRuntime.CircuitContext<T>,
                      proofId_0: Uint8Array,
                      recipientDid_0: Uint8Array): __compactRuntime.CircuitResults<T, boolean>;
  invalidateProof(context: __compactRuntime.CircuitContext<T>,
                  proofId_0: Uint8Array,
                  proverDid_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  isValidCommitment(context: __compactRuntime.CircuitContext<T>,
                    dataId_0: Uint8Array): __compactRuntime.CircuitResults<T, boolean>;
  createP2PSession(context: __compactRuntime.CircuitContext<T>,
                   sessionId_0: Uint8Array,
                   senderDid_0: Uint8Array,
                   recipientDid_0: Uint8Array,
                   encryptedOffer_0: string): __compactRuntime.CircuitResults<T, []>;
  answerP2PSession(context: __compactRuntime.CircuitContext<T>,
                   sessionId_0: Uint8Array,
                   recipientDid_0: Uint8Array,
                   encryptedAnswer_0: string): __compactRuntime.CircuitResults<T, []>;
  closeP2PSession(context: __compactRuntime.CircuitContext<T>,
                  sessionId_0: Uint8Array,
                  ownerDid_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  hasP2PAnswer(context: __compactRuntime.CircuitContext<T>,
               sessionId_0: Uint8Array): __compactRuntime.CircuitResults<T, boolean>;
}

export type PureCircuits = {
  proveAgeOver(birthTimestamp_0: bigint,
               currentTimestamp_0: bigint,
               minAge_0: bigint): boolean;
  proveResidenceIn(countryCodeHash_0: Uint8Array,
                   allowedCountry1_0: Uint8Array,
                   allowedCountry2_0: Uint8Array,
                   allowedCountry3_0: Uint8Array): boolean;
  proveLocationVisit(userLat_0: bigint,
                     userLon_0: bigint,
                     targetLat_0: bigint,
                     targetLon_0: bigint,
                     maxRadius_0: bigint): boolean;
  proveDataOwnership(dataSecret_0: Uint8Array, expectedHash_0: Uint8Array): boolean;
  computeAuthCommitment(secret_0: Uint8Array): Uint8Array;
}

export type Circuits<T> = {
  storeCommitment(context: __compactRuntime.CircuitContext<T>,
                  dataId_0: Uint8Array,
                  commitment_0: Uint8Array,
                  ownerDid_0: Uint8Array,
                  recipientDid_0: Uint8Array,
                  metadata_0: string): __compactRuntime.CircuitResults<T, []>;
  verifyCommitment(context: __compactRuntime.CircuitContext<T>,
                   dataId_0: Uint8Array,
                   rawData_0: Uint8Array,
                   nonce_0: Uint8Array): __compactRuntime.CircuitResults<T, boolean>;
  revokeCommitment(context: __compactRuntime.CircuitContext<T>,
                   dataId_0: Uint8Array,
                   ownerDid_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  storeEncryptedData(context: __compactRuntime.CircuitContext<T>,
                     dataId_0: Uint8Array,
                     metadata_0: string,
                     ownerDid_0: Uint8Array,
                     encryptedPayload_0: string,
                     encryptionKey_0: string,
                     authCommitment_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  grantAccess(context: __compactRuntime.CircuitContext<T>,
              dataId_0: Uint8Array,
              recipientDid_0: Uint8Array,
              ownerDid_0: Uint8Array,
              ownerSecret_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  hasAccess(context: __compactRuntime.CircuitContext<T>,
            dataId_0: Uint8Array,
            recipientDid_0: Uint8Array): __compactRuntime.CircuitResults<T, boolean>;
  revokeAccess(context: __compactRuntime.CircuitContext<T>,
               dataId_0: Uint8Array,
               recipientDid_0: Uint8Array,
               ownerDid_0: Uint8Array,
               ownerSecret_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  registerIdentity(context: __compactRuntime.CircuitContext<T>,
                   userDid_0: Uint8Array,
                   identityHash_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  setContractAdmin(context: __compactRuntime.CircuitContext<T>,
                   adminDid_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  registerTrustedIssuer(context: __compactRuntime.CircuitContext<T>,
                        issuerDid_0: Uint8Array,
                        adminDid_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  recordCredential(context: __compactRuntime.CircuitContext<T>,
                   subjectDid_0: Uint8Array,
                   issuerDid_0: Uint8Array,
                   role_0: string,
                   expiryTimestamp_0: bigint): __compactRuntime.CircuitResults<T, []>;
  hasValidCredential(context: __compactRuntime.CircuitContext<T>,
                     subjectDid_0: Uint8Array,
                     currentTimestamp_0: bigint): __compactRuntime.CircuitResults<T, boolean>;
  getCredentialRole(context: __compactRuntime.CircuitContext<T>,
                    subjectDid_0: Uint8Array): __compactRuntime.CircuitResults<T, string>;
  revokeCredential(context: __compactRuntime.CircuitContext<T>,
                   subjectDid_0: Uint8Array,
                   issuerDid_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  recordProofForRecipient(context: __compactRuntime.CircuitContext<T>,
                          proofId_0: Uint8Array,
                          proofType_0: string,
                          proverDid_0: Uint8Array,
                          recipientDid_0: Uint8Array,
                          currentTimestamp_0: bigint,
                          expiryTimestamp_0: bigint): __compactRuntime.CircuitResults<T, []>;
  proveAgeOver(context: __compactRuntime.CircuitContext<T>,
               birthTimestamp_0: bigint,
               currentTimestamp_0: bigint,
               minAge_0: bigint): __compactRuntime.CircuitResults<T, boolean>;
  verifyAndRecordAge(context: __compactRuntime.CircuitContext<T>,
                     birthTimestamp_0: bigint,
                     currentTimestamp_0: bigint,
                     minAge_0: bigint,
                     proofId_0: Uint8Array,
                     proverDid_0: Uint8Array,
                     recipientDid_0: Uint8Array,
                     expiryTimestamp_0: bigint,
                     proofType_0: string): __compactRuntime.CircuitResults<T, []>;
  proveResidenceIn(context: __compactRuntime.CircuitContext<T>,
                   countryCodeHash_0: Uint8Array,
                   allowedCountry1_0: Uint8Array,
                   allowedCountry2_0: Uint8Array,
                   allowedCountry3_0: Uint8Array): __compactRuntime.CircuitResults<T, boolean>;
  verifyAndRecordResidence(context: __compactRuntime.CircuitContext<T>,
                           countryCodeHash_0: Uint8Array,
                           allowedCountry1_0: Uint8Array,
                           allowedCountry2_0: Uint8Array,
                           allowedCountry3_0: Uint8Array,
                           proofId_0: Uint8Array,
                           proverDid_0: Uint8Array,
                           recipientDid_0: Uint8Array,
                           expiryTimestamp_0: bigint,
                           currentTimestamp_0: bigint,
                           proofType_0: string): __compactRuntime.CircuitResults<T, []>;
  proveLocationVisit(context: __compactRuntime.CircuitContext<T>,
                     userLat_0: bigint,
                     userLon_0: bigint,
                     targetLat_0: bigint,
                     targetLon_0: bigint,
                     maxRadius_0: bigint): __compactRuntime.CircuitResults<T, boolean>;
  verifyAndRecordLocationVisit(context: __compactRuntime.CircuitContext<T>,
                               userLat_0: bigint,
                               userLon_0: bigint,
                               targetLat_0: bigint,
                               targetLon_0: bigint,
                               maxRadius_0: bigint,
                               proofId_0: Uint8Array,
                               proverDid_0: Uint8Array,
                               recipientDid_0: Uint8Array,
                               expiryTimestamp_0: bigint,
                               currentTimestamp_0: bigint,
                               proofType_0: string): __compactRuntime.CircuitResults<T, []>;
  proveDataOwnership(context: __compactRuntime.CircuitContext<T>,
                     dataSecret_0: Uint8Array,
                     expectedHash_0: Uint8Array): __compactRuntime.CircuitResults<T, boolean>;
  verifyAndRecordDataOwnership(context: __compactRuntime.CircuitContext<T>,
                               dataSecret_0: Uint8Array,
                               expectedHash_0: Uint8Array,
                               proofId_0: Uint8Array,
                               proverDid_0: Uint8Array,
                               recipientDid_0: Uint8Array,
                               expiryTimestamp_0: bigint,
                               currentTimestamp_0: bigint,
                               proofType_0: string): __compactRuntime.CircuitResults<T, []>;
  verifyAndRecordCredential(context: __compactRuntime.CircuitContext<T>,
                            credentialSecret_0: Uint8Array,
                            expectedHash_0: Uint8Array,
                            proofId_0: Uint8Array,
                            proverDid_0: Uint8Array,
                            recipientDid_0: Uint8Array,
                            expiryTimestamp_0: bigint,
                            currentTimestamp_0: bigint,
                            proofType_0: string): __compactRuntime.CircuitResults<T, []>;
  isProofValid(context: __compactRuntime.CircuitContext<T>,
               proofId_0: Uint8Array): __compactRuntime.CircuitResults<T, boolean>;
  isProofForRecipient(context: __compactRuntime.CircuitContext<T>,
                      proofId_0: Uint8Array,
                      recipientDid_0: Uint8Array): __compactRuntime.CircuitResults<T, boolean>;
  invalidateProof(context: __compactRuntime.CircuitContext<T>,
                  proofId_0: Uint8Array,
                  proverDid_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  isValidCommitment(context: __compactRuntime.CircuitContext<T>,
                    dataId_0: Uint8Array): __compactRuntime.CircuitResults<T, boolean>;
  createP2PSession(context: __compactRuntime.CircuitContext<T>,
                   sessionId_0: Uint8Array,
                   senderDid_0: Uint8Array,
                   recipientDid_0: Uint8Array,
                   encryptedOffer_0: string): __compactRuntime.CircuitResults<T, []>;
  answerP2PSession(context: __compactRuntime.CircuitContext<T>,
                   sessionId_0: Uint8Array,
                   recipientDid_0: Uint8Array,
                   encryptedAnswer_0: string): __compactRuntime.CircuitResults<T, []>;
  closeP2PSession(context: __compactRuntime.CircuitContext<T>,
                  sessionId_0: Uint8Array,
                  ownerDid_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  hasP2PAnswer(context: __compactRuntime.CircuitContext<T>,
               sessionId_0: Uint8Array): __compactRuntime.CircuitResults<T, boolean>;
  computeAuthCommitment(context: __compactRuntime.CircuitContext<T>,
                        secret_0: Uint8Array): __compactRuntime.CircuitResults<T, Uint8Array>;
}

export type Ledger = {
  commitments: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): Uint8Array;
    [Symbol.iterator](): Iterator<[Uint8Array, Uint8Array]>
  };
  commitmentOwner: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): Uint8Array;
    [Symbol.iterator](): Iterator<[Uint8Array, Uint8Array]>
  };
  commitmentRecipient: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): Uint8Array;
    [Symbol.iterator](): Iterator<[Uint8Array, Uint8Array]>
  };
  commitmentRevoked: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<[Uint8Array, boolean]>
  };
  encryptedData: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): string;
    [Symbol.iterator](): Iterator<[Uint8Array, string]>
  };
  encryptedDataOwner: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): Uint8Array;
    [Symbol.iterator](): Iterator<[Uint8Array, Uint8Array]>
  };
  encryptedDataCategory: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): string;
    [Symbol.iterator](): Iterator<[Uint8Array, string]>
  };
  encryptedDataAuthCommitment: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): Uint8Array;
    [Symbol.iterator](): Iterator<[Uint8Array, Uint8Array]>
  };
  ownerPubKey: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): Uint8Array;
    [Symbol.iterator](): Iterator<[Uint8Array, Uint8Array]>
  };
  recipientPubKey: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): Uint8Array;
    [Symbol.iterator](): Iterator<[Uint8Array, Uint8Array]>
  };
  encryptionNonce: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): Uint8Array;
    [Symbol.iterator](): Iterator<[Uint8Array, Uint8Array]>
  };
  sharingMode: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): string;
    [Symbol.iterator](): Iterator<[Uint8Array, string]>
  };
  accessGranted: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<[Uint8Array, boolean]>
  };
  disclosureMetadata: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): string;
    [Symbol.iterator](): Iterator<[Uint8Array, string]>
  };
  encryptionKeys: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): string;
    [Symbol.iterator](): Iterator<[Uint8Array, string]>
  };
  identityCommitments: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): Uint8Array;
    [Symbol.iterator](): Iterator<[Uint8Array, Uint8Array]>
  };
  credentialIssuer: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): Uint8Array;
    [Symbol.iterator](): Iterator<[Uint8Array, Uint8Array]>
  };
  credentialExpiry: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): bigint;
    [Symbol.iterator](): Iterator<[Uint8Array, bigint]>
  };
  credentialRole: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): string;
    [Symbol.iterator](): Iterator<[Uint8Array, string]>
  };
  credentialValid: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<[Uint8Array, boolean]>
  };
  trustedIssuers: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<[Uint8Array, boolean]>
  };
  proofRecords: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): string;
    [Symbol.iterator](): Iterator<[Uint8Array, string]>
  };
  proofValid: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<[Uint8Array, boolean]>
  };
  proofProver: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): Uint8Array;
    [Symbol.iterator](): Iterator<[Uint8Array, Uint8Array]>
  };
  proofRecipient: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): Uint8Array;
    [Symbol.iterator](): Iterator<[Uint8Array, Uint8Array]>
  };
  proofExpiry: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): bigint;
    [Symbol.iterator](): Iterator<[Uint8Array, bigint]>
  };
  proofCreated: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): bigint;
    [Symbol.iterator](): Iterator<[Uint8Array, bigint]>
  };
  recipientProofIndex: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<[Uint8Array, boolean]>
  };
  p2pSessions: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): string;
    [Symbol.iterator](): Iterator<[Uint8Array, string]>
  };
  p2pAnswers: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): string;
    [Symbol.iterator](): Iterator<[Uint8Array, string]>
  };
  p2pSessionOwner: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): Uint8Array;
    [Symbol.iterator](): Iterator<[Uint8Array, Uint8Array]>
  };
  p2pSessionRecipient: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): Uint8Array;
    [Symbol.iterator](): Iterator<[Uint8Array, Uint8Array]>
  };
  p2pSessionActive: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<[Uint8Array, boolean]>
  };
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<T, W extends Witnesses<T> = Witnesses<T>> {
  witnesses: W;
  circuits: Circuits<T>;
  impureCircuits: ImpureCircuits<T>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<T>): __compactRuntime.ConstructorResult<T>;
}

export declare function ledger(state: __compactRuntime.StateValue): Ledger;
export declare const pureCircuits: PureCircuits;
