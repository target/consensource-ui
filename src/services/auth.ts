import { createContext, CryptoFactory } from 'sawtooth-sdk/signing';
import { Secp256k1PrivateKey } from 'sawtooth-sdk/signing/secp256k1';
import { pluck } from 'services/utils';
import * as sjcl from 'sjcl';
import * as AuthApi from 'services/api/auth';
import axios from 'axios';
import AgentService from 'services/agent';

class AuthService {
    NAMESPACE: string;
    STORE_PRIVATE_KEY: string;
    STORE_USER: string;
    cachedSigner: sawtooth.signing.Signer | null;
    cryptoFactory: sawtooth.signing.CryptoFactory;

    constructor() {
        this.NAMESPACE = 'consensource';
        this.STORE_PRIVATE_KEY = 'privateKey';
        this.STORE_USER = 'user';
        this.cachedSigner = null;
        this.cryptoFactory = new CryptoFactory(createContext('secp256k1'));
    }

    localStoreSave(key: string, value: string) {
        return localStorage.setItem(`${this.NAMESPACE}/${key}`, value);
    }

    localStoreGet(key: string): string | null {
        return localStorage.getItem(`${this.NAMESPACE}/${key}`);
    }

    localStoreRemove(key: string): void {
        localStorage.removeItem(`${this.NAMESPACE}/${key}`);
    }

    sessionStoreSave(key: string, value: string): void {
        sessionStorage.setItem(`${this.NAMESPACE}/${key}`, value);
    }

    sessionStoreGet(key: string): string | null {
        return sessionStorage.getItem(`${this.NAMESPACE}/${key}`);
    }

    sessionStoreRemove(key: string): void {
        sessionStorage.removeItem(`${this.NAMESPACE}/${key}`);
    }

    setNAMESPACE(ns: string): void {
        this.NAMESPACE = ns;
    }

    isSignedIn(): boolean {
        return Boolean(this.localStoreGet(this.STORE_USER));
    }

    getNewPrivateKey() {
        return this.cryptoFactory.getContext().newRandomPrivateKey();
    }

    requestPassword(): Promise<string> {
        // const password = '';

        return new Promise((resolve) => resolve('test'));
        // return Modals.show(
        //     Modals.DialogModal,
        //     {
        //         title: 'Enter Password',
        //         acceptText: 'Submit',
        //     },
        //     [
        //         m('.container', [
        //             m(
        //                 '.mb-4',
        //                 'Please confirm your password to unlock your private key.',
        //             ),
        //             m('input.format-control[type=password]', {
        //                 oninput: (e: any) => {
        //                     password = e.target.value;
        //                 },
        //             }),
        //         ]),
        //     ],
        // ).then(() => password);
    }

    setUserData(user: any, password: string): void {
        this.cachedSigner = null;

        const storedUser = pluck(
            user,
            'username',
            'public_key',
            'name',
            'encrypted_private_key',
        );

        this.localStoreSave(this.STORE_USER, JSON.stringify(storedUser));
        const decryptedKey = sjcl.decrypt(password, user.encrypted_private_key);
        this.sessionStoreSave(this.STORE_PRIVATE_KEY, decryptedKey);
    }

    updateUserData(update: any): void {
        this.getUserData().then((user: any) => {
            const currentUser = pluck(
                user,
                'username',
                'public_key',
                'name',
                'email',
                'encrypted_private_key',
            );
            currentUser.encrypted_private_key = update.encrypted_private_key;
            this.localStoreSave(this.STORE_USER, JSON.stringify(currentUser));

            const decryptedKey = sjcl.decrypt(
                update.password,
                update.encrypted_private_key,
            );
            this.sessionStoreSave(this.STORE_PRIVATE_KEY, decryptedKey);
        });
    }

    getUserData(): any {
        const userStr = this.localStoreGet(this.STORE_USER);

        if (userStr) {
            return JSON.parse(userStr);
        } else {
            return 'No User Data Available.  Sign-in required';
        }
    }

    /**
     * Effectively a sign-out method
     */
    clear(): void {
        this.cachedSigner = null;
        this.localStoreRemove(this.STORE_USER);
        this.sessionStoreRemove(this.STORE_PRIVATE_KEY);
    }

    authenticate(username: string, password: string): Promise<void> {
        return axios
            .post('/api/users/authenticate', {
                username,
                password,
            })
            .then((user) => this.setUserData(user, password))
            .catch((e) => {
                if (e.error && e.error.status === 401) {
                    return Promise.reject('User not found');
                } else {
                    return Promise.reject('Unable to sign in at this time.');
                }
            });
    }

    updateUser(update: any, signer: sawtooth.signing.Signer): Promise<void> {
        const userUpdate = pluck(
            update,
            'username',
            'old_password',
            'password',
            'encrypted_private_key',
        );
        const updatedEncryptedKey = sjcl.encrypt(
            update.password,
            signer._privateKey.asHex(),
        );
        userUpdate.encrypted_private_key = updatedEncryptedKey;
        const public_key = update.public_key;

        return axios
            .patch(`/api/users/${public_key}`, { userUpdate })
            .catch((e) => {
                if (e.error && e.error.status === 401) {
                    return Promise.reject('Unauthorized to change password');
                } else {
                    return Promise.reject(
                        'Unable to change password at this time.',
                    );
                }
            })
            .then((result: any) => {
                if (result.status === 'ok') {
                    this.updateUserData(userUpdate);
                }
            });
    }

    /**
     * Returns a signer in one of three ways:
     * 1. From cache
     * 2. Creates a new signer from the private key in session storage
     * 3. By prompting the user for their password, decrypting the user's
     *    private key, and create a new signer with it.
     *
     */
    async getSigner(): Promise<sawtooth.signing.Signer> {
        const decryptedKeyHex = this.sessionStoreGet(this.STORE_PRIVATE_KEY);

        if (this.cachedSigner) {
            return this.cachedSigner;
        } else if (decryptedKeyHex) {
            const decryptedKey = this.getPrivateKeyFromHex(decryptedKeyHex);
            return this.createAndCacheSigner(decryptedKey);
        } else {
            const decryptedKey = await this.getDecryptedUserPrivateKey();
            return this.createAndCacheSigner(decryptedKey);
        }
    }

    getPrivateKeyFromHex(privateKey: string) {
        return Secp256k1PrivateKey.fromHex(privateKey);
    }

    /**
     * TODO: Use the right type for the param (blocked by sawtooth-sdk typings)
     *
     * Prompts the user for their password in order to decrypt their
     * private key.
     */
    async getDecryptedUserPrivateKey(): Promise<any> {
        const user = this.getUserData();
        const password = await this.requestPassword();
        const decryptedKeyHex = sjcl.decrypt(
            password,
            user.encrypted_private_key,
        );
        const decryptedKey = this.getPrivateKeyFromHex(decryptedKeyHex);
        return decryptedKey;
    }

    /**
     * TODO: Use the right type for the param (blocked by sawtooth-sdk typings)
     *
     * Creates a new signer to be sign transactions with. Also saves
     * the private key to session storage, and the signer in cache.
     *
     * Note: A signer is merely a wrapper class for a private key
     * and is not saved to the db or state.
     *
     */
    createAndCacheSigner(privateKey: any): sawtooth.signing.Signer {
        const signer = this.cryptoFactory.newSigner(privateKey);
        this.cachedSigner = signer;

        return this.cachedSigner;
    }

    /**
     * TODO: Use the right type for the param (blocked by sawtooth-sdk typings)
     *
     * Encrypts the private key using the provided password.
     */
    getEncryptedPrivateKey(password: string, privateKey: any) {
        return sjcl.encrypt(password, privateKey.asHex());
    }

    createAndCachePrivateKey() {
        const privateKey = this.getNewPrivateKey();
        this.sessionStoreSave(this.STORE_PRIVATE_KEY, privateKey.asHex());

        return privateKey;
    }

    /**
     * Creates a user and saves it off-chain.
     * When creating a user, we also generate a public and private key
     * that we manage on behalf of the user and is saved off-chain.
     *
     */
    async createAndCacheUser(
        username: string,
        password: string,
        signer: sawtooth.signing.Signer,
    ): Promise<void> {
        const encryptedPrivateKey = this.getEncryptedPrivateKey(
            password,
            signer._privateKey,
        );

        const userPayload: AuthApi.UserCreatePayload = {
            username,
            password,
            public_key: signer.getPublicKey().asHex(),
            encrypted_private_key: encryptedPrivateKey,
        };

        await AuthApi.createAndCacheUser(userPayload);
        await this.setUserData(userPayload, password);
    }

    async createUserWithAgent(
        username: string,
        password: string,
        name: string,
    ): Promise<any> {
        const privateKey = this.createAndCachePrivateKey();
        const signer = this.createAndCacheSigner(privateKey);

        await this.createAndCacheUser(username, password, signer);
        await AgentService.createAgent(name, signer);
    }
}

export default new AuthService();
