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
import { getSignerPubKeyHex } from 'services/crypto';

export function getAgentStateAddress(signer: sawtooth.signing.Signer) {
  return createStateAddress(
    ConsenSourceNamespaces.AGENT,
    getSignerPubKeyHex(signer),
  );
}

export default function createAgentTransaction(
  { name }: consensource.ICreateAgentAction,
  signer: sawtooth.signing.Signer,
): sawtooth.protobuf.Transaction {
  console.log(name);
  debugger;
  const createAgent = CreateAgentAction.create({
    name,
    timestamp: getTxnTimestamp(),
  });

  const payload = { action: ACTIONS.CREATE_AGENT, createAgent };
  const payloadBytes = encodePayload(payload);
  const stateAddress = getAgentStateAddress(signer);

  const payloadInfo: PayloadInfo = {
    payloadBytes,
    inputs: [stateAddress],
    outputs: [stateAddress],
  };

  return createTransaction(payloadInfo, signer);
}
