import axios from 'axios';
import sjcl from 'sjcl';

interface UserCreateRes {
    result: string;
}

export interface UserCreatePayload {
    username: string;
    password: string;
    public_key: string;
    encrypted_private_key: sjcl.SjclCipherEncrypted;
}

export const createAndCacheUser = async (
    userCreate: UserCreatePayload,
): Promise<any> => await axios.post('/api/users', userCreate);
