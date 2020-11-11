import {
  ConsenSourceNamespaces,
  FAMILY_NAMESPACE,
  RESERVED_NAMESPACE,
  createStateAddress,
  createAgentStateAddress,
} from 'services/addressing';
import { CreateOrgActionStrict } from './organization';
import {
  AssertAction,
  TransferAssertionAction,
  IAssertAction,
  ITransferAssertionAction,
} from './compiled';
import { createTransaction } from './transaction';
import { PayloadInfo, ACTIONS, encodePayload } from './utils';

export interface IAssertActionStrict extends IAssertAction {
  assertion_id: NonNullable<IAssertAction['assertion_id']>;
  new_factory?: { factory: CreateOrgActionStrict };
}

export interface ITransferAssertionActionStrict
  extends ITransferAssertionAction {
  assertion_id: NonNullable<ITransferAssertionAction['assertion_id']>;
  new_owner_public_key: NonNullable<
    ITransferAssertionAction['new_owner_public_key']
  >;
}

/**
 * Enforce that an `AssertAction` has the minimum
 * required fields defined in `IAssertActionStrict`
 */
export type AssertActionStrict = IAssertActionStrict & AssertAction;

export function getAssertionStateAddress(
  assertion_id: AssertActionStrict['assertion_id'],
) {
  return createStateAddress(ConsenSourceNamespaces.ASSERTION, assertion_id);
}

export function createAssertionAction(assertion: IAssertActionStrict) {
  return AssertAction.create(assertion);
}

export function createAssertionActionTransaction(
  assert_action: AssertActionStrict,
  signer: sawtooth.signing.Signer,
): sawtooth.protobuf.Transaction {
  const addresses = [];

  addresses.push(createAgentStateAddress(signer));
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
    inputs: addresses,
    outputs: addresses,
    payloadBytes: encodePayload({
      action: ACTIONS.ASSERT_ACTION,
      assert_action,
    }),
  };

  return createTransaction(payloadInfo, signer);
}

/**
 * Enforce that an `TransferAssertionAction` has the minimum
 * required fields defined in `ITransferAssertionActionStrict`
 */
export type TransferAssertionActionStrict = ITransferAssertionActionStrict &
  TransferAssertionAction;

export function createTransferAssertionAction(
  transfer: ITransferAssertionActionStrict,
) {
  return TransferAssertionAction.create(transfer);
}

/**
 * List of required input/output addresses for possible state objects
 * that are looked up or written to during transaction validation:
 *   - The agent that is initiating the transfer
 *   - The organization prefix
 *   - The certificate prefix
 *   - The standard prefix
 *   - The certifying body that is granting the certificate
 *   - The assertion that is being transferred
 */
function getTransferAssertionAddresses(
  { assertion_id }: TransferAssertionActionStrict,
  signer: sawtooth.signing.Signer,
) {
  const agent = createAgentStateAddress(signer);

  const org_prefix =
    FAMILY_NAMESPACE + RESERVED_NAMESPACE + ConsenSourceNamespaces.ORGANIZATION;

  const cert_prefix =
    FAMILY_NAMESPACE + RESERVED_NAMESPACE + ConsenSourceNamespaces.CERTIFICATE;

  const standard_prefix =
    FAMILY_NAMESPACE + RESERVED_NAMESPACE + ConsenSourceNamespaces.STANDARD;

  const assertion = getAssertionStateAddress(assertion_id);

  return [agent, org_prefix, cert_prefix, standard_prefix, assertion];
}

export function createTransferAssertionActionTransaction(
  transfer_assertion_action: TransferAssertionActionStrict,
  signer: sawtooth.signing.Signer,
): sawtooth.protobuf.Transaction {
  const addresses = getTransferAssertionAddresses(
    transfer_assertion_action,
    signer,
  );

  const payloadInfo: PayloadInfo = {
    inputs: addresses,
    outputs: addresses,
    payloadBytes: encodePayload({
      action: ACTIONS.TRANSFER_ASSERTION,
      transfer_assertion_action,
    }),
  };

  return createTransaction(payloadInfo, signer);
}
