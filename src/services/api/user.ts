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
  const path = '/api/users';

  const res = await axios.post(path, payload).catch(({ message }: any) => {
    throw new Error(`Failed to POST ${path}: ${message}`);
  });

  return res.data;
}

export async function postUsersAuthenticate(payload: UserAuthReqParams) {
  const path = '/api/users/authenticate';

  const res = await axios
    .post<UserAuthResData>(path, payload)
    .catch((err: AxiosError) => {
      if (err.response?.status === 401) {
        throw new Error('User not found');
      }

      throw new Error(`Failed to POST ${path}: ${err.message}`);
    });

  return res.data;
}
