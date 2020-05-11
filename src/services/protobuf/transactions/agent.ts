import { makeAgentAddress } from 'services/addressing';
import { CreateAgentAction } from 'services/protobuf';
import createTransaction, {
	PayloadInfo,
	encodePayload,
	ACTIONS,
} from 'services/protobuf/transactions';

export interface AgentPayload {
	name: string;
}
export default function createAgentTransaction(
	{ name }: AgentPayload,
	signer: sawtooth.signing.Signer,
): sawtooth.protobuf.Transaction {
	const createAgent = CreateAgentAction.create({
		name,
		timestamp: Math.round(Date.now() / 1000),
	});

	const payload = { action: ACTIONS.CREATE_AGENT_ACTION, createAgent };
	const payloadBytes = encodePayload(payload);

	const agentAddress = makeAgentAddress(signer);
	const payloadInfo: PayloadInfo = {
		payloadBytes,
		inputs: [agentAddress],
		outputs: [agentAddress],
	};

	return createTransaction(payloadInfo, signer);
}
