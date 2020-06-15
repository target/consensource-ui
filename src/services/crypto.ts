import { createContext, CryptoFactory } from 'sawtooth-sdk/signing';
import { Secp256k1PrivateKey } from 'sawtooth-sdk/signing/secp256k1';
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
export function createSigner(
  privateKey: Secp256k1PrivateKey,
): sawtooth.signing.Signer {
  return cryptoFactory.newSigner(privateKey);
}

export function createNewPrivateKey() {
  return cryptoContext.newRandomPrivateKey() as Secp256k1PrivateKey;
}

export function createPrivateKeyFromHex(key: string) {
  return Secp256k1PrivateKey.fromHex(key);
}

export function getSignerPubKeyHex(signer: sawtooth.signing.Signer) {
  return signer.getPublicKey().asHex();
}

export function getEncryptedPrivateKey(
  password: string,
  privateKey: Secp256k1PrivateKey,
) {
  return sjcl.encrypt(password, privateKey.asHex());
}

export function getDecryptedKeyHex(
  encryptedPrivateKey: string,
  password: string,
) {
  return sjcl.decrypt(password, encryptedPrivateKey);
}

export enum HashingAlgorithms {
  sha256 = 'sha256',
  sha512 = 'sha512',
}

export function hash(val: string, algorithm: HashingAlgorithms) {
  return createHash(algorithm).update(val).digest('hex');
}
