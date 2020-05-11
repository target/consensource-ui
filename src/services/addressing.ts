import { createHash, Hash } from 'crypto';

/**
 * Hashes `val` and returns a substring of the first `len` chars
 */
const hash = (val: string, len: number): string => {
	const sha: Hash = createHash('sha256');
	return sha.update(val).digest('hex').substring(0, len);
};

const PREFIX_SIZE = 6;
const ADDRESS_LEN = 70;
const RESERVED_SPACE = '00';

export const FAMILY_NAME = 'consensource';
export const FAMILY_VERSION = '0.1';
export const FAMILY_NAMESPACE = hash(FAMILY_NAME, PREFIX_SIZE);

export enum Namespaces {
	AGENT = '00',
	CERTIFICATE = '01',
	ORGANIZATION = '02',
	STANDARD = '03',
	CERTIFICATE_REQUEST = '04',
}

export const makeAddress = (namespace: Namespaces, data: string) => {
	const prefix = FAMILY_NAMESPACE + RESERVED_SPACE + namespace;
	const hashedData = hash(data, ADDRESS_LEN - prefix.length);

	return prefix + hashedData;
};
