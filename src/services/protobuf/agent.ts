import { createAgentStateAddress } from 'services/addressing';
import { getUnixTimeSec } from 'utils';
import { createTransaction } from './transaction';
import { CreateAgentAction, ICreateAgentAction } from './compiled';
import { PayloadInfo, ACTIONS, encodePayload } from './utils';

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
  const action = { ...agent, timestamp: getUnixTimeSec() };
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
  const addresses = [createAgentStateAddress(signer)];

  const payloadInfo: PayloadInfo = {
    inputs: addresses,
    outputs: addresses,
    payloadBytes: encodePayload({
      action: ACTIONS.CREATE_AGENT,
      create_agent,
    }),
  };

  return createTransaction(payloadInfo, signer);
}
