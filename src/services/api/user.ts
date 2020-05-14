import axios from 'axios';
import sjcl from 'sjcl';

export interface UserPayload {
  username: string;
  password: string;
  public_key: string;
  encrypted_private_key: sjcl.SjclCipherEncrypted;
}

export interface UserAuthPayload {
  username: string;
  password: string;
}

export interface UserAuthRes {
  status: string;
  username: string;
  public_key: string;
  encrypted_private_key: string;
}

export async function createUser(userCreate: UserPayload): Promise<any> {
  const url = '/api/users';

  const res = await axios.post(url, userCreate).catch((e: any) => {
    throw new Error(`Failed to POST ${url}: ${e.message}`);
  });

  return res.data;
}

export async function postUsersAuthenticate(
  userAuth: UserAuthPayload,
): Promise<UserAuthRes> {
  const url = '/api/users/authenticate';

  const res = await axios.post(url, userAuth).catch((e: any) => {
    if (e.error && e.error.status === 401) {
      throw new Error('User not found');
    }

    throw new Error('Unable to login at this time');
  });

  return res.data;
}
