import {
  getAgentStateAddress,
  createStateAddress,
  ConsenSourceNamespaces,
} from 'services/addressing';
import { createSigner, createNewPrivateKey } from 'services/crypto';
import {
  CertificateRegistryPayload,
  Organization,
  Factory,
} from 'services/protobuf/compiledProtos';
import { TransactionHeader } from 'sawtooth-sdk/protobuf';
import { ACTIONS } from 'services/protobuf/transaction';
import { createOrgTransaction } from 'services/protobuf/organization';

describe('Organization Protobuf', () => {
  describe('createOrgTransaction()', () => {
    const id = 'test';

    const org = {
      id,
      organization_type: Organization.Type.FACTORY,
      contacts: [new Organization.Contact()],
      address: new Factory.Address(),
      name: 'test',
    };

    const signer = createSigner(createNewPrivateKey());

    const orgAddress = createStateAddress(
      ConsenSourceNamespaces.ORGANIZATION,
      id,
    );

    const agentAddress = getAgentStateAddress(signer);

    it('creates a new CreateOrganizationAction and wraps it in a transaction', () => {
      const txn = createOrgTransaction(org, signer);

      const payload = CertificateRegistryPayload.decode(txn.payload);
      const { inputs, outputs } = TransactionHeader.decode(txn.header);

      expect(payload.action).toBe(ACTIONS.CREATE_ORGANIZATION);
      expect(inputs).toEqual([orgAddress, agentAddress]);
      expect(outputs).toEqual([orgAddress, agentAddress]);
    });
  });
});
