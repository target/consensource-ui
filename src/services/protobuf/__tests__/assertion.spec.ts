import { createSigner, createNewPrivateKey } from 'services/crypto';
import {
  createStateAddress,
  createAgentStateAddress,
  ConsenSourceNamespaces,
  FAMILY_NAMESPACE,
  RESERVED_NAMESPACE,
} from 'services/addressing';
import { TransactionHeader } from 'sawtooth-sdk/protobuf';
import * as AssertionService from '../assertion';
import { CertificateRegistryPayload, Organization, Factory } from '../compiled';
import { createOrgAction } from '../organization';
import { ACTIONS } from '../utils';

describe('Assertion Protobuf', () => {
  describe('createAssertionActionTransaction()', () => {
    const factory_id = 'test';
    const assert_action = AssertionService.createAssertionAction({
      assertion_id: 'test',
      new_factory: {
        factory: createOrgAction({
          id: factory_id,
          organization_type: Organization.Type.FACTORY,
          contacts: [new Organization.Contact()],
          address: new Factory.Address(),
          name: 'test',
        }),
      },
    }) as AssertionService.AssertActionStrict;

    const signer = createSigner(createNewPrivateKey());

    const agentAddress = createAgentStateAddress(signer);

    const assertionAddress = AssertionService.getAssertionStateAddress(
      assert_action.assertion_id,
    );

    const factoryAddress = createStateAddress(
      ConsenSourceNamespaces.ORGANIZATION,
      factory_id,
    );

    it('creates a new AssertAction and wraps it in a transaction', () => {
      const txn = AssertionService.createAssertionActionTransaction(
        assert_action,
        signer,
      );

      const payload = CertificateRegistryPayload.decode(txn.payload);
      const { inputs, outputs } = TransactionHeader.decode(txn.header);

      expect(payload.action).toBe(ACTIONS.ASSERT_ACTION);
      expect(inputs).toEqual([agentAddress, assertionAddress, factoryAddress]);
      expect(outputs).toEqual([agentAddress, assertionAddress, factoryAddress]);
    });
  });

  describe('createTransferAssertionActionTransaction()', () => {
    const transfer_action = AssertionService.createTransferAssertionAction({
      assertion_id: 'test',
      new_owner_public_key: 'test_pub_key',
    }) as AssertionService.TransferAssertionActionStrict;

    const signer = createSigner(createNewPrivateKey());

    const agentAddress = createAgentStateAddress(signer);

    const org_prefix =
      FAMILY_NAMESPACE +
      RESERVED_NAMESPACE +
      ConsenSourceNamespaces.ORGANIZATION;

    const cert_prefix =
      FAMILY_NAMESPACE +
      RESERVED_NAMESPACE +
      ConsenSourceNamespaces.CERTIFICATE;

    const standard_prefix =
      FAMILY_NAMESPACE + RESERVED_NAMESPACE + ConsenSourceNamespaces.STANDARD;

    const assertionAddress = AssertionService.getAssertionStateAddress(
      transfer_action.assertion_id,
    );

    it('creates a new AssertAction and wraps it in a transaction', () => {
      const txn = AssertionService.createTransferAssertionActionTransaction(
        transfer_action,
        signer,
      );

      const payload = CertificateRegistryPayload.decode(txn.payload);
      const { inputs, outputs } = TransactionHeader.decode(txn.header);

      expect(payload.action).toBe(ACTIONS.TRANSFER_ASSERTION);
      expect(inputs).toEqual([
        agentAddress,
        org_prefix,
        cert_prefix,
        standard_prefix,
        assertionAddress,
      ]);
      expect(outputs).toEqual([
        agentAddress,
        org_prefix,
        cert_prefix,
        standard_prefix,
        assertionAddress,
      ]);
    });
  });
});
