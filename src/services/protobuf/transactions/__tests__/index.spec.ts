import {
  getTxnTimestamp,
  ACTIONS,
  encodePayload,
  getTransactionIds,
  createTransaction,
} from 'services/protobuf/transactions';
import { CertificateRegistryPayload } from 'services/protobuf';
import { Transaction, TransactionHeader } from 'sawtooth-sdk/protobuf';
import { FAMILY_NAME, FAMILY_VERSION } from 'services/addressing';
import {
  createSigner,
  createNewPrivateKey,
  cryptoContext,
} from 'services/crypto';
import { hash, HashingAlgorithms } from 'services/utils';
import { getAgentStateAddress } from '../agent';

describe('Transaction Protobuf', () => {
  describe('getTxnTimestamp', () => {
    let dateSpy: jest.SpyInstance;
    const now = 10000;

    beforeAll(() => {
      dateSpy = jest.spyOn(Date, 'now').mockImplementation(() => now);
    });

    afterAll(() => dateSpy.mockRestore());

    it('returns the date divided by 1000', () => {
      expect(getTxnTimestamp()).toBe(now / 1000);
    });
  });

  describe('encodePayload()', () => {
    it('encodes and returns a CertificateRegistryPayload', () => {
      const payload: consensource.ICertificateRegistryPayload = {
        action: ACTIONS.FACTORY,
      };

      const encoded = encodePayload(payload);
      const decoded = CertificateRegistryPayload.decode(encoded);

      expect(decoded).toEqual(payload);
    });
  });

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

    const mockTransactionPayload = {
      payloadBytes: Buffer.from(payload),
      inputs: [getAgentStateAddress(signer)],
      outputs: [getAgentStateAddress(signer)],
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
