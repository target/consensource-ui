import { observable, action, computed } from 'mobx';
import {
  postUsersAuthenticate,
  UserAuthReqParams,
  UserCreateReqParams,
  createUser,
} from 'services/api';
import {
  getEncryptedPrivateKey,
  createNewPrivateKey,
  createSigner,
  getDecryptedKeyHex,
  getSignerPubKeyHex,
  createPrivateKeyFromHex,
} from 'services/crypto';

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

export class UserStore {
  USER_STORAGE_KEY = 'USER';

  @observable user: User | null = null;

  @observable isAuthenticating = false;

  constructor() {
    this.loadUserFromLocalStorage();
  }

  @computed
  get isAuthenticated() {
    return !this.isAuthenticating && !!this.user;
  }

  async loadUserFromLocalStorage() {
    const userString = window.localStorage.getItem(this.USER_STORAGE_KEY);

    if (userString) {
      const user: User = JSON.parse(userString);

      try {
        await this.authenticateUser({
          username: user.username,
          password: user.password,
        });
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

    const userPayload: UserCreateReqParams = {
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
  async authenticateUser(authPayload: UserAuthReqParams) {
    this.isAuthenticating = true;

    let res;

    try {
      res = await postUsersAuthenticate(authPayload);
    } catch {
      // TODO: Remove once session tokens are in place
      this.isAuthenticating = false;
      this.logout();
      throw new Error('Failed to authenticate user');
    }

    const privateKey = createPrivateKeyFromHex(
      getDecryptedKeyHex(res.encrypted_private_key, authPayload.password),
    );

    const signer = createSigner(privateKey);

    const user: UserInfo = {
      username: authPayload.username,
      password: authPayload.password,
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
