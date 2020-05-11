import { createHash } from 'crypto';
import { Transaction, TransactionHeader } from 'sawtooth-sdk/protobuf';
import { CertificateRegistryPayload } from 'services/protobuf';
import {
	FAMILY_NAME as familyName,
	FAMILY_VERSION as familyVersion,
} from 'services/addressing';

export interface PayloadInfo {
	payloadBytes: string | Buffer | NodeJS.TypedArray | DataView;
	inputs: string[];
	outputs: string[];
}

export const ACTIONS = CertificateRegistryPayload.Action;

/**
 * Create an array of transaction IDs, where each ID is the `headerSignature`
 * of the transaction
 */
export const getTransactionIds = (
	transactions: sawtooth.protobuf.Transaction[],
): string[] => {
	return transactions.map((transaction) => transaction.headerSignature);
};

/**
 * Encodes a CertificateRegistryPayload message
 * @param payload TODO: Create type
 */
export const encodePayload = (payload: any): Uint8Array => {
	return CertificateRegistryPayload.encode(payload).finish();
};

/**
 * Default timestamp logic for transactions.
 */
export const getTxnTimestamp = () => Math.round(Date.now() / 1000);

/**
 * Creates a serialized `TransactionHeader`, signs the message,
 * and creates a `Transaction` with the header, signature and payload
 */
export const createTransaction = (
	{ payloadBytes, inputs, outputs }: PayloadInfo,
	signer: sawtooth.signing.Signer,
): sawtooth.protobuf.Transaction => {
	const pubkey = signer.getPublicKey().asHex();
	const payloadSha512 = createHash('sha512')
		.update(payloadBytes)
		.digest('hex');

	const transactionHeaderBytes = TransactionHeader.encode({
		familyName,
		familyVersion,
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
};
