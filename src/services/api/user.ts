import axios from 'axios';
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
  const res = await axios.post('/api/users', payload);
  return res.data;
}

export async function postUsersAuthenticate(payload: UserAuthReqParams) {
  const res = await axios
    .post<UserAuthResData>('/api/users/authenticate', payload)
    .catch((err) => {
      if (err.response?.status === 401) {
        throw new Error('User not found');
      }

      throw new Error(err);
    });

  return res.data;
}
