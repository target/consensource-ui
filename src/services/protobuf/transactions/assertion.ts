import {
  ConsenSourceNamespaces,
  createStateAddress,
} from 'services/addressing';
import { AssertAction } from 'services/protobuf';
import {
  createTransaction,
  PayloadInfo,
  encodePayload,
  ACTIONS,
} from 'services/protobuf/transactions';
import {
  getOrgStateAddress,
  CreateOrgAction,
} from 'services//protobuf/transactions/organization';

export interface CreateAssertionAction extends IAssertAction {
  assertion_id: string;
  new_factory?: {
    factory: CreateOrgAction;
  };
}

export function getAssertionStateAddress(assertion_id: string) {
  return createStateAddress(ConsenSourceNamespaces.ASSERTION, assertion_id);
}

export function createAssertion(assertion: CreateAssertionAction) {
  return AssertAction.create(assertion);
}

export function createAssertionTransaction(
  assert_action: CreateAssertionAction,
  signer: sawtooth.signing.Signer,
): sawtooth.protobuf.Transaction {
  const addresses = [];
  debugger;
  const payload: ICertificateRegistryPayload = {
    action: ACTIONS.ASSERT_ACTION,
    assert_action,
  };
  const payloadBytes = encodePayload(payload);

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
