import { Batch, BatchHeader, BatchList } from 'sawtooth-sdk/protobuf';
import { getSignerPubKeyHex } from 'services/crypto';
import { getTransactionIds } from './transaction';

/**
 * Creates a serialized `BatchHeader`, signs the message,
 * and creates a `BatchList` with the header, signature and transactions
 */
export function createBatch(
  transactions: sawtooth.protobuf.Transaction[],
  signer: sawtooth.signing.Signer,
): Uint8Array {
  const header = BatchHeader.encode({
    signerPublicKey: getSignerPubKeyHex(signer),
    transactionIds: getTransactionIds(transactions),
  }).finish();

  const headerSignature = signer.sign(Buffer.from(header));

  const batch = Batch.create({ header, headerSignature, transactions });
  const batchBytes = BatchList.encode({ batches: [batch] }).finish();

  return batchBytes;
}
