import {
  ConsenSourceNamespaces,
  createStateAddress,
} from 'services/addressing';
import { CreateAgentAction } from 'services/protobuf';
import {
  createTransaction,
  PayloadInfo,
  encodePayload,
  ACTIONS,
  getTxnTimestamp,
} from 'services/protobuf/transactions';

export function getAgentStateAddress(signer: sawtooth.signing.Signer) {
  const pubKey = signer.getPublicKey().asHex();
  return createStateAddress(ConsenSourceNamespaces.AGENT, pubKey);
}

export default function createAgentTransaction(
  { name }: consensource.ICreateAgentAction,
  signer: sawtooth.signing.Signer,
): sawtooth.protobuf.Transaction {
  const createAgent = new CreateAgentAction({
    name,
    timestamp: getTxnTimestamp(),
  });

  const payload = { action: ACTIONS.CREATE_AGENT, createAgent };
  const payloadBytes = encodePayload(payload);
  const agentStateAddress = getAgentStateAddress(signer);

  const payloadInfo: PayloadInfo = {
    payloadBytes,
    inputs: [agentStateAddress],
    outputs: [agentStateAddress],
  };

  return createTransaction(payloadInfo, signer);
}
