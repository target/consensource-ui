import * as m from 'mithril';
import * as addressing from 'App/addressing';
import * as transactionService from 'App/services/transaction';
import { CertificateRegistryPayload, CreateAgentAction } from 'App/protobuf';

const loadAgents = () =>
    m.request({
        method: 'GET',
        url: '/api/agents',
    });

const fetchAgent = (public_key: string): Promise<any> =>
    m.request({
        method: 'GET',
        url: `/api/agents/${public_key}`,
    });

const createAgentTransaction = (name: string, signer: sawtooth.signing.Signer) => {
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

const createAgent = (name: string, signer: sawtooth.signing.Signer) =>
    transactionService.submitBatch([createAgentTransaction(name, signer)], signer);

module.exports = {
    createAgent,
    createAgentTransaction,
    loadAgents,
    fetchAgent,
};
