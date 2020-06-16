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

  get publicKeyString() {
    return getSignerPubKeyHex(this.signer);
  }
}

export default class UserStore {
  snackbarStore: SnackbarStore;

  USER_STORAGE_KEY = 'USER';

  @observable user: User | null = null;

  @observable isAuthenticating = false;

  constructor(snackbarStore: SnackbarStore) {
    this.snackbarStore = snackbarStore;
    this.loadUserFromLocalStorage();
  }

  async loadUserFromLocalStorage() {
    const userString = window.localStorage.getItem(this.USER_STORAGE_KEY);

    if (userString) {
      const { username, password }: User = JSON.parse(userString);

      try {
        await this.authenticateUser(username, password);
      } catch {
        this.user = null;
      }
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

    window.localStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(user));
  }

  @action.bound
  async authenticateUser(username: string, password: string) {
    this.isAuthenticating = true;

    const payload: UserAuthPayload = { username, password };

    let res;

    try {
      res = await postUsersAuthenticate(payload);
    } catch {
      this.logout();
      throw new Error('Failed to authenticate user');
    }

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

  @action.bound
  logout() {
    window.localStorage.removeItem(this.USER_STORAGE_KEY);
    this.user = null;
  }
}
