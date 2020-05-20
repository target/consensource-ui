import { Batch, BatchHeader, BatchList } from 'sawtooth-sdk/protobuf';
import { getTransactionIds } from 'services/protobuf/transactions';

/**
 * Creates a serialized `BatchHeader`, signs the message,
 * and creates a `Batch` with the header, signature and transactions
 */
export default function createBatch(
  transactions: sawtooth.protobuf.Transaction[],
  signer: sawtooth.signing.Signer,
): Uint8Array {
  const transactionIds = getTransactionIds(transactions);
  const signerPublicKey = signer.getPublicKey().asHex();
  const batchHeaderBytes = BatchHeader.encode({
    signerPublicKey,
    transactionIds,
  }).finish();

  const signature = signer.sign(Buffer.from(batchHeaderBytes));

  const batch = Batch.create({
    header: batchHeaderBytes,
    headerSignature: signature,
    transactions,
  });

  const batchBytes = BatchList.encode({ batches: [batch] }).finish();

  return batchBytes;
}
