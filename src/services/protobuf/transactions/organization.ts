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
  getTxnTimestamp,
} from 'services/protobuf/transactions';

export function getOrgStateAddress(id: string) {
  return createStateAddress(ConsenSourceNamespaces.ORGANIZATION, id);
}

/**
 * Interface to define the required properties for an org transaction,
 * since protobuf defaults to all fields as optional.L0
 *
 * Note that an address is not required - we only enforce this on factories.
 */
interface CreateOrgAction extends consensource.ICreateOrganizationAction {
  id: string;
  organization_type: consensource.Organization.Type;
  contacts: consensource.Organization.IContact[];
  name: string;
}

export default function createOrgTransaction(
  action: CreateOrgAction,
  signer: sawtooth.signing.Signer,
): sawtooth.protobuf.Transaction {
  const { id, organization_type, contacts, address, name } = action;

  const create_organization = new CreateOrganizationAction({
    id,
    organization_type,
    contacts,
    address,
    name,
    timestamp: getTxnTimestamp(),
  });

  const payload: consensource.ICertificateRegistryPayload = {
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
