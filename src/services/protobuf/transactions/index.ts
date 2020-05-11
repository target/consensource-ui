import { createHash } from 'crypto';
import { Transaction, TransactionHeader } from 'sawtooth-sdk/protobuf';
import { CertificateRegistryPayload } from 'services/protobuf';
import * as addressing from 'services/addressing';

export const ACTIONS = CertificateRegistryPayload.Action;

export interface PayloadInfo {
	payloadBytes: string | Buffer | NodeJS.TypedArray | DataView;
	inputs: string[];
	outputs: string[];
}

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
 * Encodes a CertificateRegistryPayload message
 * @param payload TODO: Create type
 */
export function encodePayload(payload: any): Uint8Array {
	return CertificateRegistryPayload.encode(payload).finish();
}

/**
 * Creates a serialized `TransactionHeader`, signs the message,
 * and creates a `Transaction` with the header, signature and payload
 */
export default function createTransaction(
	payloadInfo: PayloadInfo,
	signer: sawtooth.signing.Signer,
): sawtooth.protobuf.Transaction {
	const { payloadBytes, inputs, outputs } = payloadInfo;

	const pubkey = signer.getPublicKey().asHex();
	const payloadSha512 = createHash('sha512')
		.update(payloadBytes)
		.digest('hex');

	const transactionHeaderBytes = TransactionHeader.encode({
		familyName: addressing.familyName,
		familyVersion: addressing.familyVersion,
		inputs,
		outputs,
		signerPublicKey: pubkey,
		batcherPublicKey: pubkey,
		dependencies: [],
		payloadSha512,
	}).finish();

	const signature = signer.sign(transactionHeaderBytes as Buffer);

	return Transaction.create({
		header: transactionHeaderBytes,
		headerSignature: signature,
		payload: payloadBytes as Buffer,
	});
}
