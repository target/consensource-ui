import axios from 'axios';
import sjcl from 'sjcl';

// interface UserCreateRes {
//     result: string;
// }

export interface UserPayload {
    username: string;
    password: string;
    public_key: string;
    encrypted_private_key: sjcl.SjclCipherEncrypted;
}

export const createUser = async (userCreate: UserPayload): Promise<any> =>
    await axios.post('/api/users', userCreate);
