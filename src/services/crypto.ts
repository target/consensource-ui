import { createContext, CryptoFactory } from 'sawtooth-sdk/signing';
import sjcl from 'sjcl';
import { createHash } from 'crypto';

export const CRYPTO_ALGORITHM = 'secp256k1';

export const cryptoContext = createContext(CRYPTO_ALGORITHM);

export const cryptoFactory = new CryptoFactory(cryptoContext);

/**
 * TODO: Use the right type for the param (blocked by sawtooth-sdk typings)
 *
 * Creates a new signer to be sign transactions with. Also saves
 * the private key to session storage, and the signer in cache.
 *
 * Note: A signer is merely a wrapper class for a private key
 * and is not saved to the db or state.
 *
 */
export function createSigner(privateKey: any): sawtooth.signing.Signer {
  return cryptoFactory.newSigner(privateKey);
}

export function createNewPrivateKey() {
  return cryptoContext.newRandomPrivateKey();
}

export function getSignerPubKeyHex(signer: sawtooth.signing.Signer) {
  return signer.getPublicKey().asHex();
}

/**
 * TODO: Use the right type for the param (blocked by sawtooth-sdk typings)
 *
 * Encrypts the private key using the provided password.
 */
export function getEncryptedPrivateKey(password: string, privateKey: any) {
  return sjcl.encrypt(password, privateKey.asHex());
}

export function getDecryptedKeyHex(encryptedPrivateKey: any, password: string) {
  return sjcl.decrypt(password, encryptedPrivateKey);
}

export enum HashingAlgorithms {
  sha256 = 'sha256',
  sha512 = 'sha512',
}

export function hash(val: string, algorithm: HashingAlgorithms) {
  return createHash(algorithm).update(val).digest('hex');
}
