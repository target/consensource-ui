import { observable, action, computed } from 'mobx';
import * as UserApi from 'services/api/user';
import CryptoStore from 'stores/CryptoStore';
import User from 'stores/domain';

export default class UserStore {
	cryptoStore: CryptoStore;

	@observable user: User | null = null;

	constructor(cryptoStore: CryptoStore) {
		this.cryptoStore = cryptoStore;
	}

	@action.bound
	async createUser(username: string, password: string) {
		const privateKey = this.cryptoStore.createNewPrivateKey();
		const signer = this.cryptoStore.createSigner(privateKey);

		const userPayload: UserApi.UserPayload = {
			username,
			password,
			public_key: signer.getPublicKey().asHex(),
			encrypted_private_key: CryptoStore.getEncryptedPrivateKey(password, privateKey),
		};

		await UserApi.createUser(userPayload);

		const user: User = {
			username,
			password,
			signer,
		};

		this.user = new User(this, user);
	}

	@computed get isSignedIn() {
		return this.user !== null;
	}
}
