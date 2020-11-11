import { hash, HashingAlgorithms } from 'services/crypto';

export const FAMILY_NAMESPACE_LEN = 6;
export const ADDRESS_PREFIX_LEN = 10;
export const ADDRESS_LEN = 70;
export const HASHED_DATA_LEN = ADDRESS_LEN - ADDRESS_PREFIX_LEN;

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
 * Constructs a 10 char namespace prefix consisting of
 * `FAMILY_NAMESPACE + RESERVED_NAMESPACE + txnNamespace`.
 */
export function getNamespaceWithPrefix(txnNamespace: ConsenSourceNamespaces) {
  return FAMILY_NAMESPACE + RESERVED_NAMESPACE + txnNamespace;
}

/**
 * Constructs a 70 char address generated from the transaction data
 * https://target.github.io/consensource-docs/docs/developer/txn-processor/#addressing
 *
 * @param txnNamespace namespace address prefix
 * @param data arbitrary string data that is hashed to fill the address
 */
export function createStateAddress(
  txnNamespace: ConsenSourceNamespaces,
  data: string,
) {
  const namespace = getNamespaceWithPrefix(txnNamespace);
  const hashedData = hash(data, HashingAlgorithms.sha256).substring(
    0,
    HASHED_DATA_LEN,
  );

  return namespace + hashedData;
}
