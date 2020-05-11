import { Namespaces, makeAddress } from 'services/addressing';
import { CreateAgentAction } from 'services/protobuf';
import {
	createTransaction,
	PayloadInfo,
	encodePayload,
	ACTIONS,
	getTxnTimestamp,
} from 'services/protobuf/transactions';

export interface AgentPayload {
	name: string;
}

export const getAgentAddress = (signer: sawtooth.signing.Signer) => {
	const pubKey = signer.getPublicKey().asHex();
	return makeAddress(Namespaces.AGENT, pubKey);
};

export const createAgentTransaction = (
	{ name }: AgentPayload,
	signer: sawtooth.signing.Signer,
): sawtooth.protobuf.Transaction => {
	const createAgent = CreateAgentAction.create({
		name,
		timestamp: getTxnTimestamp(),
	});

	const payload = { action: ACTIONS.CREATE_AGENT_ACTION, createAgent };
	const payloadBytes = encodePayload(payload);
	const agentAddress = getAgentAddress(signer);

	const payloadInfo: PayloadInfo = {
		payloadBytes,
		inputs: [agentAddress],
		outputs: [agentAddress],
	};

	return createTransaction(payloadInfo, signer);
};
