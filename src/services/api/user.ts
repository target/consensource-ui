import axios, { AxiosError } from 'axios';
import sjcl from 'sjcl';

export interface UserCreateReqParams {
  username: string;
  password: string;
  public_key: string;
  encrypted_private_key: sjcl.SjclCipherEncrypted;
}

export interface UserAuthReqParams {
  username: string;
  password: string;
}

export interface UserAuthResData {
  status: string;
  username: string;
  public_key: string;
  encrypted_private_key: string;
}

// TODO: Return type definition
export async function postUser(payload: UserCreateReqParams) {
  const url = '/api/users';

  const res = await axios.post(url, payload).catch((e: any) => {
    throw new Error(`Failed to POST ${url}: ${e.message}`);
  });

  return res.data;
}

export async function postUsersAuthenticate(payload: UserAuthReqParams) {
  const url = '/api/users/authenticate';

  const res = await axios
    .post<UserAuthResData>(url, payload)
    .catch((e: AxiosError) => {
      if (e?.response?.status === 401) {
        throw new Error('User not found');
      }

      throw new Error('Unable to login at this time');
    });

  return res.data;
}
