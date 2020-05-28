import {
  ConsenSourceNamespaces,
  createStateAddress,
} from 'services/addressing';
import { CreateAgentAction } from 'services/protobuf/compiledProtos';
import {
  createTransaction,
  PayloadInfo,
  encodePayload,
  ACTIONS,
  getTxnTimestamp,
} from 'services/protobuf/transaction';
import { getSignerPubKeyHex } from 'services/crypto';

export function getAgentStateAddress(signer: sawtooth.signing.Signer) {
  return createStateAddress(
    ConsenSourceNamespaces.AGENT,
    getSignerPubKeyHex(signer),
  );
}

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
  const stateAddress = getAgentStateAddress(signer);

  const payloadInfo: PayloadInfo = {
    payloadBytes,
    inputs: [stateAddress],
    outputs: [stateAddress],
  };

  return createTransaction(payloadInfo, signer);
}
