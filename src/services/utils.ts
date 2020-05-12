import { createHash } from 'crypto';

export enum HashingAlgorithms {
	sha256 = 'sha256',
	sha512 = 'sha512',
}

export function hash(val: string, algorithm: HashingAlgorithms) {
	return createHash(algorithm).update(val).digest('hex');
}
