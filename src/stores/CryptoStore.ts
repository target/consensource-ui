import { observable } from 'mobx';
import { createContext, CryptoFactory } from 'sawtooth-sdk/signing';
import sjcl from 'sjcl';

export const CRYPTO_ALGORITHM = 'secp256k1';

export default class CryptoStore {
	@observable context = createContext(CRYPTO_ALGORITHM);

	@observable cryptoFactory = new CryptoFactory(this.context);

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
	createSigner(privateKey: any): sawtooth.signing.Signer {
		return this.cryptoFactory.newSigner(privateKey);
	}

	createNewPrivateKey() {
		return this.context.newRandomPrivateKey();
	}

	/**
	 * TODO: Use the right type for the param (blocked by sawtooth-sdk typings)
	 *
	 * Encrypts the private key using the provided password.
	 */
	static getEncryptedPrivateKey(password: string, privateKey: any) {
		return sjcl.encrypt(password, privateKey.asHex());
	}

	static getDecryptedKeyHex(encryptedPrivateKey: any, password: string) {
		return sjcl.decrypt(password, encryptedPrivateKey);
	}
}
