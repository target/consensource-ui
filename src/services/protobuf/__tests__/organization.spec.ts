import { createAgentStateAddress, createOrgAddress } from 'services/addressing';
import { createSigner, createNewPrivateKey } from 'services/crypto';
import { TransactionHeader } from 'sawtooth-sdk/protobuf';
import { CertificateRegistryPayload, Organization, Factory } from '../compiled';
import { ACTIONS } from '../utils';
import {
  createOrgAction,
  createOrgTransaction,
  updateOrgAction,
  updateOrgTransaction,
} from '../organization';

describe('Organization Protobuf', () => {
  describe('createOrgTransaction()', () => {
    const id = 'test';

    const org = createOrgAction({
      id,
      organization_type: Organization.Type.FACTORY,
      contacts: [new Organization.Contact()],
      address: new Factory.Address(),
      name: 'test',
    });

    const signer = createSigner(createNewPrivateKey());

    const addresses = [createOrgAddress(id), createAgentStateAddress(signer)];

    it('creates a new CreateOrganizationAction and wraps it in a transaction', () => {
      const txn = createOrgTransaction(org, signer);

      const payload = CertificateRegistryPayload.decode(txn.payload);
      const { inputs, outputs } = TransactionHeader.decode(txn.header);

      expect(payload.action).toBe(ACTIONS.CREATE_ORGANIZATION);
      expect(inputs).toEqual(addresses);
      expect(outputs).toEqual(addresses);
    });
  });
  
  describe('updateOrgTransaction()', () => {
    const org = updateOrgAction({
      contacts: [new Organization.Contact()],
      address: new Factory.Address(),
    });

    const name = 'test';

    const signer = createSigner(createNewPrivateKey());

    const addresses = [createOrgAddress(name), createAgentStateAddress(signer)];

    it('creates a new UpdateOrganizationAction and wraps it in a transaction', () => {
      const txn = updateOrgTransaction(org, signer, name);

      const payload = CertificateRegistryPayload.decode(txn.payload);
      const { inputs, outputs } = TransactionHeader.decode(txn.header);

      expect(payload.action).toBe(ACTIONS.UPDATE_ORGANIZATION);
      expect(inputs).toEqual(addresses);
      expect(outputs).toEqual(addresses);
    });
  });
});
