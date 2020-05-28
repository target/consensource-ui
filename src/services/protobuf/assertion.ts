import {
  ConsenSourceNamespaces,
  createStateAddress,
} from 'services/addressing';
import { AssertAction } from 'services/protobuf/compiledProtos';
import {
  createTransaction,
  PayloadInfo,
  encodePayload,
  ACTIONS,
} from 'services/protobuf/transaction';
import {
  getOrgStateAddress,
  CreateOrgAction,
} from 'services/protobuf/organization';
import { getAgentStateAddress } from 'services/protobuf/agent';

export interface CreateAssertionAction extends IAssertAction {
  assertion_id: string;
  new_factory?: {
    factory: CreateOrgAction;
  };
}

export function getAssertionStateAddress(assertion_id: string) {
  return createStateAddress(ConsenSourceNamespaces.ASSERTION, assertion_id);
}

export function createAssertionAction(assertion: CreateAssertionAction) {
  return AssertAction.create(assertion);
}

export function createAssertionActionTransaction(
  assert_action: CreateAssertionAction,
  signer: sawtooth.signing.Signer,
): sawtooth.protobuf.Transaction {
  const addresses = [];
  const payload: ICertificateRegistryPayload = {
    action: ACTIONS.ASSERT_ACTION,
    assert_action,
  };
  const payloadBytes = encodePayload(payload);

  addresses.push(getAgentStateAddress(signer));
  addresses.push(getAssertionStateAddress(assert_action.assertion_id));

  if (assert_action.new_factory) {
    addresses.push(getOrgStateAddress(assert_action.new_factory.factory.id));
  }

  const payloadInfo: PayloadInfo = {
    payloadBytes,
    inputs: addresses,
    outputs: addresses,
  };

  return createTransaction(payloadInfo, signer);
}
