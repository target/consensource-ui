import { CreateAgentAction } from 'services/protobuf/compiledProtos';
import {
  createTransaction,
  PayloadInfo,
  encodePayload,
  ACTIONS,
  getTxnTimestamp,
} from 'services/protobuf/transaction';
import { getAgentStateAddress } from 'services/addressing';

export function createAgentAction(agent: ICreateAgentAction) {
  const action = { ...agent, timestamp: getTxnTimestamp() };
  return CreateAgentAction.create(action);
}

export function createAgentTransaction(
  create_agent: CreateAgentAction,
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
