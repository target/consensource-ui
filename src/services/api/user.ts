import axios from 'axios';
import sjcl from 'sjcl';

export interface UserPayload {
	username: string;
	password: string;
	public_key: string;
	encrypted_private_key: sjcl.SjclCipherEncrypted;
}

export function createUser(userCreate: UserPayload): Promise<any> {
	const url = '/api/users';

	return axios.post(url, userCreate).catch((e: Error) => {
		throw new Error(`Failed to POST ${url}: ${e.message}`);
	});
}
