'use strict';
const __compactRuntime = require('@midnight-ntwrk/compact-runtime');
const expectedRuntimeVersionString = '0.9.0';
const expectedRuntimeVersion = expectedRuntimeVersionString.split('-')[0].split('.').map(Number);
const actualRuntimeVersion = __compactRuntime.versionString.split('-')[0].split('.').map(Number);
if (expectedRuntimeVersion[0] != actualRuntimeVersion[0]
     || (actualRuntimeVersion[0] == 0 && expectedRuntimeVersion[1] != actualRuntimeVersion[1])
     || expectedRuntimeVersion[1] > actualRuntimeVersion[1]
     || (expectedRuntimeVersion[1] == actualRuntimeVersion[1] && expectedRuntimeVersion[2] > actualRuntimeVersion[2]))
   throw new __compactRuntime.CompactError(`Version mismatch: compiled code expects ${expectedRuntimeVersionString}, runtime is ${__compactRuntime.versionString}`);
{ const MAX_FIELD = 52435875175126190479447740508185965837690552500527637822603658699938581184512n;
  if (__compactRuntime.MAX_FIELD !== MAX_FIELD)
     throw new __compactRuntime.CompactError(`compiler thinks maximum field value is ${MAX_FIELD}; run time thinks it is ${__compactRuntime.MAX_FIELD}`)
}

const _descriptor_0 = new __compactRuntime.CompactTypeBytes(32);

const _descriptor_1 = new __compactRuntime.CompactTypeBoolean();

const _descriptor_2 = new __compactRuntime.CompactTypeOpaqueString();

const _descriptor_3 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

const _descriptor_4 = new __compactRuntime.CompactTypeVector(2, _descriptor_0);

class _ContractAddress_0 {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
}

const _descriptor_5 = new _ContractAddress_0();

const _descriptor_6 = new __compactRuntime.CompactTypeBytes(12);

const _descriptor_7 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

const _descriptor_8 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

class Contract {
  witnesses;
  constructor(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    }
    const witnesses_0 = args_0[0];
    if (typeof(witnesses_0) !== 'object') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor is not an object');
    }
    this.witnesses = witnesses_0;
    this.circuits = {
      storeCommitment: (...args_1) => {
        if (args_1.length !== 6) {
          throw new __compactRuntime.CompactError(`storeCommitment: expected 6 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const dataId_0 = args_1[1];
        const commitment_0 = args_1[2];
        const ownerDid_0 = args_1[3];
        const recipientDid_0 = args_1[4];
        const metadata_0 = args_1[5];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('storeCommitment',
                                      'argument 1 (as invoked from Typescript)',
                                      'privacy-bridge.compact line 93 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(dataId_0.buffer instanceof ArrayBuffer && dataId_0.BYTES_PER_ELEMENT === 1 && dataId_0.length === 32)) {
          __compactRuntime.type_error('storeCommitment',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'privacy-bridge.compact line 93 char 1',
                                      'Bytes<32>',
                                      dataId_0)
        }
        if (!(commitment_0.buffer instanceof ArrayBuffer && commitment_0.BYTES_PER_ELEMENT === 1 && commitment_0.length === 32)) {
          __compactRuntime.type_error('storeCommitment',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'privacy-bridge.compact line 93 char 1',
                                      'Bytes<32>',
                                      commitment_0)
        }
        if (!(ownerDid_0.buffer instanceof ArrayBuffer && ownerDid_0.BYTES_PER_ELEMENT === 1 && ownerDid_0.length === 32)) {
          __compactRuntime.type_error('storeCommitment',
                                      'argument 3 (argument 4 as invoked from Typescript)',
                                      'privacy-bridge.compact line 93 char 1',
                                      'Bytes<32>',
                                      ownerDid_0)
        }
        if (!(recipientDid_0.buffer instanceof ArrayBuffer && recipientDid_0.BYTES_PER_ELEMENT === 1 && recipientDid_0.length === 32)) {
          __compactRuntime.type_error('storeCommitment',
                                      'argument 4 (argument 5 as invoked from Typescript)',
                                      'privacy-bridge.compact line 93 char 1',
                                      'Bytes<32>',
                                      recipientDid_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(dataId_0).concat(_descriptor_0.toValue(commitment_0).concat(_descriptor_0.toValue(ownerDid_0).concat(_descriptor_0.toValue(recipientDid_0).concat(_descriptor_2.toValue(metadata_0))))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_2.alignment()))))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._storeCommitment_0(context,
                                                 partialProofData,
                                                 dataId_0,
                                                 commitment_0,
                                                 ownerDid_0,
                                                 recipientDid_0,
                                                 metadata_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      verifyCommitment: (...args_1) => {
        if (args_1.length !== 4) {
          throw new __compactRuntime.CompactError(`verifyCommitment: expected 4 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const dataId_0 = args_1[1];
        const rawData_0 = args_1[2];
        const nonce_0 = args_1[3];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('verifyCommitment',
                                      'argument 1 (as invoked from Typescript)',
                                      'privacy-bridge.compact line 109 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(dataId_0.buffer instanceof ArrayBuffer && dataId_0.BYTES_PER_ELEMENT === 1 && dataId_0.length === 32)) {
          __compactRuntime.type_error('verifyCommitment',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'privacy-bridge.compact line 109 char 1',
                                      'Bytes<32>',
                                      dataId_0)
        }
        if (!(rawData_0.buffer instanceof ArrayBuffer && rawData_0.BYTES_PER_ELEMENT === 1 && rawData_0.length === 32)) {
          __compactRuntime.type_error('verifyCommitment',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'privacy-bridge.compact line 109 char 1',
                                      'Bytes<32>',
                                      rawData_0)
        }
        if (!(nonce_0.buffer instanceof ArrayBuffer && nonce_0.BYTES_PER_ELEMENT === 1 && nonce_0.length === 32)) {
          __compactRuntime.type_error('verifyCommitment',
                                      'argument 3 (argument 4 as invoked from Typescript)',
                                      'privacy-bridge.compact line 109 char 1',
                                      'Bytes<32>',
                                      nonce_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(dataId_0).concat(_descriptor_0.toValue(rawData_0).concat(_descriptor_0.toValue(nonce_0))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment()))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._verifyCommitment_0(context,
                                                  partialProofData,
                                                  dataId_0,
                                                  rawData_0,
                                                  nonce_0);
        partialProofData.output = { value: _descriptor_1.toValue(result_0), alignment: _descriptor_1.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      revokeCommitment: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`revokeCommitment: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const dataId_0 = args_1[1];
        const ownerDid_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('revokeCommitment',
                                      'argument 1 (as invoked from Typescript)',
                                      'privacy-bridge.compact line 121 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(dataId_0.buffer instanceof ArrayBuffer && dataId_0.BYTES_PER_ELEMENT === 1 && dataId_0.length === 32)) {
          __compactRuntime.type_error('revokeCommitment',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'privacy-bridge.compact line 121 char 1',
                                      'Bytes<32>',
                                      dataId_0)
        }
        if (!(ownerDid_0.buffer instanceof ArrayBuffer && ownerDid_0.BYTES_PER_ELEMENT === 1 && ownerDid_0.length === 32)) {
          __compactRuntime.type_error('revokeCommitment',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'privacy-bridge.compact line 121 char 1',
                                      'Bytes<32>',
                                      ownerDid_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(dataId_0).concat(_descriptor_0.toValue(ownerDid_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._revokeCommitment_0(context,
                                                  partialProofData,
                                                  dataId_0,
                                                  ownerDid_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      storeEncryptedData: (...args_1) => {
        if (args_1.length !== 7) {
          throw new __compactRuntime.CompactError(`storeEncryptedData: expected 7 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const dataId_0 = args_1[1];
        const metadata_0 = args_1[2];
        const ownerDid_0 = args_1[3];
        const encryptedPayload_0 = args_1[4];
        const encryptionKey_0 = args_1[5];
        const authCommitment_0 = args_1[6];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('storeEncryptedData',
                                      'argument 1 (as invoked from Typescript)',
                                      'privacy-bridge.compact line 133 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(dataId_0.buffer instanceof ArrayBuffer && dataId_0.BYTES_PER_ELEMENT === 1 && dataId_0.length === 32)) {
          __compactRuntime.type_error('storeEncryptedData',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'privacy-bridge.compact line 133 char 1',
                                      'Bytes<32>',
                                      dataId_0)
        }
        if (!(ownerDid_0.buffer instanceof ArrayBuffer && ownerDid_0.BYTES_PER_ELEMENT === 1 && ownerDid_0.length === 32)) {
          __compactRuntime.type_error('storeEncryptedData',
                                      'argument 3 (argument 4 as invoked from Typescript)',
                                      'privacy-bridge.compact line 133 char 1',
                                      'Bytes<32>',
                                      ownerDid_0)
        }
        if (!(authCommitment_0.buffer instanceof ArrayBuffer && authCommitment_0.BYTES_PER_ELEMENT === 1 && authCommitment_0.length === 32)) {
          __compactRuntime.type_error('storeEncryptedData',
                                      'argument 6 (argument 7 as invoked from Typescript)',
                                      'privacy-bridge.compact line 133 char 1',
                                      'Bytes<32>',
                                      authCommitment_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(dataId_0).concat(_descriptor_2.toValue(metadata_0).concat(_descriptor_0.toValue(ownerDid_0).concat(_descriptor_2.toValue(encryptedPayload_0).concat(_descriptor_2.toValue(encryptionKey_0).concat(_descriptor_0.toValue(authCommitment_0)))))),
            alignment: _descriptor_0.alignment().concat(_descriptor_2.alignment().concat(_descriptor_0.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_0.alignment())))))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._storeEncryptedData_0(context,
                                                    partialProofData,
                                                    dataId_0,
                                                    metadata_0,
                                                    ownerDid_0,
                                                    encryptedPayload_0,
                                                    encryptionKey_0,
                                                    authCommitment_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      grantAccess: (...args_1) => {
        if (args_1.length !== 5) {
          throw new __compactRuntime.CompactError(`grantAccess: expected 5 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const dataId_0 = args_1[1];
        const recipientDid_0 = args_1[2];
        const ownerDid_0 = args_1[3];
        const ownerSecret_0 = args_1[4];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('grantAccess',
                                      'argument 1 (as invoked from Typescript)',
                                      'privacy-bridge.compact line 155 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(dataId_0.buffer instanceof ArrayBuffer && dataId_0.BYTES_PER_ELEMENT === 1 && dataId_0.length === 32)) {
          __compactRuntime.type_error('grantAccess',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'privacy-bridge.compact line 155 char 1',
                                      'Bytes<32>',
                                      dataId_0)
        }
        if (!(recipientDid_0.buffer instanceof ArrayBuffer && recipientDid_0.BYTES_PER_ELEMENT === 1 && recipientDid_0.length === 32)) {
          __compactRuntime.type_error('grantAccess',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'privacy-bridge.compact line 155 char 1',
                                      'Bytes<32>',
                                      recipientDid_0)
        }
        if (!(ownerDid_0.buffer instanceof ArrayBuffer && ownerDid_0.BYTES_PER_ELEMENT === 1 && ownerDid_0.length === 32)) {
          __compactRuntime.type_error('grantAccess',
                                      'argument 3 (argument 4 as invoked from Typescript)',
                                      'privacy-bridge.compact line 155 char 1',
                                      'Bytes<32>',
                                      ownerDid_0)
        }
        if (!(ownerSecret_0.buffer instanceof ArrayBuffer && ownerSecret_0.BYTES_PER_ELEMENT === 1 && ownerSecret_0.length === 32)) {
          __compactRuntime.type_error('grantAccess',
                                      'argument 4 (argument 5 as invoked from Typescript)',
                                      'privacy-bridge.compact line 155 char 1',
                                      'Bytes<32>',
                                      ownerSecret_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(dataId_0).concat(_descriptor_0.toValue(recipientDid_0).concat(_descriptor_0.toValue(ownerDid_0).concat(_descriptor_0.toValue(ownerSecret_0)))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment())))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._grantAccess_0(context,
                                             partialProofData,
                                             dataId_0,
                                             recipientDid_0,
                                             ownerDid_0,
                                             ownerSecret_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      hasAccess: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`hasAccess: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const dataId_0 = args_1[1];
        const recipientDid_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('hasAccess',
                                      'argument 1 (as invoked from Typescript)',
                                      'privacy-bridge.compact line 183 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(dataId_0.buffer instanceof ArrayBuffer && dataId_0.BYTES_PER_ELEMENT === 1 && dataId_0.length === 32)) {
          __compactRuntime.type_error('hasAccess',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'privacy-bridge.compact line 183 char 1',
                                      'Bytes<32>',
                                      dataId_0)
        }
        if (!(recipientDid_0.buffer instanceof ArrayBuffer && recipientDid_0.BYTES_PER_ELEMENT === 1 && recipientDid_0.length === 32)) {
          __compactRuntime.type_error('hasAccess',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'privacy-bridge.compact line 183 char 1',
                                      'Bytes<32>',
                                      recipientDid_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(dataId_0).concat(_descriptor_0.toValue(recipientDid_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._hasAccess_0(context,
                                           partialProofData,
                                           dataId_0,
                                           recipientDid_0);
        partialProofData.output = { value: _descriptor_1.toValue(result_0), alignment: _descriptor_1.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      revokeAccess: (...args_1) => {
        if (args_1.length !== 5) {
          throw new __compactRuntime.CompactError(`revokeAccess: expected 5 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const dataId_0 = args_1[1];
        const recipientDid_0 = args_1[2];
        const ownerDid_0 = args_1[3];
        const ownerSecret_0 = args_1[4];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('revokeAccess',
                                      'argument 1 (as invoked from Typescript)',
                                      'privacy-bridge.compact line 193 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(dataId_0.buffer instanceof ArrayBuffer && dataId_0.BYTES_PER_ELEMENT === 1 && dataId_0.length === 32)) {
          __compactRuntime.type_error('revokeAccess',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'privacy-bridge.compact line 193 char 1',
                                      'Bytes<32>',
                                      dataId_0)
        }
        if (!(recipientDid_0.buffer instanceof ArrayBuffer && recipientDid_0.BYTES_PER_ELEMENT === 1 && recipientDid_0.length === 32)) {
          __compactRuntime.type_error('revokeAccess',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'privacy-bridge.compact line 193 char 1',
                                      'Bytes<32>',
                                      recipientDid_0)
        }
        if (!(ownerDid_0.buffer instanceof ArrayBuffer && ownerDid_0.BYTES_PER_ELEMENT === 1 && ownerDid_0.length === 32)) {
          __compactRuntime.type_error('revokeAccess',
                                      'argument 3 (argument 4 as invoked from Typescript)',
                                      'privacy-bridge.compact line 193 char 1',
                                      'Bytes<32>',
                                      ownerDid_0)
        }
        if (!(ownerSecret_0.buffer instanceof ArrayBuffer && ownerSecret_0.BYTES_PER_ELEMENT === 1 && ownerSecret_0.length === 32)) {
          __compactRuntime.type_error('revokeAccess',
                                      'argument 4 (argument 5 as invoked from Typescript)',
                                      'privacy-bridge.compact line 193 char 1',
                                      'Bytes<32>',
                                      ownerSecret_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(dataId_0).concat(_descriptor_0.toValue(recipientDid_0).concat(_descriptor_0.toValue(ownerDid_0).concat(_descriptor_0.toValue(ownerSecret_0)))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment())))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._revokeAccess_0(context,
                                              partialProofData,
                                              dataId_0,
                                              recipientDid_0,
                                              ownerDid_0,
                                              ownerSecret_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      registerIdentity: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`registerIdentity: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const userDid_0 = args_1[1];
        const identityHash_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('registerIdentity',
                                      'argument 1 (as invoked from Typescript)',
                                      'privacy-bridge.compact line 225 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(userDid_0.buffer instanceof ArrayBuffer && userDid_0.BYTES_PER_ELEMENT === 1 && userDid_0.length === 32)) {
          __compactRuntime.type_error('registerIdentity',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'privacy-bridge.compact line 225 char 1',
                                      'Bytes<32>',
                                      userDid_0)
        }
        if (!(identityHash_0.buffer instanceof ArrayBuffer && identityHash_0.BYTES_PER_ELEMENT === 1 && identityHash_0.length === 32)) {
          __compactRuntime.type_error('registerIdentity',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'privacy-bridge.compact line 225 char 1',
                                      'Bytes<32>',
                                      identityHash_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(userDid_0).concat(_descriptor_0.toValue(identityHash_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._registerIdentity_0(context,
                                                  partialProofData,
                                                  userDid_0,
                                                  identityHash_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      setContractAdmin: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`setContractAdmin: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const adminDid_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('setContractAdmin',
                                      'argument 1 (as invoked from Typescript)',
                                      'privacy-bridge.compact line 239 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(adminDid_0.buffer instanceof ArrayBuffer && adminDid_0.BYTES_PER_ELEMENT === 1 && adminDid_0.length === 32)) {
          __compactRuntime.type_error('setContractAdmin',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'privacy-bridge.compact line 239 char 1',
                                      'Bytes<32>',
                                      adminDid_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(adminDid_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._setContractAdmin_0(context,
                                                  partialProofData,
                                                  adminDid_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      registerTrustedIssuer: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`registerTrustedIssuer: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const issuerDid_0 = args_1[1];
        const adminDid_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('registerTrustedIssuer',
                                      'argument 1 (as invoked from Typescript)',
                                      'privacy-bridge.compact line 248 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(issuerDid_0.buffer instanceof ArrayBuffer && issuerDid_0.BYTES_PER_ELEMENT === 1 && issuerDid_0.length === 32)) {
          __compactRuntime.type_error('registerTrustedIssuer',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'privacy-bridge.compact line 248 char 1',
                                      'Bytes<32>',
                                      issuerDid_0)
        }
        if (!(adminDid_0.buffer instanceof ArrayBuffer && adminDid_0.BYTES_PER_ELEMENT === 1 && adminDid_0.length === 32)) {
          __compactRuntime.type_error('registerTrustedIssuer',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'privacy-bridge.compact line 248 char 1',
                                      'Bytes<32>',
                                      adminDid_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(issuerDid_0).concat(_descriptor_0.toValue(adminDid_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._registerTrustedIssuer_0(context,
                                                       partialProofData,
                                                       issuerDid_0,
                                                       adminDid_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      recordCredential: (...args_1) => {
        if (args_1.length !== 5) {
          throw new __compactRuntime.CompactError(`recordCredential: expected 5 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const subjectDid_0 = args_1[1];
        const issuerDid_0 = args_1[2];
        const role_0 = args_1[3];
        const expiryTimestamp_0 = args_1[4];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('recordCredential',
                                      'argument 1 (as invoked from Typescript)',
                                      'privacy-bridge.compact line 259 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(subjectDid_0.buffer instanceof ArrayBuffer && subjectDid_0.BYTES_PER_ELEMENT === 1 && subjectDid_0.length === 32)) {
          __compactRuntime.type_error('recordCredential',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'privacy-bridge.compact line 259 char 1',
                                      'Bytes<32>',
                                      subjectDid_0)
        }
        if (!(issuerDid_0.buffer instanceof ArrayBuffer && issuerDid_0.BYTES_PER_ELEMENT === 1 && issuerDid_0.length === 32)) {
          __compactRuntime.type_error('recordCredential',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'privacy-bridge.compact line 259 char 1',
                                      'Bytes<32>',
                                      issuerDid_0)
        }
        if (!(typeof(expiryTimestamp_0) === 'bigint' && expiryTimestamp_0 >= 0n && expiryTimestamp_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('recordCredential',
                                      'argument 4 (argument 5 as invoked from Typescript)',
                                      'privacy-bridge.compact line 259 char 1',
                                      'Uint<0..18446744073709551615>',
                                      expiryTimestamp_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(subjectDid_0).concat(_descriptor_0.toValue(issuerDid_0).concat(_descriptor_2.toValue(role_0).concat(_descriptor_3.toValue(expiryTimestamp_0)))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_2.alignment().concat(_descriptor_3.alignment())))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._recordCredential_0(context,
                                                  partialProofData,
                                                  subjectDid_0,
                                                  issuerDid_0,
                                                  role_0,
                                                  expiryTimestamp_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      hasValidCredential: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`hasValidCredential: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const subjectDid_0 = args_1[1];
        const currentTimestamp_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('hasValidCredential',
                                      'argument 1 (as invoked from Typescript)',
                                      'privacy-bridge.compact line 280 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(subjectDid_0.buffer instanceof ArrayBuffer && subjectDid_0.BYTES_PER_ELEMENT === 1 && subjectDid_0.length === 32)) {
          __compactRuntime.type_error('hasValidCredential',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'privacy-bridge.compact line 280 char 1',
                                      'Bytes<32>',
                                      subjectDid_0)
        }
        if (!(typeof(currentTimestamp_0) === 'bigint' && currentTimestamp_0 >= 0n && currentTimestamp_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('hasValidCredential',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'privacy-bridge.compact line 280 char 1',
                                      'Uint<0..18446744073709551615>',
                                      currentTimestamp_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(subjectDid_0).concat(_descriptor_3.toValue(currentTimestamp_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_3.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._hasValidCredential_0(context,
                                                    partialProofData,
                                                    subjectDid_0,
                                                    currentTimestamp_0);
        partialProofData.output = { value: _descriptor_1.toValue(result_0), alignment: _descriptor_1.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      getCredentialRole: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`getCredentialRole: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const subjectDid_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('getCredentialRole',
                                      'argument 1 (as invoked from Typescript)',
                                      'privacy-bridge.compact line 294 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(subjectDid_0.buffer instanceof ArrayBuffer && subjectDid_0.BYTES_PER_ELEMENT === 1 && subjectDid_0.length === 32)) {
          __compactRuntime.type_error('getCredentialRole',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'privacy-bridge.compact line 294 char 1',
                                      'Bytes<32>',
                                      subjectDid_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(subjectDid_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._getCredentialRole_0(context,
                                                   partialProofData,
                                                   subjectDid_0);
        partialProofData.output = { value: _descriptor_2.toValue(result_0), alignment: _descriptor_2.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      revokeCredential: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`revokeCredential: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const subjectDid_0 = args_1[1];
        const issuerDid_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('revokeCredential',
                                      'argument 1 (as invoked from Typescript)',
                                      'privacy-bridge.compact line 302 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(subjectDid_0.buffer instanceof ArrayBuffer && subjectDid_0.BYTES_PER_ELEMENT === 1 && subjectDid_0.length === 32)) {
          __compactRuntime.type_error('revokeCredential',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'privacy-bridge.compact line 302 char 1',
                                      'Bytes<32>',
                                      subjectDid_0)
        }
        if (!(issuerDid_0.buffer instanceof ArrayBuffer && issuerDid_0.BYTES_PER_ELEMENT === 1 && issuerDid_0.length === 32)) {
          __compactRuntime.type_error('revokeCredential',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'privacy-bridge.compact line 302 char 1',
                                      'Bytes<32>',
                                      issuerDid_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(subjectDid_0).concat(_descriptor_0.toValue(issuerDid_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._revokeCredential_0(context,
                                                  partialProofData,
                                                  subjectDid_0,
                                                  issuerDid_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      recordProofForRecipient: (...args_1) => {
        if (args_1.length !== 7) {
          throw new __compactRuntime.CompactError(`recordProofForRecipient: expected 7 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const proofId_0 = args_1[1];
        const proofType_0 = args_1[2];
        const proverDid_0 = args_1[3];
        const recipientDid_0 = args_1[4];
        const currentTimestamp_0 = args_1[5];
        const expiryTimestamp_0 = args_1[6];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('recordProofForRecipient',
                                      'argument 1 (as invoked from Typescript)',
                                      'privacy-bridge.compact line 343 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(proofId_0.buffer instanceof ArrayBuffer && proofId_0.BYTES_PER_ELEMENT === 1 && proofId_0.length === 32)) {
          __compactRuntime.type_error('recordProofForRecipient',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'privacy-bridge.compact line 343 char 1',
                                      'Bytes<32>',
                                      proofId_0)
        }
        if (!(proverDid_0.buffer instanceof ArrayBuffer && proverDid_0.BYTES_PER_ELEMENT === 1 && proverDid_0.length === 32)) {
          __compactRuntime.type_error('recordProofForRecipient',
                                      'argument 3 (argument 4 as invoked from Typescript)',
                                      'privacy-bridge.compact line 343 char 1',
                                      'Bytes<32>',
                                      proverDid_0)
        }
        if (!(recipientDid_0.buffer instanceof ArrayBuffer && recipientDid_0.BYTES_PER_ELEMENT === 1 && recipientDid_0.length === 32)) {
          __compactRuntime.type_error('recordProofForRecipient',
                                      'argument 4 (argument 5 as invoked from Typescript)',
                                      'privacy-bridge.compact line 343 char 1',
                                      'Bytes<32>',
                                      recipientDid_0)
        }
        if (!(typeof(currentTimestamp_0) === 'bigint' && currentTimestamp_0 >= 0n && currentTimestamp_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('recordProofForRecipient',
                                      'argument 5 (argument 6 as invoked from Typescript)',
                                      'privacy-bridge.compact line 343 char 1',
                                      'Uint<0..18446744073709551615>',
                                      currentTimestamp_0)
        }
        if (!(typeof(expiryTimestamp_0) === 'bigint' && expiryTimestamp_0 >= 0n && expiryTimestamp_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('recordProofForRecipient',
                                      'argument 6 (argument 7 as invoked from Typescript)',
                                      'privacy-bridge.compact line 343 char 1',
                                      'Uint<0..18446744073709551615>',
                                      expiryTimestamp_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(proofId_0).concat(_descriptor_2.toValue(proofType_0).concat(_descriptor_0.toValue(proverDid_0).concat(_descriptor_0.toValue(recipientDid_0).concat(_descriptor_3.toValue(currentTimestamp_0).concat(_descriptor_3.toValue(expiryTimestamp_0)))))),
            alignment: _descriptor_0.alignment().concat(_descriptor_2.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment().concat(_descriptor_3.alignment())))))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._recordProofForRecipient_0(context,
                                                         partialProofData,
                                                         proofId_0,
                                                         proofType_0,
                                                         proverDid_0,
                                                         recipientDid_0,
                                                         currentTimestamp_0,
                                                         expiryTimestamp_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      proveAgeOver(context, ...args_1) {
        return { result: pureCircuits.proveAgeOver(...args_1), context };
      },
      verifyAndRecordAge: (...args_1) => {
        if (args_1.length !== 9) {
          throw new __compactRuntime.CompactError(`verifyAndRecordAge: expected 9 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const birthTimestamp_0 = args_1[1];
        const currentTimestamp_0 = args_1[2];
        const minAge_0 = args_1[3];
        const proofId_0 = args_1[4];
        const proverDid_0 = args_1[5];
        const recipientDid_0 = args_1[6];
        const expiryTimestamp_0 = args_1[7];
        const proofType_0 = args_1[8];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('verifyAndRecordAge',
                                      'argument 1 (as invoked from Typescript)',
                                      'privacy-bridge.compact line 370 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(birthTimestamp_0) === 'bigint' && birthTimestamp_0 >= 0n && birthTimestamp_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('verifyAndRecordAge',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'privacy-bridge.compact line 370 char 1',
                                      'Uint<0..18446744073709551615>',
                                      birthTimestamp_0)
        }
        if (!(typeof(currentTimestamp_0) === 'bigint' && currentTimestamp_0 >= 0n && currentTimestamp_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('verifyAndRecordAge',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'privacy-bridge.compact line 370 char 1',
                                      'Uint<0..18446744073709551615>',
                                      currentTimestamp_0)
        }
        if (!(typeof(minAge_0) === 'bigint' && minAge_0 >= 0n && minAge_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('verifyAndRecordAge',
                                      'argument 3 (argument 4 as invoked from Typescript)',
                                      'privacy-bridge.compact line 370 char 1',
                                      'Uint<0..18446744073709551615>',
                                      minAge_0)
        }
        if (!(proofId_0.buffer instanceof ArrayBuffer && proofId_0.BYTES_PER_ELEMENT === 1 && proofId_0.length === 32)) {
          __compactRuntime.type_error('verifyAndRecordAge',
                                      'argument 4 (argument 5 as invoked from Typescript)',
                                      'privacy-bridge.compact line 370 char 1',
                                      'Bytes<32>',
                                      proofId_0)
        }
        if (!(proverDid_0.buffer instanceof ArrayBuffer && proverDid_0.BYTES_PER_ELEMENT === 1 && proverDid_0.length === 32)) {
          __compactRuntime.type_error('verifyAndRecordAge',
                                      'argument 5 (argument 6 as invoked from Typescript)',
                                      'privacy-bridge.compact line 370 char 1',
                                      'Bytes<32>',
                                      proverDid_0)
        }
        if (!(recipientDid_0.buffer instanceof ArrayBuffer && recipientDid_0.BYTES_PER_ELEMENT === 1 && recipientDid_0.length === 32)) {
          __compactRuntime.type_error('verifyAndRecordAge',
                                      'argument 6 (argument 7 as invoked from Typescript)',
                                      'privacy-bridge.compact line 370 char 1',
                                      'Bytes<32>',
                                      recipientDid_0)
        }
        if (!(typeof(expiryTimestamp_0) === 'bigint' && expiryTimestamp_0 >= 0n && expiryTimestamp_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('verifyAndRecordAge',
                                      'argument 7 (argument 8 as invoked from Typescript)',
                                      'privacy-bridge.compact line 370 char 1',
                                      'Uint<0..18446744073709551615>',
                                      expiryTimestamp_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_3.toValue(birthTimestamp_0).concat(_descriptor_3.toValue(currentTimestamp_0).concat(_descriptor_3.toValue(minAge_0).concat(_descriptor_0.toValue(proofId_0).concat(_descriptor_0.toValue(proverDid_0).concat(_descriptor_0.toValue(recipientDid_0).concat(_descriptor_3.toValue(expiryTimestamp_0).concat(_descriptor_2.toValue(proofType_0)))))))),
            alignment: _descriptor_3.alignment().concat(_descriptor_3.alignment().concat(_descriptor_3.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment().concat(_descriptor_2.alignment())))))))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._verifyAndRecordAge_0(context,
                                                    partialProofData,
                                                    birthTimestamp_0,
                                                    currentTimestamp_0,
                                                    minAge_0,
                                                    proofId_0,
                                                    proverDid_0,
                                                    recipientDid_0,
                                                    expiryTimestamp_0,
                                                    proofType_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      proveResidenceIn(context, ...args_1) {
        return { result: pureCircuits.proveResidenceIn(...args_1), context };
      },
      verifyAndRecordResidence: (...args_1) => {
        if (args_1.length !== 11) {
          throw new __compactRuntime.CompactError(`verifyAndRecordResidence: expected 11 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const countryCodeHash_0 = args_1[1];
        const allowedCountry1_0 = args_1[2];
        const allowedCountry2_0 = args_1[3];
        const allowedCountry3_0 = args_1[4];
        const proofId_0 = args_1[5];
        const proverDid_0 = args_1[6];
        const recipientDid_0 = args_1[7];
        const expiryTimestamp_0 = args_1[8];
        const currentTimestamp_0 = args_1[9];
        const proofType_0 = args_1[10];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('verifyAndRecordResidence',
                                      'argument 1 (as invoked from Typescript)',
                                      'privacy-bridge.compact line 399 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(countryCodeHash_0.buffer instanceof ArrayBuffer && countryCodeHash_0.BYTES_PER_ELEMENT === 1 && countryCodeHash_0.length === 32)) {
          __compactRuntime.type_error('verifyAndRecordResidence',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'privacy-bridge.compact line 399 char 1',
                                      'Bytes<32>',
                                      countryCodeHash_0)
        }
        if (!(allowedCountry1_0.buffer instanceof ArrayBuffer && allowedCountry1_0.BYTES_PER_ELEMENT === 1 && allowedCountry1_0.length === 32)) {
          __compactRuntime.type_error('verifyAndRecordResidence',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'privacy-bridge.compact line 399 char 1',
                                      'Bytes<32>',
                                      allowedCountry1_0)
        }
        if (!(allowedCountry2_0.buffer instanceof ArrayBuffer && allowedCountry2_0.BYTES_PER_ELEMENT === 1 && allowedCountry2_0.length === 32)) {
          __compactRuntime.type_error('verifyAndRecordResidence',
                                      'argument 3 (argument 4 as invoked from Typescript)',
                                      'privacy-bridge.compact line 399 char 1',
                                      'Bytes<32>',
                                      allowedCountry2_0)
        }
        if (!(allowedCountry3_0.buffer instanceof ArrayBuffer && allowedCountry3_0.BYTES_PER_ELEMENT === 1 && allowedCountry3_0.length === 32)) {
          __compactRuntime.type_error('verifyAndRecordResidence',
                                      'argument 4 (argument 5 as invoked from Typescript)',
                                      'privacy-bridge.compact line 399 char 1',
                                      'Bytes<32>',
                                      allowedCountry3_0)
        }
        if (!(proofId_0.buffer instanceof ArrayBuffer && proofId_0.BYTES_PER_ELEMENT === 1 && proofId_0.length === 32)) {
          __compactRuntime.type_error('verifyAndRecordResidence',
                                      'argument 5 (argument 6 as invoked from Typescript)',
                                      'privacy-bridge.compact line 399 char 1',
                                      'Bytes<32>',
                                      proofId_0)
        }
        if (!(proverDid_0.buffer instanceof ArrayBuffer && proverDid_0.BYTES_PER_ELEMENT === 1 && proverDid_0.length === 32)) {
          __compactRuntime.type_error('verifyAndRecordResidence',
                                      'argument 6 (argument 7 as invoked from Typescript)',
                                      'privacy-bridge.compact line 399 char 1',
                                      'Bytes<32>',
                                      proverDid_0)
        }
        if (!(recipientDid_0.buffer instanceof ArrayBuffer && recipientDid_0.BYTES_PER_ELEMENT === 1 && recipientDid_0.length === 32)) {
          __compactRuntime.type_error('verifyAndRecordResidence',
                                      'argument 7 (argument 8 as invoked from Typescript)',
                                      'privacy-bridge.compact line 399 char 1',
                                      'Bytes<32>',
                                      recipientDid_0)
        }
        if (!(typeof(expiryTimestamp_0) === 'bigint' && expiryTimestamp_0 >= 0n && expiryTimestamp_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('verifyAndRecordResidence',
                                      'argument 8 (argument 9 as invoked from Typescript)',
                                      'privacy-bridge.compact line 399 char 1',
                                      'Uint<0..18446744073709551615>',
                                      expiryTimestamp_0)
        }
        if (!(typeof(currentTimestamp_0) === 'bigint' && currentTimestamp_0 >= 0n && currentTimestamp_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('verifyAndRecordResidence',
                                      'argument 9 (argument 10 as invoked from Typescript)',
                                      'privacy-bridge.compact line 399 char 1',
                                      'Uint<0..18446744073709551615>',
                                      currentTimestamp_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(countryCodeHash_0).concat(_descriptor_0.toValue(allowedCountry1_0).concat(_descriptor_0.toValue(allowedCountry2_0).concat(_descriptor_0.toValue(allowedCountry3_0).concat(_descriptor_0.toValue(proofId_0).concat(_descriptor_0.toValue(proverDid_0).concat(_descriptor_0.toValue(recipientDid_0).concat(_descriptor_3.toValue(expiryTimestamp_0).concat(_descriptor_3.toValue(currentTimestamp_0).concat(_descriptor_2.toValue(proofType_0)))))))))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment().concat(_descriptor_3.alignment().concat(_descriptor_2.alignment())))))))))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._verifyAndRecordResidence_0(context,
                                                          partialProofData,
                                                          countryCodeHash_0,
                                                          allowedCountry1_0,
                                                          allowedCountry2_0,
                                                          allowedCountry3_0,
                                                          proofId_0,
                                                          proverDid_0,
                                                          recipientDid_0,
                                                          expiryTimestamp_0,
                                                          currentTimestamp_0,
                                                          proofType_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      proveLocationVisit(context, ...args_1) {
        return { result: pureCircuits.proveLocationVisit(...args_1), context };
      },
      verifyAndRecordLocationVisit: (...args_1) => {
        if (args_1.length !== 12) {
          throw new __compactRuntime.CompactError(`verifyAndRecordLocationVisit: expected 12 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const userLat_0 = args_1[1];
        const userLon_0 = args_1[2];
        const targetLat_0 = args_1[3];
        const targetLon_0 = args_1[4];
        const maxRadius_0 = args_1[5];
        const proofId_0 = args_1[6];
        const proverDid_0 = args_1[7];
        const recipientDid_0 = args_1[8];
        const expiryTimestamp_0 = args_1[9];
        const currentTimestamp_0 = args_1[10];
        const proofType_0 = args_1[11];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('verifyAndRecordLocationVisit',
                                      'argument 1 (as invoked from Typescript)',
                                      'privacy-bridge.compact line 439 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(userLat_0) === 'bigint' && userLat_0 >= 0n && userLat_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('verifyAndRecordLocationVisit',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'privacy-bridge.compact line 439 char 1',
                                      'Uint<0..18446744073709551615>',
                                      userLat_0)
        }
        if (!(typeof(userLon_0) === 'bigint' && userLon_0 >= 0n && userLon_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('verifyAndRecordLocationVisit',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'privacy-bridge.compact line 439 char 1',
                                      'Uint<0..18446744073709551615>',
                                      userLon_0)
        }
        if (!(typeof(targetLat_0) === 'bigint' && targetLat_0 >= 0n && targetLat_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('verifyAndRecordLocationVisit',
                                      'argument 3 (argument 4 as invoked from Typescript)',
                                      'privacy-bridge.compact line 439 char 1',
                                      'Uint<0..18446744073709551615>',
                                      targetLat_0)
        }
        if (!(typeof(targetLon_0) === 'bigint' && targetLon_0 >= 0n && targetLon_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('verifyAndRecordLocationVisit',
                                      'argument 4 (argument 5 as invoked from Typescript)',
                                      'privacy-bridge.compact line 439 char 1',
                                      'Uint<0..18446744073709551615>',
                                      targetLon_0)
        }
        if (!(typeof(maxRadius_0) === 'bigint' && maxRadius_0 >= 0n && maxRadius_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('verifyAndRecordLocationVisit',
                                      'argument 5 (argument 6 as invoked from Typescript)',
                                      'privacy-bridge.compact line 439 char 1',
                                      'Uint<0..18446744073709551615>',
                                      maxRadius_0)
        }
        if (!(proofId_0.buffer instanceof ArrayBuffer && proofId_0.BYTES_PER_ELEMENT === 1 && proofId_0.length === 32)) {
          __compactRuntime.type_error('verifyAndRecordLocationVisit',
                                      'argument 6 (argument 7 as invoked from Typescript)',
                                      'privacy-bridge.compact line 439 char 1',
                                      'Bytes<32>',
                                      proofId_0)
        }
        if (!(proverDid_0.buffer instanceof ArrayBuffer && proverDid_0.BYTES_PER_ELEMENT === 1 && proverDid_0.length === 32)) {
          __compactRuntime.type_error('verifyAndRecordLocationVisit',
                                      'argument 7 (argument 8 as invoked from Typescript)',
                                      'privacy-bridge.compact line 439 char 1',
                                      'Bytes<32>',
                                      proverDid_0)
        }
        if (!(recipientDid_0.buffer instanceof ArrayBuffer && recipientDid_0.BYTES_PER_ELEMENT === 1 && recipientDid_0.length === 32)) {
          __compactRuntime.type_error('verifyAndRecordLocationVisit',
                                      'argument 8 (argument 9 as invoked from Typescript)',
                                      'privacy-bridge.compact line 439 char 1',
                                      'Bytes<32>',
                                      recipientDid_0)
        }
        if (!(typeof(expiryTimestamp_0) === 'bigint' && expiryTimestamp_0 >= 0n && expiryTimestamp_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('verifyAndRecordLocationVisit',
                                      'argument 9 (argument 10 as invoked from Typescript)',
                                      'privacy-bridge.compact line 439 char 1',
                                      'Uint<0..18446744073709551615>',
                                      expiryTimestamp_0)
        }
        if (!(typeof(currentTimestamp_0) === 'bigint' && currentTimestamp_0 >= 0n && currentTimestamp_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('verifyAndRecordLocationVisit',
                                      'argument 10 (argument 11 as invoked from Typescript)',
                                      'privacy-bridge.compact line 439 char 1',
                                      'Uint<0..18446744073709551615>',
                                      currentTimestamp_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_3.toValue(userLat_0).concat(_descriptor_3.toValue(userLon_0).concat(_descriptor_3.toValue(targetLat_0).concat(_descriptor_3.toValue(targetLon_0).concat(_descriptor_3.toValue(maxRadius_0).concat(_descriptor_0.toValue(proofId_0).concat(_descriptor_0.toValue(proverDid_0).concat(_descriptor_0.toValue(recipientDid_0).concat(_descriptor_3.toValue(expiryTimestamp_0).concat(_descriptor_3.toValue(currentTimestamp_0).concat(_descriptor_2.toValue(proofType_0))))))))))),
            alignment: _descriptor_3.alignment().concat(_descriptor_3.alignment().concat(_descriptor_3.alignment().concat(_descriptor_3.alignment().concat(_descriptor_3.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment().concat(_descriptor_3.alignment().concat(_descriptor_2.alignment()))))))))))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._verifyAndRecordLocationVisit_0(context,
                                                              partialProofData,
                                                              userLat_0,
                                                              userLon_0,
                                                              targetLat_0,
                                                              targetLon_0,
                                                              maxRadius_0,
                                                              proofId_0,
                                                              proverDid_0,
                                                              recipientDid_0,
                                                              expiryTimestamp_0,
                                                              currentTimestamp_0,
                                                              proofType_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      proveDataOwnership(context, ...args_1) {
        return { result: pureCircuits.proveDataOwnership(...args_1), context };
      },
      verifyAndRecordDataOwnership: (...args_1) => {
        if (args_1.length !== 9) {
          throw new __compactRuntime.CompactError(`verifyAndRecordDataOwnership: expected 9 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const dataSecret_0 = args_1[1];
        const expectedHash_0 = args_1[2];
        const proofId_0 = args_1[3];
        const proverDid_0 = args_1[4];
        const recipientDid_0 = args_1[5];
        const expiryTimestamp_0 = args_1[6];
        const currentTimestamp_0 = args_1[7];
        const proofType_0 = args_1[8];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('verifyAndRecordDataOwnership',
                                      'argument 1 (as invoked from Typescript)',
                                      'privacy-bridge.compact line 475 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(dataSecret_0.buffer instanceof ArrayBuffer && dataSecret_0.BYTES_PER_ELEMENT === 1 && dataSecret_0.length === 32)) {
          __compactRuntime.type_error('verifyAndRecordDataOwnership',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'privacy-bridge.compact line 475 char 1',
                                      'Bytes<32>',
                                      dataSecret_0)
        }
        if (!(expectedHash_0.buffer instanceof ArrayBuffer && expectedHash_0.BYTES_PER_ELEMENT === 1 && expectedHash_0.length === 32)) {
          __compactRuntime.type_error('verifyAndRecordDataOwnership',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'privacy-bridge.compact line 475 char 1',
                                      'Bytes<32>',
                                      expectedHash_0)
        }
        if (!(proofId_0.buffer instanceof ArrayBuffer && proofId_0.BYTES_PER_ELEMENT === 1 && proofId_0.length === 32)) {
          __compactRuntime.type_error('verifyAndRecordDataOwnership',
                                      'argument 3 (argument 4 as invoked from Typescript)',
                                      'privacy-bridge.compact line 475 char 1',
                                      'Bytes<32>',
                                      proofId_0)
        }
        if (!(proverDid_0.buffer instanceof ArrayBuffer && proverDid_0.BYTES_PER_ELEMENT === 1 && proverDid_0.length === 32)) {
          __compactRuntime.type_error('verifyAndRecordDataOwnership',
                                      'argument 4 (argument 5 as invoked from Typescript)',
                                      'privacy-bridge.compact line 475 char 1',
                                      'Bytes<32>',
                                      proverDid_0)
        }
        if (!(recipientDid_0.buffer instanceof ArrayBuffer && recipientDid_0.BYTES_PER_ELEMENT === 1 && recipientDid_0.length === 32)) {
          __compactRuntime.type_error('verifyAndRecordDataOwnership',
                                      'argument 5 (argument 6 as invoked from Typescript)',
                                      'privacy-bridge.compact line 475 char 1',
                                      'Bytes<32>',
                                      recipientDid_0)
        }
        if (!(typeof(expiryTimestamp_0) === 'bigint' && expiryTimestamp_0 >= 0n && expiryTimestamp_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('verifyAndRecordDataOwnership',
                                      'argument 6 (argument 7 as invoked from Typescript)',
                                      'privacy-bridge.compact line 475 char 1',
                                      'Uint<0..18446744073709551615>',
                                      expiryTimestamp_0)
        }
        if (!(typeof(currentTimestamp_0) === 'bigint' && currentTimestamp_0 >= 0n && currentTimestamp_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('verifyAndRecordDataOwnership',
                                      'argument 7 (argument 8 as invoked from Typescript)',
                                      'privacy-bridge.compact line 475 char 1',
                                      'Uint<0..18446744073709551615>',
                                      currentTimestamp_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(dataSecret_0).concat(_descriptor_0.toValue(expectedHash_0).concat(_descriptor_0.toValue(proofId_0).concat(_descriptor_0.toValue(proverDid_0).concat(_descriptor_0.toValue(recipientDid_0).concat(_descriptor_3.toValue(expiryTimestamp_0).concat(_descriptor_3.toValue(currentTimestamp_0).concat(_descriptor_2.toValue(proofType_0)))))))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment().concat(_descriptor_3.alignment().concat(_descriptor_2.alignment())))))))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._verifyAndRecordDataOwnership_0(context,
                                                              partialProofData,
                                                              dataSecret_0,
                                                              expectedHash_0,
                                                              proofId_0,
                                                              proverDid_0,
                                                              recipientDid_0,
                                                              expiryTimestamp_0,
                                                              currentTimestamp_0,
                                                              proofType_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      verifyAndRecordCredential: (...args_1) => {
        if (args_1.length !== 9) {
          throw new __compactRuntime.CompactError(`verifyAndRecordCredential: expected 9 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const credentialSecret_0 = args_1[1];
        const expectedHash_0 = args_1[2];
        const proofId_0 = args_1[3];
        const proverDid_0 = args_1[4];
        const recipientDid_0 = args_1[5];
        const expiryTimestamp_0 = args_1[6];
        const currentTimestamp_0 = args_1[7];
        const proofType_0 = args_1[8];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('verifyAndRecordCredential',
                                      'argument 1 (as invoked from Typescript)',
                                      'privacy-bridge.compact line 491 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(credentialSecret_0.buffer instanceof ArrayBuffer && credentialSecret_0.BYTES_PER_ELEMENT === 1 && credentialSecret_0.length === 32)) {
          __compactRuntime.type_error('verifyAndRecordCredential',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'privacy-bridge.compact line 491 char 1',
                                      'Bytes<32>',
                                      credentialSecret_0)
        }
        if (!(expectedHash_0.buffer instanceof ArrayBuffer && expectedHash_0.BYTES_PER_ELEMENT === 1 && expectedHash_0.length === 32)) {
          __compactRuntime.type_error('verifyAndRecordCredential',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'privacy-bridge.compact line 491 char 1',
                                      'Bytes<32>',
                                      expectedHash_0)
        }
        if (!(proofId_0.buffer instanceof ArrayBuffer && proofId_0.BYTES_PER_ELEMENT === 1 && proofId_0.length === 32)) {
          __compactRuntime.type_error('verifyAndRecordCredential',
                                      'argument 3 (argument 4 as invoked from Typescript)',
                                      'privacy-bridge.compact line 491 char 1',
                                      'Bytes<32>',
                                      proofId_0)
        }
        if (!(proverDid_0.buffer instanceof ArrayBuffer && proverDid_0.BYTES_PER_ELEMENT === 1 && proverDid_0.length === 32)) {
          __compactRuntime.type_error('verifyAndRecordCredential',
                                      'argument 4 (argument 5 as invoked from Typescript)',
                                      'privacy-bridge.compact line 491 char 1',
                                      'Bytes<32>',
                                      proverDid_0)
        }
        if (!(recipientDid_0.buffer instanceof ArrayBuffer && recipientDid_0.BYTES_PER_ELEMENT === 1 && recipientDid_0.length === 32)) {
          __compactRuntime.type_error('verifyAndRecordCredential',
                                      'argument 5 (argument 6 as invoked from Typescript)',
                                      'privacy-bridge.compact line 491 char 1',
                                      'Bytes<32>',
                                      recipientDid_0)
        }
        if (!(typeof(expiryTimestamp_0) === 'bigint' && expiryTimestamp_0 >= 0n && expiryTimestamp_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('verifyAndRecordCredential',
                                      'argument 6 (argument 7 as invoked from Typescript)',
                                      'privacy-bridge.compact line 491 char 1',
                                      'Uint<0..18446744073709551615>',
                                      expiryTimestamp_0)
        }
        if (!(typeof(currentTimestamp_0) === 'bigint' && currentTimestamp_0 >= 0n && currentTimestamp_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('verifyAndRecordCredential',
                                      'argument 7 (argument 8 as invoked from Typescript)',
                                      'privacy-bridge.compact line 491 char 1',
                                      'Uint<0..18446744073709551615>',
                                      currentTimestamp_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(credentialSecret_0).concat(_descriptor_0.toValue(expectedHash_0).concat(_descriptor_0.toValue(proofId_0).concat(_descriptor_0.toValue(proverDid_0).concat(_descriptor_0.toValue(recipientDid_0).concat(_descriptor_3.toValue(expiryTimestamp_0).concat(_descriptor_3.toValue(currentTimestamp_0).concat(_descriptor_2.toValue(proofType_0)))))))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment().concat(_descriptor_3.alignment().concat(_descriptor_2.alignment())))))))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._verifyAndRecordCredential_0(context,
                                                           partialProofData,
                                                           credentialSecret_0,
                                                           expectedHash_0,
                                                           proofId_0,
                                                           proverDid_0,
                                                           recipientDid_0,
                                                           expiryTimestamp_0,
                                                           currentTimestamp_0,
                                                           proofType_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      isProofValid: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`isProofValid: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const proofId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('isProofValid',
                                      'argument 1 (as invoked from Typescript)',
                                      'privacy-bridge.compact line 511 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(proofId_0.buffer instanceof ArrayBuffer && proofId_0.BYTES_PER_ELEMENT === 1 && proofId_0.length === 32)) {
          __compactRuntime.type_error('isProofValid',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'privacy-bridge.compact line 511 char 1',
                                      'Bytes<32>',
                                      proofId_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(proofId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._isProofValid_0(context,
                                              partialProofData,
                                              proofId_0);
        partialProofData.output = { value: _descriptor_1.toValue(result_0), alignment: _descriptor_1.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      isProofForRecipient: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`isProofForRecipient: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const proofId_0 = args_1[1];
        const recipientDid_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('isProofForRecipient',
                                      'argument 1 (as invoked from Typescript)',
                                      'privacy-bridge.compact line 519 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(proofId_0.buffer instanceof ArrayBuffer && proofId_0.BYTES_PER_ELEMENT === 1 && proofId_0.length === 32)) {
          __compactRuntime.type_error('isProofForRecipient',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'privacy-bridge.compact line 519 char 1',
                                      'Bytes<32>',
                                      proofId_0)
        }
        if (!(recipientDid_0.buffer instanceof ArrayBuffer && recipientDid_0.BYTES_PER_ELEMENT === 1 && recipientDid_0.length === 32)) {
          __compactRuntime.type_error('isProofForRecipient',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'privacy-bridge.compact line 519 char 1',
                                      'Bytes<32>',
                                      recipientDid_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(proofId_0).concat(_descriptor_0.toValue(recipientDid_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._isProofForRecipient_0(context,
                                                     partialProofData,
                                                     proofId_0,
                                                     recipientDid_0);
        partialProofData.output = { value: _descriptor_1.toValue(result_0), alignment: _descriptor_1.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      invalidateProof: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`invalidateProof: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const proofId_0 = args_1[1];
        const proverDid_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('invalidateProof',
                                      'argument 1 (as invoked from Typescript)',
                                      'privacy-bridge.compact line 528 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(proofId_0.buffer instanceof ArrayBuffer && proofId_0.BYTES_PER_ELEMENT === 1 && proofId_0.length === 32)) {
          __compactRuntime.type_error('invalidateProof',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'privacy-bridge.compact line 528 char 1',
                                      'Bytes<32>',
                                      proofId_0)
        }
        if (!(proverDid_0.buffer instanceof ArrayBuffer && proverDid_0.BYTES_PER_ELEMENT === 1 && proverDid_0.length === 32)) {
          __compactRuntime.type_error('invalidateProof',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'privacy-bridge.compact line 528 char 1',
                                      'Bytes<32>',
                                      proverDid_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(proofId_0).concat(_descriptor_0.toValue(proverDid_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._invalidateProof_0(context,
                                                 partialProofData,
                                                 proofId_0,
                                                 proverDid_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      isValidCommitment: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`isValidCommitment: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const dataId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('isValidCommitment',
                                      'argument 1 (as invoked from Typescript)',
                                      'privacy-bridge.compact line 538 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(dataId_0.buffer instanceof ArrayBuffer && dataId_0.BYTES_PER_ELEMENT === 1 && dataId_0.length === 32)) {
          __compactRuntime.type_error('isValidCommitment',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'privacy-bridge.compact line 538 char 1',
                                      'Bytes<32>',
                                      dataId_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(dataId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._isValidCommitment_0(context,
                                                   partialProofData,
                                                   dataId_0);
        partialProofData.output = { value: _descriptor_1.toValue(result_0), alignment: _descriptor_1.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      createP2PSession: (...args_1) => {
        if (args_1.length !== 5) {
          throw new __compactRuntime.CompactError(`createP2PSession: expected 5 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const sessionId_0 = args_1[1];
        const senderDid_0 = args_1[2];
        const recipientDid_0 = args_1[3];
        const encryptedOffer_0 = args_1[4];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('createP2PSession',
                                      'argument 1 (as invoked from Typescript)',
                                      'privacy-bridge.compact line 561 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(sessionId_0.buffer instanceof ArrayBuffer && sessionId_0.BYTES_PER_ELEMENT === 1 && sessionId_0.length === 32)) {
          __compactRuntime.type_error('createP2PSession',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'privacy-bridge.compact line 561 char 1',
                                      'Bytes<32>',
                                      sessionId_0)
        }
        if (!(senderDid_0.buffer instanceof ArrayBuffer && senderDid_0.BYTES_PER_ELEMENT === 1 && senderDid_0.length === 32)) {
          __compactRuntime.type_error('createP2PSession',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'privacy-bridge.compact line 561 char 1',
                                      'Bytes<32>',
                                      senderDid_0)
        }
        if (!(recipientDid_0.buffer instanceof ArrayBuffer && recipientDid_0.BYTES_PER_ELEMENT === 1 && recipientDid_0.length === 32)) {
          __compactRuntime.type_error('createP2PSession',
                                      'argument 3 (argument 4 as invoked from Typescript)',
                                      'privacy-bridge.compact line 561 char 1',
                                      'Bytes<32>',
                                      recipientDid_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(sessionId_0).concat(_descriptor_0.toValue(senderDid_0).concat(_descriptor_0.toValue(recipientDid_0).concat(_descriptor_2.toValue(encryptedOffer_0)))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_2.alignment())))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._createP2PSession_0(context,
                                                  partialProofData,
                                                  sessionId_0,
                                                  senderDid_0,
                                                  recipientDid_0,
                                                  encryptedOffer_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      answerP2PSession: (...args_1) => {
        if (args_1.length !== 4) {
          throw new __compactRuntime.CompactError(`answerP2PSession: expected 4 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const sessionId_0 = args_1[1];
        const recipientDid_0 = args_1[2];
        const encryptedAnswer_0 = args_1[3];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('answerP2PSession',
                                      'argument 1 (as invoked from Typescript)',
                                      'privacy-bridge.compact line 575 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(sessionId_0.buffer instanceof ArrayBuffer && sessionId_0.BYTES_PER_ELEMENT === 1 && sessionId_0.length === 32)) {
          __compactRuntime.type_error('answerP2PSession',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'privacy-bridge.compact line 575 char 1',
                                      'Bytes<32>',
                                      sessionId_0)
        }
        if (!(recipientDid_0.buffer instanceof ArrayBuffer && recipientDid_0.BYTES_PER_ELEMENT === 1 && recipientDid_0.length === 32)) {
          __compactRuntime.type_error('answerP2PSession',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'privacy-bridge.compact line 575 char 1',
                                      'Bytes<32>',
                                      recipientDid_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(sessionId_0).concat(_descriptor_0.toValue(recipientDid_0).concat(_descriptor_2.toValue(encryptedAnswer_0))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_2.alignment()))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._answerP2PSession_0(context,
                                                  partialProofData,
                                                  sessionId_0,
                                                  recipientDid_0,
                                                  encryptedAnswer_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      closeP2PSession: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`closeP2PSession: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const sessionId_0 = args_1[1];
        const ownerDid_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('closeP2PSession',
                                      'argument 1 (as invoked from Typescript)',
                                      'privacy-bridge.compact line 588 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(sessionId_0.buffer instanceof ArrayBuffer && sessionId_0.BYTES_PER_ELEMENT === 1 && sessionId_0.length === 32)) {
          __compactRuntime.type_error('closeP2PSession',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'privacy-bridge.compact line 588 char 1',
                                      'Bytes<32>',
                                      sessionId_0)
        }
        if (!(ownerDid_0.buffer instanceof ArrayBuffer && ownerDid_0.BYTES_PER_ELEMENT === 1 && ownerDid_0.length === 32)) {
          __compactRuntime.type_error('closeP2PSession',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'privacy-bridge.compact line 588 char 1',
                                      'Bytes<32>',
                                      ownerDid_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(sessionId_0).concat(_descriptor_0.toValue(ownerDid_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._closeP2PSession_0(context,
                                                 partialProofData,
                                                 sessionId_0,
                                                 ownerDid_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      hasP2PAnswer: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`hasP2PAnswer: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const sessionId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('hasP2PAnswer',
                                      'argument 1 (as invoked from Typescript)',
                                      'privacy-bridge.compact line 600 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(sessionId_0.buffer instanceof ArrayBuffer && sessionId_0.BYTES_PER_ELEMENT === 1 && sessionId_0.length === 32)) {
          __compactRuntime.type_error('hasP2PAnswer',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'privacy-bridge.compact line 600 char 1',
                                      'Bytes<32>',
                                      sessionId_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(sessionId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._hasP2PAnswer_0(context,
                                              partialProofData,
                                              sessionId_0);
        partialProofData.output = { value: _descriptor_1.toValue(result_0), alignment: _descriptor_1.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      computeAuthCommitment(context, ...args_1) {
        return { result: pureCircuits.computeAuthCommitment(...args_1), context };
      }
    };
    this.impureCircuits = {
      storeCommitment: this.circuits.storeCommitment,
      verifyCommitment: this.circuits.verifyCommitment,
      revokeCommitment: this.circuits.revokeCommitment,
      storeEncryptedData: this.circuits.storeEncryptedData,
      grantAccess: this.circuits.grantAccess,
      hasAccess: this.circuits.hasAccess,
      revokeAccess: this.circuits.revokeAccess,
      registerIdentity: this.circuits.registerIdentity,
      setContractAdmin: this.circuits.setContractAdmin,
      registerTrustedIssuer: this.circuits.registerTrustedIssuer,
      recordCredential: this.circuits.recordCredential,
      hasValidCredential: this.circuits.hasValidCredential,
      getCredentialRole: this.circuits.getCredentialRole,
      revokeCredential: this.circuits.revokeCredential,
      recordProofForRecipient: this.circuits.recordProofForRecipient,
      verifyAndRecordAge: this.circuits.verifyAndRecordAge,
      verifyAndRecordResidence: this.circuits.verifyAndRecordResidence,
      verifyAndRecordLocationVisit: this.circuits.verifyAndRecordLocationVisit,
      verifyAndRecordDataOwnership: this.circuits.verifyAndRecordDataOwnership,
      verifyAndRecordCredential: this.circuits.verifyAndRecordCredential,
      isProofValid: this.circuits.isProofValid,
      isProofForRecipient: this.circuits.isProofForRecipient,
      invalidateProof: this.circuits.invalidateProof,
      isValidCommitment: this.circuits.isValidCommitment,
      createP2PSession: this.circuits.createP2PSession,
      answerP2PSession: this.circuits.answerP2PSession,
      closeP2PSession: this.circuits.closeP2PSession,
      hasP2PAnswer: this.circuits.hasP2PAnswer
    };
  }
  initialState(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    if (typeof(constructorContext_0) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialZswapLocalState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext_0.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    let stateValue_3 = __compactRuntime.StateValue.newArray();
    stateValue_3 = stateValue_3.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_3 = stateValue_3.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_3 = stateValue_3.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(stateValue_3);
    let stateValue_2 = __compactRuntime.StateValue.newArray();
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(stateValue_2);
    let stateValue_1 = __compactRuntime.StateValue.newArray();
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(stateValue_1);
    state_0.data = stateValue_0;
    state_0.setOperation('storeCommitment', new __compactRuntime.ContractOperation());
    state_0.setOperation('verifyCommitment', new __compactRuntime.ContractOperation());
    state_0.setOperation('revokeCommitment', new __compactRuntime.ContractOperation());
    state_0.setOperation('storeEncryptedData', new __compactRuntime.ContractOperation());
    state_0.setOperation('grantAccess', new __compactRuntime.ContractOperation());
    state_0.setOperation('hasAccess', new __compactRuntime.ContractOperation());
    state_0.setOperation('revokeAccess', new __compactRuntime.ContractOperation());
    state_0.setOperation('registerIdentity', new __compactRuntime.ContractOperation());
    state_0.setOperation('setContractAdmin', new __compactRuntime.ContractOperation());
    state_0.setOperation('registerTrustedIssuer', new __compactRuntime.ContractOperation());
    state_0.setOperation('recordCredential', new __compactRuntime.ContractOperation());
    state_0.setOperation('hasValidCredential', new __compactRuntime.ContractOperation());
    state_0.setOperation('getCredentialRole', new __compactRuntime.ContractOperation());
    state_0.setOperation('revokeCredential', new __compactRuntime.ContractOperation());
    state_0.setOperation('recordProofForRecipient', new __compactRuntime.ContractOperation());
    state_0.setOperation('verifyAndRecordAge', new __compactRuntime.ContractOperation());
    state_0.setOperation('verifyAndRecordResidence', new __compactRuntime.ContractOperation());
    state_0.setOperation('verifyAndRecordLocationVisit', new __compactRuntime.ContractOperation());
    state_0.setOperation('verifyAndRecordDataOwnership', new __compactRuntime.ContractOperation());
    state_0.setOperation('verifyAndRecordCredential', new __compactRuntime.ContractOperation());
    state_0.setOperation('isProofValid', new __compactRuntime.ContractOperation());
    state_0.setOperation('isProofForRecipient', new __compactRuntime.ContractOperation());
    state_0.setOperation('invalidateProof', new __compactRuntime.ContractOperation());
    state_0.setOperation('isValidCommitment', new __compactRuntime.ContractOperation());
    state_0.setOperation('createP2PSession', new __compactRuntime.ContractOperation());
    state_0.setOperation('answerP2PSession', new __compactRuntime.ContractOperation());
    state_0.setOperation('closeP2PSession', new __compactRuntime.ContractOperation());
    state_0.setOperation('hasP2PAnswer', new __compactRuntime.ContractOperation());
    const context = {
      originalState: state_0,
      currentPrivateState: constructorContext_0.initialPrivateState,
      currentZswapLocalState: constructorContext_0.initialZswapLocalState,
      transactionContext: new __compactRuntime.QueryContext(state_0.data, __compactRuntime.dummyContractAddress())
    };
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: undefined,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(0n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(0n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(0n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(1n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(0n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(2n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(0n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(1n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(2n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(3n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(4n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(5n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(6n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(7n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(8n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(9n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(10n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(11n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(12n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(13n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(14n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(2n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(0n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(2n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(1n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(2n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(2n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(2n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(3n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(2n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(4n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(2n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(5n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(2n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(6n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(2n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(7n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(2n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(8n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(2n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(9n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(2n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(10n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(2n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(11n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(2n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(12n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(2n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(13n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(2n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(14n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    state_0.data = context.transactionContext.state;
    return {
      currentContractState: state_0,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    }
  }
  _persistentHash_0(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_4, value_0);
    return result_0;
  }
  _persistentHash_1(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_0, value_0);
    return result_0;
  }
  _persistentCommit_0(value_0, rand_0) {
    const result_0 = __compactRuntime.persistentCommit(_descriptor_0,
                                                       value_0,
                                                       rand_0);
    return result_0;
  }
  _storeCommitment_0(context,
                     partialProofData,
                     dataId_0,
                     commitment_0,
                     ownerDid_0,
                     recipientDid_0,
                     metadata_0)
  {
    const dDataId_0 = dataId_0;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(0n),
                                                alignment: _descriptor_7.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(0n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(dDataId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(commitment_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(0n),
                                                alignment: _descriptor_7.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(dDataId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(ownerDid_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(0n),
                                                alignment: _descriptor_7.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(2n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(dDataId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(recipientDid_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(0n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(dDataId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(false),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(10n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(dDataId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(metadata_0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _verifyCommitment_0(context, partialProofData, dataId_0, rawData_0, nonce_0) {
    const dDataId_0 = dataId_0;
    const storedCommitment_0 = _descriptor_0.fromValue(Contract._query(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_7.toValue(0n),
                                                                                                   alignment: _descriptor_7.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_7.toValue(0n),
                                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_0.toValue(dDataId_0),
                                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    const computedCommitment_0 = this._persistentCommit_0(rawData_0, nonce_0);
    return this._equal_0(storedCommitment_0, computedCommitment_0);
  }
  _revokeCommitment_0(context, partialProofData, dataId_0, ownerDid_0) {
    const dDataId_0 = dataId_0;
    const dOwnerDid_0 = ownerDid_0;
    const storedOwner_0 = _descriptor_0.fromValue(Contract._query(context,
                                                                  partialProofData,
                                                                  [
                                                                   { dup: { n: 0 } },
                                                                   { idx: { cached: false,
                                                                            pushPath: false,
                                                                            path: [
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_7.toValue(0n),
                                                                                              alignment: _descriptor_7.alignment() } },
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_7.toValue(1n),
                                                                                              alignment: _descriptor_7.alignment() } }] } },
                                                                   { idx: { cached: false,
                                                                            pushPath: false,
                                                                            path: [
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_0.toValue(dDataId_0),
                                                                                              alignment: _descriptor_0.alignment() } }] } },
                                                                   { popeq: { cached: false,
                                                                              result: undefined } }]).value);
    __compactRuntime.assert(this._equal_1(storedOwner_0, dOwnerDid_0),
                            'Not the owner');
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(0n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(dDataId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(true),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _storeEncryptedData_0(context,
                        partialProofData,
                        dataId_0,
                        metadata_0,
                        ownerDid_0,
                        encryptedPayload_0,
                        encryptionKey_0,
                        authCommitment_0)
  {
    const dDataId_0 = dataId_0;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(dDataId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(encryptedPayload_0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(2n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(dDataId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(ownerDid_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(10n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(dDataId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(metadata_0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(11n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(dDataId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(encryptionKey_0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(4n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(dDataId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(authCommitment_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _grantAccess_0(context,
                 partialProofData,
                 dataId_0,
                 recipientDid_0,
                 ownerDid_0,
                 ownerSecret_0)
  {
    const dDataId_0 = dataId_0;
    const dRecipientDid_0 = recipientDid_0;
    const dOwnerDid_0 = ownerDid_0;
    __compactRuntime.assert(_descriptor_1.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_7.toValue(1n),
                                                                                                alignment: _descriptor_7.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_7.toValue(4n),
                                                                                                alignment: _descriptor_7.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(dDataId_0),
                                                                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'Data does not exist');
    const storedOwner_0 = _descriptor_0.fromValue(Contract._query(context,
                                                                  partialProofData,
                                                                  [
                                                                   { dup: { n: 0 } },
                                                                   { idx: { cached: false,
                                                                            pushPath: false,
                                                                            path: [
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_7.toValue(1n),
                                                                                              alignment: _descriptor_7.alignment() } },
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_7.toValue(2n),
                                                                                              alignment: _descriptor_7.alignment() } }] } },
                                                                   { idx: { cached: false,
                                                                            pushPath: false,
                                                                            path: [
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_0.toValue(dDataId_0),
                                                                                              alignment: _descriptor_0.alignment() } }] } },
                                                                   { popeq: { cached: false,
                                                                              result: undefined } }]).value);
    __compactRuntime.assert(this._equal_2(storedOwner_0, dOwnerDid_0),
                            'Not the owner DID');
    const storedCommitment_0 = _descriptor_0.fromValue(Contract._query(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                                   alignment: _descriptor_7.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_7.toValue(4n),
                                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_0.toValue(dDataId_0),
                                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    __compactRuntime.assert(this._equal_3(this._persistentHash_1(ownerSecret_0),
                                          storedCommitment_0),
                            'Invalid owner secret');
    const accessKey_0 = this._persistentHash_0([dataId_0, recipientDid_0]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(9n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(accessKey_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(true),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _hasAccess_0(context, partialProofData, dataId_0, recipientDid_0) {
    const accessKey_0 = this._persistentHash_0([dataId_0, recipientDid_0]);
    const granted_0 = _descriptor_1.fromValue(Contract._query(context,
                                                              partialProofData,
                                                              [
                                                               { dup: { n: 0 } },
                                                               { idx: { cached: false,
                                                                        pushPath: false,
                                                                        path: [
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_7.toValue(1n),
                                                                                          alignment: _descriptor_7.alignment() } },
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_7.toValue(9n),
                                                                                          alignment: _descriptor_7.alignment() } }] } },
                                                               { idx: { cached: false,
                                                                        pushPath: false,
                                                                        path: [
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_0.toValue(accessKey_0),
                                                                                          alignment: _descriptor_0.alignment() } }] } },
                                                               { popeq: { cached: false,
                                                                          result: undefined } }]).value);
    return granted_0;
  }
  _revokeAccess_0(context,
                  partialProofData,
                  dataId_0,
                  recipientDid_0,
                  ownerDid_0,
                  ownerSecret_0)
  {
    const dDataId_0 = dataId_0;
    const dRecipientDid_0 = recipientDid_0;
    const dOwnerDid_0 = ownerDid_0;
    __compactRuntime.assert(_descriptor_1.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_7.toValue(1n),
                                                                                                alignment: _descriptor_7.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_7.toValue(4n),
                                                                                                alignment: _descriptor_7.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(dDataId_0),
                                                                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'Data does not exist');
    const storedOwner_0 = _descriptor_0.fromValue(Contract._query(context,
                                                                  partialProofData,
                                                                  [
                                                                   { dup: { n: 0 } },
                                                                   { idx: { cached: false,
                                                                            pushPath: false,
                                                                            path: [
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_7.toValue(1n),
                                                                                              alignment: _descriptor_7.alignment() } },
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_7.toValue(2n),
                                                                                              alignment: _descriptor_7.alignment() } }] } },
                                                                   { idx: { cached: false,
                                                                            pushPath: false,
                                                                            path: [
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_0.toValue(dDataId_0),
                                                                                              alignment: _descriptor_0.alignment() } }] } },
                                                                   { popeq: { cached: false,
                                                                              result: undefined } }]).value);
    __compactRuntime.assert(this._equal_4(storedOwner_0, dOwnerDid_0),
                            'Not the owner DID');
    const storedCommitment_0 = _descriptor_0.fromValue(Contract._query(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                                   alignment: _descriptor_7.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_7.toValue(4n),
                                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_0.toValue(dDataId_0),
                                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    __compactRuntime.assert(this._equal_5(this._persistentHash_1(ownerSecret_0),
                                          storedCommitment_0),
                            'Invalid owner secret');
    const accessKey_0 = this._persistentHash_0([dataId_0, recipientDid_0]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(9n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(accessKey_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(false),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _registerIdentity_0(context, partialProofData, userDid_0, identityHash_0) {
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(12n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(userDid_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(identityHash_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _setContractAdmin_0(context, partialProofData, adminDid_0) {
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(2n),
                                                alignment: _descriptor_7.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(2n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(adminDid_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(true),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _registerTrustedIssuer_0(context, partialProofData, issuerDid_0, adminDid_0) {
    const isTrusted_0 = _descriptor_1.fromValue(Contract._query(context,
                                                                partialProofData,
                                                                [
                                                                 { dup: { n: 0 } },
                                                                 { idx: { cached: false,
                                                                          pushPath: false,
                                                                          path: [
                                                                                 { tag: 'value',
                                                                                   value: { value: _descriptor_7.toValue(2n),
                                                                                            alignment: _descriptor_7.alignment() } },
                                                                                 { tag: 'value',
                                                                                   value: { value: _descriptor_7.toValue(2n),
                                                                                            alignment: _descriptor_7.alignment() } }] } },
                                                                 { idx: { cached: false,
                                                                          pushPath: false,
                                                                          path: [
                                                                                 { tag: 'value',
                                                                                   value: { value: _descriptor_0.toValue(adminDid_0),
                                                                                            alignment: _descriptor_0.alignment() } }] } },
                                                                 { popeq: { cached: false,
                                                                            result: undefined } }]).value);
    __compactRuntime.assert(isTrusted_0, 'Not authorized to register issuers');
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(2n),
                                                alignment: _descriptor_7.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(2n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(issuerDid_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(true),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _recordCredential_0(context,
                      partialProofData,
                      subjectDid_0,
                      issuerDid_0,
                      role_0,
                      expiryTimestamp_0)
  {
    const dSubjectDid_0 = subjectDid_0;
    const dIssuerDid_0 = issuerDid_0;
    const isTrusted_0 = _descriptor_1.fromValue(Contract._query(context,
                                                                partialProofData,
                                                                [
                                                                 { dup: { n: 0 } },
                                                                 { idx: { cached: false,
                                                                          pushPath: false,
                                                                          path: [
                                                                                 { tag: 'value',
                                                                                   value: { value: _descriptor_7.toValue(2n),
                                                                                            alignment: _descriptor_7.alignment() } },
                                                                                 { tag: 'value',
                                                                                   value: { value: _descriptor_7.toValue(2n),
                                                                                            alignment: _descriptor_7.alignment() } }] } },
                                                                 { idx: { cached: false,
                                                                          pushPath: false,
                                                                          path: [
                                                                                 { tag: 'value',
                                                                                   value: { value: _descriptor_0.toValue(dIssuerDid_0),
                                                                                            alignment: _descriptor_0.alignment() } }] } },
                                                                 { popeq: { cached: false,
                                                                            result: undefined } }]).value);
    __compactRuntime.assert(isTrusted_0, 'Issuer not trusted');
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(13n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(dSubjectDid_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(dIssuerDid_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(2n),
                                                alignment: _descriptor_7.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(0n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(dSubjectDid_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(role_0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(14n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(dSubjectDid_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(expiryTimestamp_0),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(2n),
                                                alignment: _descriptor_7.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(dSubjectDid_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(true),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _hasValidCredential_0(context,
                        partialProofData,
                        subjectDid_0,
                        currentTimestamp_0)
  {
    const dSubjectDid_0 = subjectDid_0;
    const dCurrentTimestamp_0 = currentTimestamp_0;
    const valid_0 = _descriptor_1.fromValue(Contract._query(context,
                                                            partialProofData,
                                                            [
                                                             { dup: { n: 0 } },
                                                             { idx: { cached: false,
                                                                      pushPath: false,
                                                                      path: [
                                                                             { tag: 'value',
                                                                               value: { value: _descriptor_7.toValue(2n),
                                                                                        alignment: _descriptor_7.alignment() } },
                                                                             { tag: 'value',
                                                                               value: { value: _descriptor_7.toValue(1n),
                                                                                        alignment: _descriptor_7.alignment() } }] } },
                                                             { idx: { cached: false,
                                                                      pushPath: false,
                                                                      path: [
                                                                             { tag: 'value',
                                                                               value: { value: _descriptor_0.toValue(dSubjectDid_0),
                                                                                        alignment: _descriptor_0.alignment() } }] } },
                                                             { popeq: { cached: false,
                                                                        result: undefined } }]).value);
    const expiry_0 = _descriptor_3.fromValue(Contract._query(context,
                                                             partialProofData,
                                                             [
                                                              { dup: { n: 0 } },
                                                              { idx: { cached: false,
                                                                       pushPath: false,
                                                                       path: [
                                                                              { tag: 'value',
                                                                                value: { value: _descriptor_7.toValue(1n),
                                                                                         alignment: _descriptor_7.alignment() } },
                                                                              { tag: 'value',
                                                                                value: { value: _descriptor_7.toValue(14n),
                                                                                         alignment: _descriptor_7.alignment() } }] } },
                                                              { idx: { cached: false,
                                                                       pushPath: false,
                                                                       path: [
                                                                              { tag: 'value',
                                                                                value: { value: _descriptor_0.toValue(dSubjectDid_0),
                                                                                         alignment: _descriptor_0.alignment() } }] } },
                                                              { popeq: { cached: false,
                                                                         result: undefined } }]).value);
    return valid_0 && expiry_0 > dCurrentTimestamp_0;
  }
  _getCredentialRole_0(context, partialProofData, subjectDid_0) {
    const dSubjectDid_0 = subjectDid_0;
    return _descriptor_2.fromValue(Contract._query(context,
                                                   partialProofData,
                                                   [
                                                    { dup: { n: 0 } },
                                                    { idx: { cached: false,
                                                             pushPath: false,
                                                             path: [
                                                                    { tag: 'value',
                                                                      value: { value: _descriptor_7.toValue(2n),
                                                                               alignment: _descriptor_7.alignment() } },
                                                                    { tag: 'value',
                                                                      value: { value: _descriptor_7.toValue(0n),
                                                                               alignment: _descriptor_7.alignment() } }] } },
                                                    { idx: { cached: false,
                                                             pushPath: false,
                                                             path: [
                                                                    { tag: 'value',
                                                                      value: { value: _descriptor_0.toValue(dSubjectDid_0),
                                                                               alignment: _descriptor_0.alignment() } }] } },
                                                    { popeq: { cached: false,
                                                               result: undefined } }]).value);
  }
  _revokeCredential_0(context, partialProofData, subjectDid_0, issuerDid_0) {
    const dSubjectDid_0 = subjectDid_0;
    const dIssuerDid_0 = issuerDid_0;
    const storedIssuer_0 = _descriptor_0.fromValue(Contract._query(context,
                                                                   partialProofData,
                                                                   [
                                                                    { dup: { n: 0 } },
                                                                    { idx: { cached: false,
                                                                             pushPath: false,
                                                                             path: [
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_7.toValue(1n),
                                                                                               alignment: _descriptor_7.alignment() } },
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_7.toValue(13n),
                                                                                               alignment: _descriptor_7.alignment() } }] } },
                                                                    { idx: { cached: false,
                                                                             pushPath: false,
                                                                             path: [
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_0.toValue(dSubjectDid_0),
                                                                                               alignment: _descriptor_0.alignment() } }] } },
                                                                    { popeq: { cached: false,
                                                                               result: undefined } }]).value);
    __compactRuntime.assert(this._equal_6(storedIssuer_0, dIssuerDid_0),
                            'Only issuer can revoke');
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(2n),
                                                alignment: _descriptor_7.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(dSubjectDid_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(false),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _recordProofInternal_0(context,
                         partialProofData,
                         proofId_0,
                         proofType_0,
                         proverDid_0,
                         recipientDid_0,
                         expiryTimestamp_0,
                         currentTimestamp_0)
  {
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(2n),
                                                alignment: _descriptor_7.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(3n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(proofId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(proofType_0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(2n),
                                                alignment: _descriptor_7.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(4n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(proofId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(true),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(2n),
                                                alignment: _descriptor_7.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(5n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(proofId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(proverDid_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(2n),
                                                alignment: _descriptor_7.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(6n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(proofId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(recipientDid_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(2n),
                                                alignment: _descriptor_7.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(7n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(proofId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(expiryTimestamp_0),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(2n),
                                                alignment: _descriptor_7.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(8n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(proofId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(currentTimestamp_0),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    const indexKey_0 = this._persistentHash_0([recipientDid_0, proofId_0]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(2n),
                                                alignment: _descriptor_7.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(9n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(indexKey_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(true),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _recordProofForRecipient_0(context,
                             partialProofData,
                             proofId_0,
                             proofType_0,
                             proverDid_0,
                             recipientDid_0,
                             currentTimestamp_0,
                             expiryTimestamp_0)
  {
    this._recordProofInternal_0(context,
                                partialProofData,
                                proofId_0,
                                proofType_0,
                                proverDid_0,
                                recipientDid_0,
                                expiryTimestamp_0,
                                currentTimestamp_0);
    return [];
  }
  _proveAgeOver_0(birthTimestamp_0, currentTimestamp_0, minAge_0) {
    let t_0;
    const ageSeconds_0 = (t_0 = currentTimestamp_0,
                          (__compactRuntime.assert(!(t_0 < birthTimestamp_0),
                                                   'result of subtraction would be negative'),
                           t_0 - birthTimestamp_0));
    return ageSeconds_0 >= minAge_0;
  }
  _verifyAndRecordAge_0(context,
                        partialProofData,
                        birthTimestamp_0,
                        currentTimestamp_0,
                        minAge_0,
                        proofId_0,
                        proverDid_0,
                        recipientDid_0,
                        expiryTimestamp_0,
                        proofType_0)
  {
    let t_0;
    const ageSeconds_0 = (t_0 = currentTimestamp_0,
                          (__compactRuntime.assert(!(t_0 < birthTimestamp_0),
                                                   'result of subtraction would be negative'),
                           t_0 - birthTimestamp_0));
    __compactRuntime.assert(ageSeconds_0 >= minAge_0, 'Underage');
    this._recordProofInternal_0(context,
                                partialProofData,
                                proofId_0,
                                proofType_0,
                                proverDid_0,
                                recipientDid_0,
                                expiryTimestamp_0,
                                currentTimestamp_0);
    return [];
  }
  _proveResidenceIn_0(countryCodeHash_0,
                      allowedCountry1_0,
                      allowedCountry2_0,
                      allowedCountry3_0)
  {
    const target_0 = countryCodeHash_0;
    return this._equal_7(target_0, allowedCountry1_0)
           ||
           this._equal_8(target_0, allowedCountry2_0)
           ||
           this._equal_9(target_0, allowedCountry3_0);
  }
  _verifyAndRecordResidence_0(context,
                              partialProofData,
                              countryCodeHash_0,
                              allowedCountry1_0,
                              allowedCountry2_0,
                              allowedCountry3_0,
                              proofId_0,
                              proverDid_0,
                              recipientDid_0,
                              expiryTimestamp_0,
                              currentTimestamp_0,
                              proofType_0)
  {
    const target_0 = countryCodeHash_0;
    __compactRuntime.assert(this._equal_10(target_0, allowedCountry1_0)
                            ||
                            this._equal_11(target_0, allowedCountry2_0)
                            ||
                            this._equal_12(target_0, allowedCountry3_0),
                            'Residence not allowed');
    this._recordProofInternal_0(context,
                                partialProofData,
                                proofId_0,
                                proofType_0,
                                proverDid_0,
                                recipientDid_0,
                                expiryTimestamp_0,
                                currentTimestamp_0);
    return [];
  }
  _proveLocationVisit_0(userLat_0,
                        userLon_0,
                        targetLat_0,
                        targetLon_0,
                        maxRadius_0)
  {
    const dLatPos_0 = userLat_0 >= targetLat_0;
    let t_0, t_1;
    const dLatAbs_0 = dLatPos_0 ?
                      (t_0 = targetLat_0,
                       (__compactRuntime.assert(!(userLat_0 < t_0),
                                                'result of subtraction would be negative'),
                        userLat_0 - t_0))
                      :
                      (t_1 = targetLat_0,
                       (__compactRuntime.assert(!(t_1 < userLat_0),
                                                'result of subtraction would be negative'),
                        t_1 - userLat_0));
    const dLonPos_0 = userLon_0 >= targetLon_0;
    let t_2, t_3;
    const dLonAbs_0 = dLonPos_0 ?
                      (t_2 = targetLon_0,
                       (__compactRuntime.assert(!(userLon_0 < t_2),
                                                'result of subtraction would be negative'),
                        userLon_0 - t_2))
                      :
                      (t_3 = targetLon_0,
                       (__compactRuntime.assert(!(t_3 < userLon_0),
                                                'result of subtraction would be negative'),
                        t_3 - userLon_0));
    const distSquared_0 = dLatAbs_0 * dLatAbs_0 + dLonAbs_0 * dLonAbs_0;
    return distSquared_0 <= maxRadius_0;
  }
  _verifyAndRecordLocationVisit_0(context,
                                  partialProofData,
                                  userLat_0,
                                  userLon_0,
                                  targetLat_0,
                                  targetLon_0,
                                  maxRadius_0,
                                  proofId_0,
                                  proverDid_0,
                                  recipientDid_0,
                                  expiryTimestamp_0,
                                  currentTimestamp_0,
                                  proofType_0)
  {
    const dLatPos_0 = userLat_0 >= targetLat_0;
    let t_0, t_1;
    const dLatAbs_0 = dLatPos_0 ?
                      (t_0 = targetLat_0,
                       (__compactRuntime.assert(!(userLat_0 < t_0),
                                                'result of subtraction would be negative'),
                        userLat_0 - t_0))
                      :
                      (t_1 = targetLat_0,
                       (__compactRuntime.assert(!(t_1 < userLat_0),
                                                'result of subtraction would be negative'),
                        t_1 - userLat_0));
    const dLonPos_0 = userLon_0 >= targetLon_0;
    let t_2, t_3;
    const dLonAbs_0 = dLonPos_0 ?
                      (t_2 = targetLon_0,
                       (__compactRuntime.assert(!(userLon_0 < t_2),
                                                'result of subtraction would be negative'),
                        userLon_0 - t_2))
                      :
                      (t_3 = targetLon_0,
                       (__compactRuntime.assert(!(t_3 < userLon_0),
                                                'result of subtraction would be negative'),
                        t_3 - userLon_0));
    const distSquared_0 = dLatAbs_0 * dLatAbs_0 + dLonAbs_0 * dLonAbs_0;
    __compactRuntime.assert(distSquared_0 <= maxRadius_0, 'Not within radius');
    this._recordProofInternal_0(context,
                                partialProofData,
                                proofId_0,
                                proofType_0,
                                proverDid_0,
                                recipientDid_0,
                                expiryTimestamp_0,
                                currentTimestamp_0);
    return [];
  }
  _proveDataOwnership_0(dataSecret_0, expectedHash_0) {
    const computedHash_0 = this._persistentHash_1(dataSecret_0);
    return this._equal_13(computedHash_0, expectedHash_0);
  }
  _verifyAndRecordDataOwnership_0(context,
                                  partialProofData,
                                  dataSecret_0,
                                  expectedHash_0,
                                  proofId_0,
                                  proverDid_0,
                                  recipientDid_0,
                                  expiryTimestamp_0,
                                  currentTimestamp_0,
                                  proofType_0)
  {
    const computedHash_0 = this._persistentHash_1(dataSecret_0);
    __compactRuntime.assert(this._equal_14(computedHash_0, expectedHash_0),
                            'Invalid ownership proof');
    this._recordProofInternal_0(context,
                                partialProofData,
                                proofId_0,
                                proofType_0,
                                proverDid_0,
                                recipientDid_0,
                                expiryTimestamp_0,
                                currentTimestamp_0);
    return [];
  }
  _verifyAndRecordCredential_0(context,
                               partialProofData,
                               credentialSecret_0,
                               expectedHash_0,
                               proofId_0,
                               proverDid_0,
                               recipientDid_0,
                               expiryTimestamp_0,
                               currentTimestamp_0,
                               proofType_0)
  {
    __compactRuntime.assert(this._equal_15(this._persistentHash_1(credentialSecret_0),
                                           expectedHash_0),
                            'Invalid credential secret');
    this._recordProofInternal_0(context,
                                partialProofData,
                                proofId_0,
                                proofType_0,
                                proverDid_0,
                                recipientDid_0,
                                expiryTimestamp_0,
                                currentTimestamp_0);
    return [];
  }
  _isProofValid_0(context, partialProofData, proofId_0) {
    const valid_0 = _descriptor_1.fromValue(Contract._query(context,
                                                            partialProofData,
                                                            [
                                                             { dup: { n: 0 } },
                                                             { idx: { cached: false,
                                                                      pushPath: false,
                                                                      path: [
                                                                             { tag: 'value',
                                                                               value: { value: _descriptor_7.toValue(2n),
                                                                                        alignment: _descriptor_7.alignment() } },
                                                                             { tag: 'value',
                                                                               value: { value: _descriptor_7.toValue(4n),
                                                                                        alignment: _descriptor_7.alignment() } }] } },
                                                             { idx: { cached: false,
                                                                      pushPath: false,
                                                                      path: [
                                                                             { tag: 'value',
                                                                               value: { value: _descriptor_0.toValue(proofId_0),
                                                                                        alignment: _descriptor_0.alignment() } }] } },
                                                             { popeq: { cached: false,
                                                                        result: undefined } }]).value);
    return valid_0;
  }
  _isProofForRecipient_0(context, partialProofData, proofId_0, recipientDid_0) {
    const storedRecipient_0 = _descriptor_0.fromValue(Contract._query(context,
                                                                      partialProofData,
                                                                      [
                                                                       { dup: { n: 0 } },
                                                                       { idx: { cached: false,
                                                                                pushPath: false,
                                                                                path: [
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_7.toValue(2n),
                                                                                                  alignment: _descriptor_7.alignment() } },
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_7.toValue(6n),
                                                                                                  alignment: _descriptor_7.alignment() } }] } },
                                                                       { idx: { cached: false,
                                                                                pushPath: false,
                                                                                path: [
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_0.toValue(proofId_0),
                                                                                                  alignment: _descriptor_0.alignment() } }] } },
                                                                       { popeq: { cached: false,
                                                                                  result: undefined } }]).value);
    return this._equal_16(storedRecipient_0, recipientDid_0);
  }
  _invalidateProof_0(context, partialProofData, proofId_0, proverDid_0) {
    const storedProver_0 = _descriptor_0.fromValue(Contract._query(context,
                                                                   partialProofData,
                                                                   [
                                                                    { dup: { n: 0 } },
                                                                    { idx: { cached: false,
                                                                             pushPath: false,
                                                                             path: [
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_7.toValue(2n),
                                                                                               alignment: _descriptor_7.alignment() } },
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_7.toValue(5n),
                                                                                               alignment: _descriptor_7.alignment() } }] } },
                                                                    { idx: { cached: false,
                                                                             pushPath: false,
                                                                             path: [
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_0.toValue(proofId_0),
                                                                                               alignment: _descriptor_0.alignment() } }] } },
                                                                    { popeq: { cached: false,
                                                                               result: undefined } }]).value);
    __compactRuntime.assert(this._equal_17(storedProver_0, proverDid_0),
                            'Not the prover');
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(2n),
                                                alignment: _descriptor_7.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(4n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(proofId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(false),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _isValidCommitment_0(context, partialProofData, dataId_0) {
    const dDataId_0 = dataId_0;
    const revoked_0 = _descriptor_1.fromValue(Contract._query(context,
                                                              partialProofData,
                                                              [
                                                               { dup: { n: 0 } },
                                                               { idx: { cached: false,
                                                                        pushPath: false,
                                                                        path: [
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_7.toValue(1n),
                                                                                          alignment: _descriptor_7.alignment() } },
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_7.toValue(0n),
                                                                                          alignment: _descriptor_7.alignment() } }] } },
                                                               { idx: { cached: false,
                                                                        pushPath: false,
                                                                        path: [
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_0.toValue(dDataId_0),
                                                                                          alignment: _descriptor_0.alignment() } }] } },
                                                               { popeq: { cached: false,
                                                                          result: undefined } }]).value);
    return !revoked_0;
  }
  _createP2PSession_0(context,
                      partialProofData,
                      sessionId_0,
                      senderDid_0,
                      recipientDid_0,
                      encryptedOffer_0)
  {
    const dSessionId_0 = sessionId_0;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(2n),
                                                alignment: _descriptor_7.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(10n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(dSessionId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(encryptedOffer_0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(2n),
                                                alignment: _descriptor_7.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(12n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(dSessionId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(senderDid_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(2n),
                                                alignment: _descriptor_7.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(13n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(dSessionId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(recipientDid_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(2n),
                                                alignment: _descriptor_7.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(14n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(dSessionId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(true),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _answerP2PSession_0(context,
                      partialProofData,
                      sessionId_0,
                      recipientDid_0,
                      encryptedAnswer_0)
  {
    const dSessionId_0 = sessionId_0;
    const storedRecipient_0 = _descriptor_0.fromValue(Contract._query(context,
                                                                      partialProofData,
                                                                      [
                                                                       { dup: { n: 0 } },
                                                                       { idx: { cached: false,
                                                                                pushPath: false,
                                                                                path: [
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_7.toValue(2n),
                                                                                                  alignment: _descriptor_7.alignment() } },
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_7.toValue(13n),
                                                                                                  alignment: _descriptor_7.alignment() } }] } },
                                                                       { idx: { cached: false,
                                                                                pushPath: false,
                                                                                path: [
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_0.toValue(dSessionId_0),
                                                                                                  alignment: _descriptor_0.alignment() } }] } },
                                                                       { popeq: { cached: false,
                                                                                  result: undefined } }]).value);
    __compactRuntime.assert(this._equal_18(storedRecipient_0, recipientDid_0),
                            'Not the intended recipient');
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(2n),
                                                alignment: _descriptor_7.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(11n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(dSessionId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(encryptedAnswer_0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _closeP2PSession_0(context, partialProofData, sessionId_0, ownerDid_0) {
    const dSessionId_0 = sessionId_0;
    const storedOwner_0 = _descriptor_0.fromValue(Contract._query(context,
                                                                  partialProofData,
                                                                  [
                                                                   { dup: { n: 0 } },
                                                                   { idx: { cached: false,
                                                                            pushPath: false,
                                                                            path: [
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_7.toValue(2n),
                                                                                              alignment: _descriptor_7.alignment() } },
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_7.toValue(12n),
                                                                                              alignment: _descriptor_7.alignment() } }] } },
                                                                   { idx: { cached: false,
                                                                            pushPath: false,
                                                                            path: [
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_0.toValue(dSessionId_0),
                                                                                              alignment: _descriptor_0.alignment() } }] } },
                                                                   { popeq: { cached: false,
                                                                              result: undefined } }]).value);
    __compactRuntime.assert(this._equal_19(storedOwner_0, ownerDid_0),
                            'Not the session owner');
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(2n),
                                                alignment: _descriptor_7.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(14n),
                                                alignment: _descriptor_7.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(dSessionId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(false),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _hasP2PAnswer_0(context, partialProofData, sessionId_0) {
    const dSessionId_0 = sessionId_0;
    const active_0 = _descriptor_1.fromValue(Contract._query(context,
                                                             partialProofData,
                                                             [
                                                              { dup: { n: 0 } },
                                                              { idx: { cached: false,
                                                                       pushPath: false,
                                                                       path: [
                                                                              { tag: 'value',
                                                                                value: { value: _descriptor_7.toValue(2n),
                                                                                         alignment: _descriptor_7.alignment() } },
                                                                              { tag: 'value',
                                                                                value: { value: _descriptor_7.toValue(14n),
                                                                                         alignment: _descriptor_7.alignment() } }] } },
                                                              { idx: { cached: false,
                                                                       pushPath: false,
                                                                       path: [
                                                                              { tag: 'value',
                                                                                value: { value: _descriptor_0.toValue(dSessionId_0),
                                                                                         alignment: _descriptor_0.alignment() } }] } },
                                                              { popeq: { cached: false,
                                                                         result: undefined } }]).value);
    return active_0;
  }
  _computeAuthCommitment_0(secret_0) {
    return this._persistentHash_1(secret_0);
  }
  _equal_0(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_1(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_2(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_3(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_4(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_5(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_6(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_7(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_8(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_9(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_10(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_11(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_12(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_13(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_14(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_15(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_16(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_17(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_18(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_19(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  static _query(context, partialProofData, prog) {
    var res;
    try {
      res = context.transactionContext.query(prog, __compactRuntime.CostModel.dummyCostModel());
    } catch (err) {
      throw new __compactRuntime.CompactError(err.toString());
    }
    context.transactionContext = res.context;
    var reads = res.events.filter((e) => e.tag === 'read');
    var i = 0;
    partialProofData.publicTranscript = partialProofData.publicTranscript.concat(prog.map((op) => {
      if(typeof(op) === 'object' && 'popeq' in op) {
        return { popeq: {
          ...op.popeq,
          result: reads[i++].content,
        } };
      } else {
        return op;
      }
    }));
    if(res.events.length == 1 && res.events[0].tag === 'read') {
      return res.events[0].content;
    } else {
      return res.events;
    }
  }
}
function ledger(state) {
  const context = {
    originalState: state,
    transactionContext: new __compactRuntime.QueryContext(state, __compactRuntime.dummyContractAddress())
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: undefined,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
    commitments: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(0n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(0n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(0n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(0n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'privacy-bridge.compact line 22 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(0n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(0n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'privacy-bridge.compact line 22 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_0.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(0n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(0n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_0.toValue(key_0),
                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[0].asArray()[0];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_0.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    commitmentOwner: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(0n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(0n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'privacy-bridge.compact line 23 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(0n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'privacy-bridge.compact line 23 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_0.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(0n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_0.toValue(key_0),
                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[0].asArray()[1];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_0.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    commitmentRecipient: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(0n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(0n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'privacy-bridge.compact line 24 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(0n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'privacy-bridge.compact line 24 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_0.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(0n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_0.toValue(key_0),
                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[0].asArray()[2];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_0.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    commitmentRevoked: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(0n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(0n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'privacy-bridge.compact line 25 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(0n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'privacy-bridge.compact line 25 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(0n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_0.toValue(key_0),
                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[0];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_1.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    encryptedData: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'privacy-bridge.compact line 28 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'privacy-bridge.compact line 28 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_0.toValue(key_0),
                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[1];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_2.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    encryptedDataOwner: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'privacy-bridge.compact line 29 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'privacy-bridge.compact line 29 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_0.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_0.toValue(key_0),
                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[2];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_0.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    encryptedDataCategory: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(3n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(3n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'privacy-bridge.compact line 30 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(3n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'privacy-bridge.compact line 30 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(3n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_0.toValue(key_0),
                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[3];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_2.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    encryptedDataAuthCommitment: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(4n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(4n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'privacy-bridge.compact line 31 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(4n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'privacy-bridge.compact line 31 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_0.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(4n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_0.toValue(key_0),
                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[4];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_0.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    ownerPubKey: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(5n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(5n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'privacy-bridge.compact line 34 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(5n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'privacy-bridge.compact line 34 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_0.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(5n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_0.toValue(key_0),
                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[5];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_0.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    recipientPubKey: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(6n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(6n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'privacy-bridge.compact line 35 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(6n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'privacy-bridge.compact line 35 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_0.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(6n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_0.toValue(key_0),
                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[6];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_0.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    encryptionNonce: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(7n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(7n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'privacy-bridge.compact line 36 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(7n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'privacy-bridge.compact line 36 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_6.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(7n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_0.toValue(key_0),
                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[7];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_6.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    sharingMode: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(8n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(8n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'privacy-bridge.compact line 37 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(8n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'privacy-bridge.compact line 37 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(8n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_0.toValue(key_0),
                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[8];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_2.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    accessGranted: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(9n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(9n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'privacy-bridge.compact line 40 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(9n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'privacy-bridge.compact line 40 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(9n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_0.toValue(key_0),
                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[9];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_1.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    disclosureMetadata: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(10n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(10n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'privacy-bridge.compact line 43 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(10n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'privacy-bridge.compact line 43 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(10n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_0.toValue(key_0),
                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[10];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_2.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    encryptionKeys: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(11n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(11n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'privacy-bridge.compact line 44 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(11n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'privacy-bridge.compact line 44 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(11n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_0.toValue(key_0),
                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[11];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_2.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    identityCommitments: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(12n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(12n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'privacy-bridge.compact line 52 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(12n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'privacy-bridge.compact line 52 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_0.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(12n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_0.toValue(key_0),
                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[12];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_0.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    credentialIssuer: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(13n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(13n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'privacy-bridge.compact line 63 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(13n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'privacy-bridge.compact line 63 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_0.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(13n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_0.toValue(key_0),
                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[13];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_0.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    credentialExpiry: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(14n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(14n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'privacy-bridge.compact line 64 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(14n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'privacy-bridge.compact line 64 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(14n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_0.toValue(key_0),
                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[14];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_3.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    credentialRole: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(0n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(0n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'privacy-bridge.compact line 65 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(0n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'privacy-bridge.compact line 65 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(0n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_0.toValue(key_0),
                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2].asArray()[0];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_2.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    credentialValid: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'privacy-bridge.compact line 66 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'privacy-bridge.compact line 66 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_0.toValue(key_0),
                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2].asArray()[1];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_1.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    trustedIssuers: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'privacy-bridge.compact line 69 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'privacy-bridge.compact line 69 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_0.toValue(key_0),
                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2].asArray()[2];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_1.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    proofRecords: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(3n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(3n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'privacy-bridge.compact line 77 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(3n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'privacy-bridge.compact line 77 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(3n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_0.toValue(key_0),
                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2].asArray()[3];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_2.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    proofValid: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(4n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(4n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'privacy-bridge.compact line 78 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(4n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'privacy-bridge.compact line 78 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(4n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_0.toValue(key_0),
                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2].asArray()[4];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_1.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    proofProver: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(5n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(5n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'privacy-bridge.compact line 79 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(5n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'privacy-bridge.compact line 79 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_0.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(5n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_0.toValue(key_0),
                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2].asArray()[5];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_0.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    proofRecipient: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(6n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(6n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'privacy-bridge.compact line 80 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(6n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'privacy-bridge.compact line 80 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_0.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(6n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_0.toValue(key_0),
                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2].asArray()[6];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_0.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    proofExpiry: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(7n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(7n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'privacy-bridge.compact line 81 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(7n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'privacy-bridge.compact line 81 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(7n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_0.toValue(key_0),
                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2].asArray()[7];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_3.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    proofCreated: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(8n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(8n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'privacy-bridge.compact line 82 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(8n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'privacy-bridge.compact line 82 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(8n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_0.toValue(key_0),
                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2].asArray()[8];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_3.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    recipientProofIndex: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(9n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(9n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'privacy-bridge.compact line 85 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(9n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'privacy-bridge.compact line 85 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(9n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_0.toValue(key_0),
                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2].asArray()[9];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_1.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    p2pSessions: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(10n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(10n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'privacy-bridge.compact line 554 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(10n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'privacy-bridge.compact line 554 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(10n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_0.toValue(key_0),
                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2].asArray()[10];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_2.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    p2pAnswers: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(11n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(11n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'privacy-bridge.compact line 555 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(11n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'privacy-bridge.compact line 555 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(11n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_0.toValue(key_0),
                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2].asArray()[11];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_2.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    p2pSessionOwner: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(12n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(12n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'privacy-bridge.compact line 556 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(12n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'privacy-bridge.compact line 556 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_0.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(12n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_0.toValue(key_0),
                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2].asArray()[12];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_0.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    p2pSessionRecipient: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(13n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(13n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'privacy-bridge.compact line 557 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(13n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'privacy-bridge.compact line 557 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_0.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(13n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_0.toValue(key_0),
                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2].asArray()[13];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_0.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    p2pSessionActive: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(14n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(14n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'privacy-bridge.compact line 558 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(14n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'privacy-bridge.compact line 558 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(2n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(14n),
                                                                                   alignment: _descriptor_7.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_0.toValue(key_0),
                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2].asArray()[14];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_1.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    }
  };
}
const _emptyContext = {
  originalState: new __compactRuntime.ContractState(),
  transactionContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress())
};
const _dummyContract = new Contract({ });
const pureCircuits = {
  proveAgeOver: (...args_0) => {
    if (args_0.length !== 3) {
      throw new __compactRuntime.CompactError(`proveAgeOver: expected 3 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const birthTimestamp_0 = args_0[0];
    const currentTimestamp_0 = args_0[1];
    const minAge_0 = args_0[2];
    if (!(typeof(birthTimestamp_0) === 'bigint' && birthTimestamp_0 >= 0n && birthTimestamp_0 <= 18446744073709551615n)) {
      __compactRuntime.type_error('proveAgeOver',
                                  'argument 1',
                                  'privacy-bridge.compact line 360 char 1',
                                  'Uint<0..18446744073709551615>',
                                  birthTimestamp_0)
    }
    if (!(typeof(currentTimestamp_0) === 'bigint' && currentTimestamp_0 >= 0n && currentTimestamp_0 <= 18446744073709551615n)) {
      __compactRuntime.type_error('proveAgeOver',
                                  'argument 2',
                                  'privacy-bridge.compact line 360 char 1',
                                  'Uint<0..18446744073709551615>',
                                  currentTimestamp_0)
    }
    if (!(typeof(minAge_0) === 'bigint' && minAge_0 >= 0n && minAge_0 <= 18446744073709551615n)) {
      __compactRuntime.type_error('proveAgeOver',
                                  'argument 3',
                                  'privacy-bridge.compact line 360 char 1',
                                  'Uint<0..18446744073709551615>',
                                  minAge_0)
    }
    return _dummyContract._proveAgeOver_0(birthTimestamp_0,
                                          currentTimestamp_0,
                                          minAge_0);
  },
  proveResidenceIn: (...args_0) => {
    if (args_0.length !== 4) {
      throw new __compactRuntime.CompactError(`proveResidenceIn: expected 4 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const countryCodeHash_0 = args_0[0];
    const allowedCountry1_0 = args_0[1];
    const allowedCountry2_0 = args_0[2];
    const allowedCountry3_0 = args_0[3];
    if (!(countryCodeHash_0.buffer instanceof ArrayBuffer && countryCodeHash_0.BYTES_PER_ELEMENT === 1 && countryCodeHash_0.length === 32)) {
      __compactRuntime.type_error('proveResidenceIn',
                                  'argument 1',
                                  'privacy-bridge.compact line 386 char 1',
                                  'Bytes<32>',
                                  countryCodeHash_0)
    }
    if (!(allowedCountry1_0.buffer instanceof ArrayBuffer && allowedCountry1_0.BYTES_PER_ELEMENT === 1 && allowedCountry1_0.length === 32)) {
      __compactRuntime.type_error('proveResidenceIn',
                                  'argument 2',
                                  'privacy-bridge.compact line 386 char 1',
                                  'Bytes<32>',
                                  allowedCountry1_0)
    }
    if (!(allowedCountry2_0.buffer instanceof ArrayBuffer && allowedCountry2_0.BYTES_PER_ELEMENT === 1 && allowedCountry2_0.length === 32)) {
      __compactRuntime.type_error('proveResidenceIn',
                                  'argument 3',
                                  'privacy-bridge.compact line 386 char 1',
                                  'Bytes<32>',
                                  allowedCountry2_0)
    }
    if (!(allowedCountry3_0.buffer instanceof ArrayBuffer && allowedCountry3_0.BYTES_PER_ELEMENT === 1 && allowedCountry3_0.length === 32)) {
      __compactRuntime.type_error('proveResidenceIn',
                                  'argument 4',
                                  'privacy-bridge.compact line 386 char 1',
                                  'Bytes<32>',
                                  allowedCountry3_0)
    }
    return _dummyContract._proveResidenceIn_0(countryCodeHash_0,
                                              allowedCountry1_0,
                                              allowedCountry2_0,
                                              allowedCountry3_0);
  },
  proveLocationVisit: (...args_0) => {
    if (args_0.length !== 5) {
      throw new __compactRuntime.CompactError(`proveLocationVisit: expected 5 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const userLat_0 = args_0[0];
    const userLon_0 = args_0[1];
    const targetLat_0 = args_0[2];
    const targetLon_0 = args_0[3];
    const maxRadius_0 = args_0[4];
    if (!(typeof(userLat_0) === 'bigint' && userLat_0 >= 0n && userLat_0 <= 18446744073709551615n)) {
      __compactRuntime.type_error('proveLocationVisit',
                                  'argument 1',
                                  'privacy-bridge.compact line 419 char 1',
                                  'Uint<0..18446744073709551615>',
                                  userLat_0)
    }
    if (!(typeof(userLon_0) === 'bigint' && userLon_0 >= 0n && userLon_0 <= 18446744073709551615n)) {
      __compactRuntime.type_error('proveLocationVisit',
                                  'argument 2',
                                  'privacy-bridge.compact line 419 char 1',
                                  'Uint<0..18446744073709551615>',
                                  userLon_0)
    }
    if (!(typeof(targetLat_0) === 'bigint' && targetLat_0 >= 0n && targetLat_0 <= 18446744073709551615n)) {
      __compactRuntime.type_error('proveLocationVisit',
                                  'argument 3',
                                  'privacy-bridge.compact line 419 char 1',
                                  'Uint<0..18446744073709551615>',
                                  targetLat_0)
    }
    if (!(typeof(targetLon_0) === 'bigint' && targetLon_0 >= 0n && targetLon_0 <= 18446744073709551615n)) {
      __compactRuntime.type_error('proveLocationVisit',
                                  'argument 4',
                                  'privacy-bridge.compact line 419 char 1',
                                  'Uint<0..18446744073709551615>',
                                  targetLon_0)
    }
    if (!(typeof(maxRadius_0) === 'bigint' && maxRadius_0 >= 0n && maxRadius_0 <= 18446744073709551615n)) {
      __compactRuntime.type_error('proveLocationVisit',
                                  'argument 5',
                                  'privacy-bridge.compact line 419 char 1',
                                  'Uint<0..18446744073709551615>',
                                  maxRadius_0)
    }
    return _dummyContract._proveLocationVisit_0(userLat_0,
                                                userLon_0,
                                                targetLat_0,
                                                targetLon_0,
                                                maxRadius_0);
  },
  proveDataOwnership: (...args_0) => {
    if (args_0.length !== 2) {
      throw new __compactRuntime.CompactError(`proveDataOwnership: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const dataSecret_0 = args_0[0];
    const expectedHash_0 = args_0[1];
    if (!(dataSecret_0.buffer instanceof ArrayBuffer && dataSecret_0.BYTES_PER_ELEMENT === 1 && dataSecret_0.length === 32)) {
      __compactRuntime.type_error('proveDataOwnership',
                                  'argument 1',
                                  'privacy-bridge.compact line 466 char 1',
                                  'Bytes<32>',
                                  dataSecret_0)
    }
    if (!(expectedHash_0.buffer instanceof ArrayBuffer && expectedHash_0.BYTES_PER_ELEMENT === 1 && expectedHash_0.length === 32)) {
      __compactRuntime.type_error('proveDataOwnership',
                                  'argument 2',
                                  'privacy-bridge.compact line 466 char 1',
                                  'Bytes<32>',
                                  expectedHash_0)
    }
    return _dummyContract._proveDataOwnership_0(dataSecret_0, expectedHash_0);
  },
  computeAuthCommitment: (...args_0) => {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`computeAuthCommitment: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const secret_0 = args_0[0];
    if (!(secret_0.buffer instanceof ArrayBuffer && secret_0.BYTES_PER_ELEMENT === 1 && secret_0.length === 32)) {
      __compactRuntime.type_error('computeAuthCommitment',
                                  'argument 1',
                                  'privacy-bridge.compact line 609 char 1',
                                  'Bytes<32>',
                                  secret_0)
    }
    return _dummyContract._computeAuthCommitment_0(secret_0);
  }
};
const contractReferenceLocations = { tag: 'publicLedgerArray', indices: { } };
exports.Contract = Contract;
exports.ledger = ledger;
exports.pureCircuits = pureCircuits;
exports.contractReferenceLocations = contractReferenceLocations;
//# sourceMappingURL=index.cjs.map
