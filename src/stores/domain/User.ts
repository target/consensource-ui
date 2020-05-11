import UserStore from 'stores/UserStore';

export interface User {
	username: string;
	password: string;
	signer: sawtooth.signing.Signer;
}

export default class User {
	userStore: UserStore;

	@observable username: string;

	@observable password: string;

	@observable signer: sawtooth.signing.Signer;

	constructor(userStore: UserStore, user: User) {
		this.userStore = userStore;
		this.username = user.username;
		this.password = user.password;
		this.signer = user.signer;
	}
}
