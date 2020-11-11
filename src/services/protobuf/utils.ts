import {
  CertificateRegistryPayload,
  ICertificateRegistryPayload,
} from './compiled';

export interface PayloadInfo {
  payloadBytes: string | Buffer | NodeJS.TypedArray | DataView;
  inputs: string[];
  outputs: string[];
}

export const ACTIONS = CertificateRegistryPayload.Action;

/**
 * Encodes a CertificateRegistryPayload message
 * @param message CertificateRegistryPayload message or plain object to encode
 */
export function encodePayload(
  payload: ICertificateRegistryPayload,
): Uint8Array {
  return CertificateRegistryPayload.encode(payload).finish();
}
