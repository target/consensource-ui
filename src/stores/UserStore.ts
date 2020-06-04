import { observable, action, computed } from 'mobx';
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
} from 'services/crypto';
import SnackbarStore from './SnackbarStore';

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

  // @observable org_id: string;

  constructor(userStore: UserStore, user: UserInfo) {
    this.userStore = userStore;
    this.username = user.username;
    this.password = user.password;
    this.signer = user.signer;
  }
}

export default class UserStore {
  snackbarStore: SnackbarStore;

  @observable user: User | null = null;

  constructor(snackbarStore: SnackbarStore) {
    this.snackbarStore = snackbarStore;
  }

  @action.bound
  async createUser(username: string, password: string) {
    const privateKey = createNewPrivateKey();
    const signer = createSigner(privateKey);

    const userPayload: UserPayload = {
      username,
      password,
      public_key: signer.getPublicKey().asHex(),
      encrypted_private_key: getEncryptedPrivateKey(password, privateKey),
    };

    await createUser(userPayload);

    const user: UserInfo = {
      username,
      password,
      signer,
    };

    this.user = new User(this, user);
  }

  @action.bound
  async authenticateUser(username: string, password: string) {
    const payload: UserAuthPayload = { username, password };
    const res = await postUsersAuthenticate(payload);
    const decryptedKey = getDecryptedKeyHex(
      res.encrypted_private_key,
      password,
    );

    const signer = createSigner(decryptedKey);

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
