import {
  ConsenSourceNamespaces,
  createStateAddress,
  createAgentStateAddress,
} from 'services/addressing';
import { IssueCertificateAction, IIssueCertificateAction } from './compiled';
import { createTransaction } from './transaction';
import { encodePayload, PayloadInfo, ACTIONS } from './utils';

/**
 * Interface to define the minimum required properties for an `IIssueCertificateAction`,
 * since protobuf defaults to all fields as optional.
 */
export interface IIssueCertActionStrict extends IIssueCertificateAction {
  request_id: NonNullable<IIssueCertificateAction['request_id']>;
  id: NonNullable<IIssueCertificateAction['id']>;
  valid_from: NonNullable<IIssueCertificateAction['valid_from']>;
  valid_to: NonNullable<IIssueCertificateAction['valid_to']>;
  source: NonNullable<IIssueCertificateAction['source']>;

  // `factory_id` is not actually required on the TP, but
  // because it is always needed when constructing txn input
  // addresses, we are requiring it here.
  factory_id: NonNullable<IIssueCertificateAction['factory_id']>;
}

/**
 * Enforce that an `IssueCertificateAction` has the minimum
 * required fields defined in `IIssueCertActionStrict`
 */
export type IssueCertActionStrict = IIssueCertActionStrict &
  IssueCertificateAction;

/**
 * Create a `IssueCertificateAction` that can be included
 * in a `CertificateRegistryPayload` transaction.
 */
export function createIssueCertAction(issuance: IIssueCertActionStrict) {
  return IssueCertificateAction.create(issuance);
}

/**
 * List of required input addresses for state objects
 * that are looked up during transaction validation:
 *   - The factory that is being granted the certificate
 *   - The agent that is issuing the certificate
 *   - The certificate request made by the factory
 *   - The certifying body that is granting the certificate
 *   - The certificate that is being created
 */
function getInputAddresses(
  { request_id, id, factory_id }: IssueCertActionStrict,
  cert_body_id: string,
  signer: sawtooth.signing.Signer,
) {
  const factory = createStateAddress(
    ConsenSourceNamespaces.ORGANIZATION,
    factory_id,
  );

  const agent = createAgentStateAddress(signer);

  const certRequest = createStateAddress(
    ConsenSourceNamespaces.CERTIFICATE_REQUEST,
    request_id,
  );

  const certBody = createStateAddress(
    ConsenSourceNamespaces.ORGANIZATION,
    cert_body_id,
  );

  const cert = createStateAddress(ConsenSourceNamespaces.CERTIFICATE, id);

  return [factory, agent, certRequest, certBody, cert];
}

/**
 * List of required output addresses for state obejcts
 * that are written to upon a successful transaction validation:
 *   - The certificate request (marked as complete)
 *   - The certificate (created)
 */
function getOutputAddresses({ request_id, id }: IssueCertificateAction) {
  const certRequest = createStateAddress(
    ConsenSourceNamespaces.CERTIFICATE_REQUEST,
    request_id,
  );

  const cert = createStateAddress(ConsenSourceNamespaces.CERTIFICATE, id);

  return [certRequest, cert];
}

/**
 * Creates a `CertificateRegistryPayload` transaction
 * containing a single `IssueCertificateAction` payload.
 */
export function createIssueCertTransaction(
  issue_certificate: IssueCertActionStrict,
  cert_body_id: string,
  signer: sawtooth.signing.Signer,
) {
  const payloadInfo: PayloadInfo = {
    inputs: getInputAddresses(issue_certificate, cert_body_id, signer),
    outputs: getOutputAddresses(issue_certificate),
    payloadBytes: encodePayload({
      action: ACTIONS.ISSUE_CERTIFICATE,
      issue_certificate,
    }),
  };

  return createTransaction(payloadInfo, signer);
}
