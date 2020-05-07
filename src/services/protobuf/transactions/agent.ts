import { makeAgentAddress } from 'services/addressing';
import {
    CertificateRegistryPayload,
    CreateAgentAction,
} from 'services/protobuf';
import createTransaction, { PayloadInfo } from 'services/protobuf/transactions';

export interface AgentPayload {
    name: string;
}

export const CREATE_AGENT_ACTION =
    CertificateRegistryPayload.Action.CREATE_AGENT;

export default function createAgentTransaction(
    { name }: AgentPayload,
    signer: sawtooth.signing.Signer,
): sawtooth.protobuf.Transaction {
    const createAgent = CreateAgentAction.create({
        name,
        timestamp: Math.round(Date.now() / 1000),
    });

    const payloadBytes = CertificateRegistryPayload.encode({
        action: CREATE_AGENT_ACTION,
        createAgent,
    }).finish();

    const agentAddress = makeAgentAddress(signer);
    const payloadInfo: PayloadInfo = {
        payloadBytes,
        inputs: [agentAddress],
        outputs: [agentAddress],
    };

    return createTransaction(payloadInfo, signer);
}
