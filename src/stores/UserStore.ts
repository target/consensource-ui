import { observable, action, computed } from 'mobx';
import * as UserApi from 'services/api/user';
import CryptoStore from 'stores/CryptoStore';

export default class UserStore {
    @observable user: IUser | null = null;

    constructor(private cryptoStore: CryptoStore) {}

    @action.bound
    async createUser(username: string, password: string) {
        const privateKey = this.cryptoStore.createNewPrivateKey();
        const signer = this.cryptoStore.createSigner(privateKey);

        const userPayload: UserApi.UserPayload = {
            username,
            password,
            public_key: signer.getPublicKey().asHex(),
            encrypted_private_key: this.cryptoStore.getEncryptedPrivateKey(
                password,
                privateKey,
            ),
        };

        await UserApi.createUser(userPayload);

        const user: IUser = {
            username,
            password,
            signer,
        };

        this.user = user;
    }

    @computed get isSignedIn() {
        console.log('isSignedI !!!');
        return this.user !== null;
    }
}

export interface IUser {
    username: string;
    password: string;
    signer: sawtooth.signing.Signer;
}

export class User {
    @observable username: string;
    @observable password: string;
    @observable signer: sawtooth.signing.Signer;

    constructor(private store: UserStore, user: IUser) {
        this.username = user.username;
        this.password = user.password;
        this.signer = user.signer;
    }
}
