import { hash, HashingAlgorithms, getSignerPubKeyHex } from 'services/crypto';
import { Transaction, TransactionHeader } from 'sawtooth-sdk/protobuf';
import {
  FAMILY_NAME as familyName,
  FAMILY_VERSION as familyVersion,
} from 'services/addressing';
import { PayloadInfo } from './utils';

/**
 * Create an array of transaction IDs, where each ID is the `headerSignature`
 * of the transaction
 */
export function getTransactionIds(
  transactions: sawtooth.protobuf.Transaction[],
): string[] {
  return transactions.map((transaction) => transaction.headerSignature);
}

/**
 * Creates a serialized `TransactionHeader`, signs the message,
 * and creates a `Transaction` with the header, signature and payload
 */
export function createTransaction(
  { payloadBytes, inputs, outputs }: PayloadInfo,
  signer: sawtooth.signing.Signer,
): sawtooth.protobuf.Transaction {
  const pubkey = getSignerPubKeyHex(signer);
  const payloadSha512 = hash(payloadBytes as string, HashingAlgorithms.sha512);

  const header = TransactionHeader.encode({
    familyName,
    familyVersion,
    inputs,
    outputs,
    signerPublicKey: pubkey,
    batcherPublicKey: pubkey,
    dependencies: [],
    payloadSha512,
  }).finish();

  const headerSignature = signer.sign(header as Buffer);

  return Transaction.create({
    header,
    headerSignature,
    payload: payloadBytes as Buffer,
  });
}
