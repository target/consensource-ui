import * as addressing from 'services/addressing';
import * as transactionService from 'services/transaction';
import { CertificateRegistryPayload, CreateAgentAction } from 'protobuf';
import axios from 'axios';

export const loadAgents = (): Promise<any> => axios.get('/api/agents');

export const fetchAgent = (public_key: string): Promise<any> =>
    axios.get(`/api/agents/${public_key}`);

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

    const agentAddress = addressing.makeAgentAddress(
        signer.getPublicKey().asHex(),
    );
    return transactionService.createTransaction(
        {
            payloadBytes,
            inputs: [agentAddress],
            outputs: [agentAddress],
        },
        signer,
    );
};

export const createAgent = (
    name: string,
    signer: sawtooth.signing.Signer,
): Promise<any> =>
    transactionService.submitBatch(
        [createAgentTransaction(name, signer)],
        signer,
    );
