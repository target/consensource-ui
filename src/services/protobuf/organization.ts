import {
  ConsenSourceNamespaces,
  createStateAddress,
} from 'services/addressing';
import { getAgentStateAddress } from 'services/protobuf/agent';
import { CreateOrganizationAction } from 'services/protobuf/compiledProtos';
import {
  createTransaction,
  PayloadInfo,
  encodePayload,
  ACTIONS,
} from 'services/protobuf/transaction';

/**
 * Interface to define the required properties for an org transaction,
 * since protobuf defaults to all fields as optional.
 *
 * Note that an address is not required - we only enforce this on factories.
 */
export interface CreateOrgAction extends ICreateOrganizationAction {
  id: string;
  organization_type: Organization.Type;
  contacts: Organization.IContact[];
  name: string;
}

export function getOrgStateAddress(id: string) {
  return createStateAddress(ConsenSourceNamespaces.ORGANIZATION, id);
}

export function createOrgAction(org: ICreateOrganizationAction) {
  return CreateOrganizationAction.create(org);
}

export function createOrgContact(contact: Organization.IContact) {
  return Organization.Contact.create(contact);
}

export function createFactoryAddress(address: Factory.IAddress) {
  return Factory.Address.create(address);
}

export function createOrgTransaction(
  create_organization: CreateOrgAction,
  signer: sawtooth.signing.Signer,
): sawtooth.protobuf.Transaction {
  const payload: ICertificateRegistryPayload = {
    action: ACTIONS.CREATE_ORGANIZATION,
    create_organization,
  };
  const payloadBytes = encodePayload(payload);

  const orgStateAddress = getOrgStateAddress(create_organization.id);
  const agentStateAddress = getAgentStateAddress(signer);

  const payloadInfo: PayloadInfo = {
    payloadBytes,
    inputs: [orgStateAddress, agentStateAddress],
    outputs: [orgStateAddress, agentStateAddress],
  };

  return createTransaction(payloadInfo, signer);
}
