import {
  ConsenSourceNamespaces,
  createStateAddress,
  getAgentStateAddress,
} from 'services/addressing';
import { IssueCertificateAction } from 'services/protobuf/compiledProtos';
import {
  createTransaction,
  PayloadInfo,
  encodePayload,
  ACTIONS,
} from 'services/protobuf/transaction';

/**
 * Interface to define the minimum required properties for an `IIssueCertificateAction`,
 * since protobuf defaults to all fields as optional.
 */
export interface IssueCertActionStrict extends IIssueCertificateAction {
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

export function createIssueCertAction(issuance: IssueCertActionStrict) {
  return IssueCertificateAction.create(issuance);
}

export function getInputAddresses(
  { request_id, id, factory_id }: IssueCertificateAction,
  cert_body_id: string,
  signer: sawtooth.signing.Signer,
) {
  const factory = createStateAddress(
    ConsenSourceNamespaces.ORGANIZATION,
    factory_id,
  );

  const agent = getAgentStateAddress(signer);

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

export function getOutputAddresses({ request_id, id }: IssueCertificateAction) {
  const certRequest = createStateAddress(
    ConsenSourceNamespaces.CERTIFICATE_REQUEST,
    request_id,
  );

  const cert = createStateAddress(ConsenSourceNamespaces.CERTIFICATE, id);

  return [certRequest, cert];
}

export function issueCertificate(
  issue_certificate: IssueCertificateAction,
  cert_body_id: string,
  signer: sawtooth.signing.Signer,
) {
  const payload: ICertificateRegistryPayload = {
    action: ACTIONS.ISSUE_CERTIFICATE,
    issue_certificate,
  };

  const payloadBytes = encodePayload(payload);

  const inputAddresses = getInputAddresses(
    issue_certificate,
    cert_body_id,
    signer,
  );
  const outputAddresses = getOutputAddresses(issue_certificate);

  const payloadInfo: PayloadInfo = {
    payloadBytes,
    inputs: inputAddresses,
    outputs: outputAddresses,
  };

  return createTransaction(payloadInfo, signer);
}
