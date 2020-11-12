import { createSigner, createNewPrivateKey } from 'services/crypto';
import {
  ConsenSourceNamespaces,
  getNamespaceWithPrefix,
} from 'services/addressing';
import { TransactionHeader } from 'sawtooth-sdk/protobuf';
import * as AssertionService from '../assertion';
import { CertificateRegistryPayload, Organization, Factory } from '../compiled';
import { createOrgAction, createOrgStateAddress } from '../organization';
import { ACTIONS } from '../utils';
import { createAgentStateAddress } from '../agent';

describe('Assertion Protobuf', () => {
  describe('createAssertionActionTransaction()', () => {
    const assert_action = AssertionService.createAssertionAction({
      assertion_id: 'test',
      new_factory: {
        factory: createOrgAction({
          organization_type: Organization.Type.FACTORY,
          contacts: [new Organization.Contact()],
          address: new Factory.Address(),
          name: 'test',
        }),
      },
    }) as AssertionService.AssertActionStrict;

    const signer = createSigner(createNewPrivateKey());

    const agentAddress = createAgentStateAddress(signer);

    const assertionAddress = AssertionService.createAssertionStateAddress(
      assert_action.assertion_id,
    );

    const factoryAddress = createOrgStateAddress(
      assert_action.new_factory!.factory!.id!,
    );

    const addresses = [agentAddress, assertionAddress, factoryAddress];

    it('creates a new AssertAction and wraps it in a transaction', () => {
      const txn = AssertionService.createAssertionActionTransaction(
        assert_action,
        signer,
      );

      const payload = CertificateRegistryPayload.decode(txn.payload);
      const { inputs, outputs } = TransactionHeader.decode(txn.header);

      expect(payload.action).toBe(ACTIONS.ASSERT_ACTION);
      expect(inputs).toEqual(addresses);
      expect(outputs).toEqual(addresses);
    });
  });

  describe('createTransferAssertionActionTransaction()', () => {
    const transfer_action = AssertionService.createTransferAssertionAction({
      assertion_id: 'test',
      new_owner_public_key: 'test_pub_key',
    }) as AssertionService.TransferAssertionActionStrict;

    const signer = createSigner(createNewPrivateKey());

    const addresses = [
      createAgentStateAddress(signer),
      AssertionService.createAssertionStateAddress(
        transfer_action.assertion_id,
      ),
      getNamespaceWithPrefix(ConsenSourceNamespaces.ORGANIZATION),
      getNamespaceWithPrefix(ConsenSourceNamespaces.CERTIFICATE),
      getNamespaceWithPrefix(ConsenSourceNamespaces.STANDARD),
    ];

    it('creates a new AssertAction and wraps it in a transaction', () => {
      const txn = AssertionService.createTransferAssertionActionTransaction(
        transfer_action,
        signer,
      );

      const payload = CertificateRegistryPayload.decode(txn.payload);
      const { inputs, outputs } = TransactionHeader.decode(txn.header);

      expect(payload.action).toBe(ACTIONS.TRANSFER_ASSERTION);
      expect(inputs).toEqual(addresses);
      expect(outputs).toEqual(addresses);
    });
  });
});
