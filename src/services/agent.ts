import * as addressing from 'services/addressing';
import TransactionService from 'services/transaction';
import { CertificateRegistryPayload, CreateAgentAction } from 'protobuf';

class AgentService {
    createAgentTransaction = (
        name: string,
        signer: sawtooth.signing.Signer,
    ): sawtooth.protobuf.Transaction => {
        if (!signer) {
            throw new Error('A signer must be provided');
        }

        const createAgent = CreateAgentAction.create({
            name,
            timestamp: Math.round(Date.now() / 1000),
        });

        const payloadBytes = CertificateRegistryPayload.encode({
            action: CertificateRegistryPayload.Action.CREATE_AGENT,
            createAgent,
        }).finish();

        const agentAddress = addressing.makeAgentAddress(
            signer.getPublicKey().asHex(),
        );
        return TransactionService.createTransaction(
            {
                payloadBytes,
                inputs: [agentAddress],
                outputs: [agentAddress],
            },
            signer,
        );
    };

    createAgent = (
        name: string,
        signer: sawtooth.signing.Signer,
    ): Promise<any> => {
        return TransactionService.submitBatch(
            [this.createAgentTransaction(name, signer)],
            signer,
        );
    };
}

export default new AgentService();
