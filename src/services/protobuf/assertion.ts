import {
  ConsenSourceNamespaces,
  createStateAddress,
  getAgentStateAddress,
} from 'services/addressing';
import { AssertAction } from 'services/protobuf/compiledProtos';
import {
  createTransaction,
  PayloadInfo,
  encodePayload,
  ACTIONS,
} from 'services/protobuf/transaction';
import { CreateOrgActionStrict } from 'services/protobuf/organization';

export interface CreateAssertionAction extends IAssertAction {
  assertion_id: string;
  new_factory?: {
    factory: CreateOrgActionStrict;
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

  const { new_factory } = assert_action;

  if (new_factory) {
    const orgStateAddress = createStateAddress(
      ConsenSourceNamespaces.ORGANIZATION,
      new_factory.factory.id,
    );

    addresses.push(orgStateAddress);
  }

  const payloadInfo: PayloadInfo = {
    payloadBytes,
    inputs: addresses,
    outputs: addresses,
  };

  return createTransaction(payloadInfo, signer);
}
