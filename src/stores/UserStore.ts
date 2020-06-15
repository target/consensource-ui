import { observable, action } from 'mobx';
import {
  postUsersAuthenticate,
  UserAuthPayload,
  UserPayload,
  createUser,
} from 'services/api/user';
import {
  getEncryptedPrivateKey,
  createNewPrivateKey,
  createSigner,
  getDecryptedKeyHex,
  getSignerPubKeyHex,
  createPrivateKeyFromHex,
} from 'services/crypto';
import SnackbarStore from 'stores/SnackbarStore';
import { Secp256k1PrivateKey } from 'sawtooth-sdk/signing/secp256k1';

export interface UserInfo {
  username: string;
  password: string;
  signer: sawtooth.signing.Signer;
}

// TODO: Add the org_id of a user here
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

  get publicKeyString() {
    return getSignerPubKeyHex(this.signer);
  }
}

export default class UserStore {
  snackbarStore: SnackbarStore;

  userStorageKey = 'USER';

  @observable user: User | null = null;

  @observable isAuthenticating = false;

  constructor(snackbarStore: SnackbarStore) {
    this.snackbarStore = snackbarStore;
    this.getUserFromLocalStorage();
  }

  getUserFromLocalStorage() {
    const userString = window.localStorage.getItem(this.userStorageKey);

    if (userString) {
      const { username, password }: User = JSON.parse(userString);
      this.authenticateUser(username, password);
    }
  }

  @action.bound
  async createUser(username: string, password: string) {
    const privateKey = createNewPrivateKey();
    const signer = createSigner(privateKey);
    const public_key = getSignerPubKeyHex(signer);
    const encrypted_private_key = getEncryptedPrivateKey(password, privateKey);

    const userPayload: UserPayload = {
      username,
      password,
      public_key,
      encrypted_private_key,
    };

    await createUser(userPayload);

    const user: UserInfo = {
      username,
      password,
      signer,
    };

    this.user = new User(this, user);

    window.localStorage.setItem(this.userStorageKey, JSON.stringify(user));
  }

  @action.bound
  async authenticateUser(username: string, password: string) {
    this.isAuthenticating = true;

    const payload: UserAuthPayload = { username, password };
    const res = await postUsersAuthenticate(payload);

    const decryptedKey = getDecryptedKeyHex(
      res.encrypted_private_key,
      password,
    );

    const privateKey = createPrivateKeyFromHex(decryptedKey);

    const signer = createSigner(privateKey);

    const user: UserInfo = {
      username,
      password,
      signer,
    };

    this.user = new User(this, user);

    this.isAuthenticating = false;
  }
}
