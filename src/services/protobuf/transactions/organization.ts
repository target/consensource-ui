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
interface CreateOrgTxn {
  id: NonNullable<consensource.ICreateOrganizationAction['id']>;
  organizationType: NonNullable<
    consensource.ICreateOrganizationAction['organizationType']
  >;
  contacts: NonNullable<consensource.ICreateOrganizationAction['contacts']>;
  name: NonNullable<consensource.ICreateOrganizationAction['name']>;
}

export default function createOrgTransaction(
  action: consensource.ICreateOrganizationAction & CreateOrgTxn,
  signer: sawtooth.signing.Signer,
): sawtooth.protobuf.Transaction {
  const { id, organizationType, contacts, address, name } = action;

  const createOrganization = new CreateOrganizationAction({
    id,
    organizationType,
    contacts,
    address,
    name,
    timestamp: getTxnTimestamp(),
  });

  const payload = { action: ACTIONS.CREATE_ORGANIZATION, createOrganization };
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
