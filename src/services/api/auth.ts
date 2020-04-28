import axios from 'axios';
import sjcl from 'sjcl';

interface UserCreateRes {
    result: string;
}

export interface UserCreatePayload {
    username: string;
    password: string;
    public_key: string;
    encrypted_key: sjcl.SjclCipherEncrypted;
}

export const createUser = async (userCreate: UserCreatePayload): Promise<any> =>
    await axios.post('/api/users', userCreate);
