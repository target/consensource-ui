import {
  CreateAgentAction,
  ICreateAgentAction,
  ICertificateRegistryPayload,
} from 'services/protobuf/compiled';
import {
  createTransaction,
  PayloadInfo,
  encodePayload,
  ACTIONS,
  getTxnTimestamp,
} from 'services/protobuf/transaction';
import { getAgentStateAddress } from 'services/addressing';

/**
 * Interface to define the minimum required properties for an `ICreateAgentAction`,
 * since protobuf defaults to all fields as optional.
 */
export interface ICreateAgentActionStrict extends ICreateAgentAction {
  name: NonNullable<ICreateAgentAction['name']>;
}

/**
 * Enforce that an `CreateAgentAction` has the minimum
 * required fields defined in `ICreateAgentActionStrict`
 */
export type CreateAgentActionStrict = ICreateAgentActionStrict &
  CreateAgentAction;

/**
 * Create a `CreateAgentAction` that can be included
 * in a `CertificateRegistryPayload` transaction.
 */
export function createAgentAction(agent: ICreateAgentActionStrict) {
  const action = { ...agent, timestamp: getTxnTimestamp() };
  return CreateAgentAction.create(action);
}

/**
 * Creates a `CertificateRegistryPayload` transaction
 * containing a single `CreateAgentAction` payload.
 */
export function createAgentTransaction(
  create_agent: CreateAgentActionStrict,
  signer: sawtooth.signing.Signer,
): sawtooth.protobuf.Transaction {
  const payload: ICertificateRegistryPayload = {
    action: ACTIONS.CREATE_AGENT,
    create_agent,
  };

  const payloadBytes = encodePayload(payload);
  const agentStateAddress = getAgentStateAddress(signer);

  const payloadInfo: PayloadInfo = {
    payloadBytes,
    inputs: [agentStateAddress],
    outputs: [agentStateAddress],
  };

  return createTransaction(payloadInfo, signer);
}
