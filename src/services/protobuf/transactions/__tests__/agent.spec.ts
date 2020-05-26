import createAgentTransaction, {
  getAgentStateAddress,
} from 'services/protobuf/transactions/agent';
import { createSigner, createNewPrivateKey } from 'services/crypto';
import { CertificateRegistryPayload } from 'services/protobuf';
import { TransactionHeader } from 'sawtooth-sdk/protobuf';
import { ACTIONS } from 'services/protobuf/transactions';

describe('Agent Protobuf', () => {
  describe('createAgentTransaction()', () => {
    const agent: IAgent = { name: 'test' };
    const signer = createSigner(createNewPrivateKey());

    it('creates a new CreateAgentAction and wraps it in a transaction', () => {
      const txn = createAgentTransaction(agent, signer);

      const payload = CertificateRegistryPayload.decode(txn.payload);
      const { inputs, outputs } = TransactionHeader.decode(txn.header);

      expect(payload.action).toBe(ACTIONS.CREATE_AGENT);
      expect(inputs).toEqual([getAgentStateAddress(signer)]);
      expect(outputs).toEqual([getAgentStateAddress(signer)]);
    });
  });
});
