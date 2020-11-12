import { createSigner, createNewPrivateKey } from 'services/crypto';
import { TransactionHeader } from 'sawtooth-sdk/protobuf';
import {
  createAgentTransaction,
  createAgentAction,
  createAgentStateAddress,
} from '../agent';
import { CertificateRegistryPayload } from '../compiled';
import { ACTIONS } from '../utils';

describe('Agent Protobuf', () => {
  describe('createAgentTransaction()', () => {
    const agent_action = createAgentAction({ name: 'test' });
    const signer = createSigner(createNewPrivateKey());
    const addresses = [createAgentStateAddress(signer)];

    it('creates a new CreateAgentAction and wraps it in a transaction', () => {
      const txn = createAgentTransaction(agent_action, signer);

      const payload = CertificateRegistryPayload.decode(txn.payload);
      const { inputs, outputs } = TransactionHeader.decode(txn.header);

      expect(payload.action).toBe(ACTIONS.CREATE_AGENT);
      expect(inputs).toEqual(addresses);
      expect(outputs).toEqual(addresses);
    });
  });
});
