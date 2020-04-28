import * as addressing from 'services/addressing';
import TransactionService from 'services/transaction';
import { CertificateRegistryPayload, CreateAgentAction } from 'protobuf';

class AgentService {
    createAgentTransaction = (
        name: string,
        signer: sawtooth.signing.Signer,
    ): sawtooth.protobuf.Transaction => {
        const createAgent = CreateAgentAction.create({
            name,
            timestamp: Math.round(Date.now() / 1000),
        });

        const payloadBytes = CertificateRegistryPayload.encode({
            action: CertificateRegistryPayload.Action.CREATE_AGENT,
            createAgent,
        }).finish();

        const agentAddress = addressing.makeAgentAddress(signer);

        return TransactionService.createTransaction(
            {
                payloadBytes,
                inputs: [agentAddress],
                outputs: [agentAddress],
            },
            signer,
        );
    };

    createAgent = async (
        name: string,
        signer: sawtooth.signing.Signer,
    ): Promise<any> => {
        const agentTxn = await this.createAgentTransaction(name, signer);
        const batchRes = await TransactionService.submitBatch(
            [agentTxn],
            signer,
        );

        return batchRes;
    };
}

export default new AgentService();
