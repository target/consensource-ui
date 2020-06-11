import { hash, HashingAlgorithms, getSignerPubKeyHex } from 'services/crypto';

export const FAMILY_NAMESPACE_LEN = 6;
export const ADDRESS_PREFIX_LEN = 10;
export const ADDRESS_LEN = 70;

export const FAMILY_NAME = 'consensource';
export const FAMILY_VERSION = '0.1';
export const FAMILY_NAMESPACE = hash(
  FAMILY_NAME,
  HashingAlgorithms.sha256,
).substring(0, FAMILY_NAMESPACE_LEN); // 3d0111

// Buffer between family namespace prefix and transaction namespace prefix
export const RESERVED_NAMESPACE = '00';

/**
 * Address prefixes for the object types in ConsenSource
 * https://target.github.io/consensource-docs/docs/developer/txn-processor/#addressing
 */
export enum ConsenSourceNamespaces {
  AGENT = '00',
  CERTIFICATE = '01',
  ORGANIZATION = '02',
  STANDARD = '03',
  CERTIFICATE_REQUEST = '04',
  ASSERTION = '05',
}

/**
 * Construct a 70 char address generated from the transaction data
 * https://target.github.io/consensource-docs/docs/developer/txn-processor/#addressing
 */
export function createStateAddress(
  TXN_NAMESPACE: ConsenSourceNamespaces,
  data: string,
) {
  const prefix = FAMILY_NAMESPACE + RESERVED_NAMESPACE + TXN_NAMESPACE;
  const hashedData = hash(data, HashingAlgorithms.sha256).substring(
    0,
    ADDRESS_LEN - ADDRESS_PREFIX_LEN,
  );

  return prefix + hashedData;
}

/**
 * Helper function to get the agent address from the public key of a signer.
 */
export function getAgentStateAddress(signer: sawtooth.signing.Signer) {
  return createStateAddress(
    ConsenSourceNamespaces.AGENT,
    getSignerPubKeyHex(signer),
  );
}
