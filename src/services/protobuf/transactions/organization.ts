import {
  ConsenSourceNamespaces,
  createStateAddress,
} from 'services/addressing';
import { getAgentStateAddress } from 'services/protobuf/transactions/agent';
import { CreateOrganizationAction } from 'services/protobuf';
import {
  createTransaction,
  PayloadInfo,
  encodePayload,
  ACTIONS,
} from 'services/protobuf/transactions';

export function getOrgStateAddress(id: string) {
  return createStateAddress(ConsenSourceNamespaces.ORGANIZATION, id);
}

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

export function createOrg(org: CreateOrgAction) {
  return CreateOrganizationAction.create(org);
}

export default function createOrgTransaction(
  action: CreateOrgAction,
  signer: sawtooth.signing.Signer,
): sawtooth.protobuf.Transaction {
  const { id, organization_type, contacts, address, name } = action;

  const create_organization = CreateOrganizationAction.create({
    id,
    organization_type,
    contacts,
    address,
    name,
  });

  const payload: ICertificateRegistryPayload = {
    action: ACTIONS.CREATE_ORGANIZATION,
    create_organization,
  };
  const payloadBytes = encodePayload(payload);

  const orgStateAddress = getOrgStateAddress(id);
  const agentStateAddress = getAgentStateAddress(signer);

  const payloadInfo: PayloadInfo = {
    payloadBytes,
    inputs: [orgStateAddress, agentStateAddress],
    outputs: [orgStateAddress, agentStateAddress],
  };

  return createTransaction(payloadInfo, signer);
}
