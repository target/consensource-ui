import { Transaction, TransactionHeader } from 'sawtooth-sdk/protobuf';
import { FAMILY_NAME, FAMILY_VERSION } from 'services/addressing';
import {
  createSigner,
  createNewPrivateKey,
  cryptoContext,
  hash,
  HashingAlgorithms,
} from 'services/crypto';
import { createAgentStateAddress } from '../agent';
import { getTransactionIds, createTransaction } from '../transaction';

describe('Transaction Protobuf', () => {
  describe('getTransactionIds()', () => {
    it('returns an array of transaction ids, where each ID is the `headerSignature` of the transaction', () => {
      const headerSignatures = ['1', '2'];
      const txns = [
        Transaction.create({ headerSignature: headerSignatures[0] }),
        Transaction.create({ headerSignature: headerSignatures[1] }),
      ];

      expect(getTransactionIds(txns)).toEqual(headerSignatures);
    });
  });

  describe('createTransaction()', () => {
    const signer = createSigner(createNewPrivateKey());
    const pubKey = signer.getPublicKey();
    const payload = 'test-payloadBytes';
    const addresses = [createAgentStateAddress(signer)];

    const mockTransactionPayload = {
      payloadBytes: Buffer.from(payload),
      inputs: addresses,
      outputs: addresses,
    };

    const transactionHeaderBytes = {
      familyName: FAMILY_NAME,
      familyVersion: FAMILY_VERSION,
      inputs: mockTransactionPayload.inputs,
      outputs: mockTransactionPayload.outputs,
      signerPublicKey: pubKey.asHex(),
      batcherPublicKey: pubKey.asHex(),
      dependencies: [],
      payloadSha512: hash(payload, HashingAlgorithms.sha512),
    };

    it('returns a transaction whose payload has been serialized and signed', () => {
      const txn = createTransaction(mockTransactionPayload, signer);

      // Validate `header`
      const header = TransactionHeader.decode(txn.header);
      expect(header).toEqual(transactionHeaderBytes);

      // Validate `headerSignature`
      const signature = signer.sign(txn.header as Buffer);
      expect(
        cryptoContext.verify(signature, txn.header as Buffer, pubKey),
      ).toBe(true);
      expect(txn.headerSignature).toEqual(signature);

      // Validate transaction `payload`
      expect(txn.payload).toEqual(mockTransactionPayload.payloadBytes);
    });
  });
});
