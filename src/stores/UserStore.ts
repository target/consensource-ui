import { observable, action, computed } from 'mobx';
import * as UserApi from 'services/api/user';
import CryptoStore from 'stores/CryptoStore';
import SnackbarStore from './SnackbarStore';

export interface UserInfo {
  username: string;
  password: string;
  signer: sawtooth.signing.Signer;
}

export class User {
  userStore: UserStore;

  @observable username: string;

  @observable password: string;

  @observable signer: sawtooth.signing.Signer;

  constructor(userStore: UserStore, user: UserInfo) {
    this.userStore = userStore;
    this.username = user.username;
    this.password = user.password;
    this.signer = user.signer;
  }
}

export default class UserStore {
  cryptoStore: CryptoStore;

  snackbarStore: SnackbarStore;

  @observable user: User | null = null;

  constructor(cryptoStore: CryptoStore, snackbarStore: SnackbarStore) {
    this.cryptoStore = cryptoStore;
    this.snackbarStore = snackbarStore;
  }

  @action.bound
  async createUser(username: string, password: string) {
    const privateKey = this.cryptoStore.createNewPrivateKey();
    const signer = this.cryptoStore.createSigner(privateKey);

    const userPayload: UserApi.UserPayload = {
      username,
      password,
      public_key: signer.getPublicKey().asHex(),
      encrypted_private_key: CryptoStore.getEncryptedPrivateKey(
        password,
        privateKey,
      ),
    };

    try {
      await UserApi.createUser(userPayload);
    } catch (err) {
      this.snackbarStore.triggerSnackbar(err);
      return;
    }

    const user: UserInfo = {
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
