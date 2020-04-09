import * as m from 'mithril';
import * as addressing from 'App/addressing';
import * as transactionService from 'App/services/transaction';
import { CertificateRegistryPayload, CreateAgentAction } from 'App/protobuf';

export const loadAgents = (): Promise<any> =>
    m.request({
        method: 'GET',
        url: '/api/agents',
    });

export const fetchAgent = (public_key: string): Promise<any> =>
    m.request({
        method: 'GET',
        url: `/api/agents/${public_key}`,
    });

export const createAgentTransaction = (
    name: string,
    signer: sawtooth.signing.Signer,
): sawtooth.protobuf.Transaction => {
    if (!signer) {
        throw new Error('A signer must be provided');
    }

    const createAgent = CreateAgentAction.create({
        name: name,
        timestamp: Math.round(Date.now() / 1000),
    });
    const payloadBytes = CertificateRegistryPayload.encode({
        action: CertificateRegistryPayload.Action.CREATE_AGENT,
        createAgent,
    }).finish();

    const agentAddress = addressing.makeAgentAddress(signer.getPublicKey().asHex());
    return transactionService.createTransaction(
        {
            payloadBytes,
            inputs: [agentAddress],
            outputs: [agentAddress],
        },
        signer,
    );
};

export const createAgent = (name: string, signer: sawtooth.signing.Signer): Promise<any> =>
    transactionService.submitBatch([createAgentTransaction(name, signer)], signer);
