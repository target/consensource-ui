import {
  createSigner,
  createNewPrivateKey,
  cryptoContext,
} from 'services/crypto';
import { Transaction, BatchHeader, BatchList } from 'sawtooth-sdk/protobuf';
import { createBatch } from '../batch';

describe('Batch Protobuf', () => {
  const signer = createSigner(createNewPrivateKey());

  const mockTransaction = Transaction.create({
    header: Buffer.from('test-header'),
    headerSignature: 'test-headerSignature',
    payload: Buffer.from('test-payload'),
  });

  describe('createBatch()', () => {
    it('creates a BatchList that contains a Batch with valid fields', () => {
      const encodedBatch = createBatch([mockTransaction], signer);

      const decodedBatchList = BatchList.decode(encodedBatch);
      const batch = decodedBatchList.batches[0];

      // Validate batch `header`
      expect(BatchHeader.decode(batch.header as Buffer)).toBeTruthy();

      // Validate batch `headerSignature`
      const signature = signer.sign(batch.header as Buffer);
      expect(
        cryptoContext.verify(
          signature,
          batch.header as Buffer,
          signer.getPublicKey(),
        ),
      ).toBe(true);
      expect(batch.headerSignature).toEqual(signature);

      // Validate batch `transactions`
      expect(batch.transactions).toEqual([mockTransaction]);
    });
  });
});
