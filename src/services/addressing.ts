import { hash, HashingAlgorithms } from 'services/utils';

const FAMILY_NAMESPACE_LEN = 6;
const ADDRESS_LEN = 70;

export const FAMILY_NAME = 'consensource';
export const FAMILY_VERSION = '0.1';
export const FAMILY_NAMESPACE = hash(
  FAMILY_NAME,
  HashingAlgorithms.sha256,
).substring(0, FAMILY_NAMESPACE_LEN); // 3d0111

// Buffer between family namespace prefix and transaction namespace prefix
const RESERVED_NAMESPACE = '00';

export enum Namespaces {
  AGENT = '00',
  CERTIFICATE = '01',
  ORGANIZATION = '02',
  STANDARD = '03',
  CERTIFICATE_REQUEST = '04',
}

export function makeAddress(TXN_NAMESPACE: Namespaces, data: string) {
  const prefix = FAMILY_NAMESPACE + RESERVED_NAMESPACE + TXN_NAMESPACE;
  const hashedData = hash(data, HashingAlgorithms.sha256).substring(
    0,
    ADDRESS_LEN - prefix.length,
  );

  return prefix + hashedData;
}
