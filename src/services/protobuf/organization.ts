import {
  ConsenSourceNamespaces,
  createStateAddress,
  getAgentStateAddress,
} from 'services/addressing';
import { CreateOrganizationAction } from 'services/protobuf/compiledProtos';
import {
  createTransaction,
  PayloadInfo,
  encodePayload,
  ACTIONS,
} from 'services/protobuf/transaction';

/**
 * Interface to define the minimum required properties for
 * an `ICreateOrganizationAction` since protobuf defaults to
 * all fields as optional.
 *
 * Note that an address is not required - we only enforce this on factories.
 */
export interface CreateOrgActionStrict extends ICreateOrganizationAction {
  id: NonNullable<ICreateOrganizationAction['id']>;
  organization_type: NonNullable<
    ICreateOrganizationAction['organization_type']
  >;
  contacts: NonNullable<ICreateOrganizationAction['contacts']>;
  name: NonNullable<ICreateOrganizationAction['name']>;
}

export function createOrgAction(org: CreateOrgActionStrict) {
  return CreateOrganizationAction.create(org);
}

export function createOrgContact(contact: Organization.IContact) {
  return Organization.Contact.create(contact);
}

export function createFactoryAddress(address: Factory.IAddress) {
  return Factory.Address.create(address);
}

export function createOrgTransaction(
  create_organization: CreateOrganizationAction,
  signer: sawtooth.signing.Signer,
): sawtooth.protobuf.Transaction {
  const payload: ICertificateRegistryPayload = {
    action: ACTIONS.CREATE_ORGANIZATION,
    create_organization,
  };
  const payloadBytes = encodePayload(payload);

  const orgStateAddress = createStateAddress(
    ConsenSourceNamespaces.ORGANIZATION,
    create_organization.id,
  );

  const agentStateAddress = getAgentStateAddress(signer);

  const payloadInfo: PayloadInfo = {
    payloadBytes,
    inputs: [orgStateAddress, agentStateAddress],
    outputs: [orgStateAddress, agentStateAddress],
  };

  return createTransaction(payloadInfo, signer);
}
