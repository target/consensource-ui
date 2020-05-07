import createAgentTransaction, {
    AgentPayload,
} from 'services/protobuf/transactions/agent';
import { createBatch } from './protobuf/batch';
import stores from 'stores';

export default function createAndSubmitAgent(
    payload: AgentPayload,
    signer: sawtooth.signing.Signer,
) {
    const txn = createAgentTransaction(payload, signer);
    const batchListBytes = createBatch([txn], signer);
    stores.batchStore.submitBatch(batchListBytes);
}
