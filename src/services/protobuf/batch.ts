import { Batch, BatchHeader, BatchList } from 'sawtooth-sdk/protobuf';
import { getTransactionIds } from 'services/protobuf/transactions';

/**
 * Creates a serialized `BatchHeader`, signs the message,
 * and creates a `Batch` with the header, signature and transactions
 */
export function createBatch(
    transactions: sawtooth.protobuf.Transaction[],
    signer: sawtooth.signing.Signer,
): Uint8Array {
    const transactionIds = getTransactionIds(transactions);
    const publicKey = signer.getPublicKey().asHex();
    const batchHeaderBytes = BatchHeader.encode({
        signerPublicKey: publicKey,
        transactionIds,
    }).finish();

    const signature = signer.sign(Buffer.from(batchHeaderBytes));

    const batch = Batch.create({
        header: batchHeaderBytes,
        headerSignature: signature,
        transactions,
    });

    return BatchList.encode({ batches: [batch] }).finish();
}

// /**
//  * Create a `Transaction` with the payloadInfo and submit it in a `Batch`.
//  * @returns `Promise` that will resolve when the transactions have been committed.
//  */
// submitTransaction(
//     payloadInfo: PayloadInfo,
//     signer: sawtooth.signing.Signer,
// ): Promise<any> {
//     const transactions = [this.createTransaction(payloadInfo, signer)];
//     return this.submitBatch(transactions, signer);
// }
