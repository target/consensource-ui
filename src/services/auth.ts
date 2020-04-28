import { createContext, CryptoFactory } from 'sawtooth-sdk/signing';
import { Secp256k1PrivateKey } from 'sawtooth-sdk/signing/secp256k1';
import { pluck } from 'services/utils';
import * as sjcl from 'sjcl';
import * as AuthApi from 'services/api/auth';
import axios from 'axios';
import AgentService from 'services/agent';

class AuthService {
    namespace: string;
    storePrivateKey: string;
    storeUser: string;
    cachedSigner: sawtooth.signing.Signer | null;
    cryptoFactory: sawtooth.signing.CryptoFactory;

    constructor() {
        this.namespace = 'consensource';
        this.storePrivateKey = 'privateKey';
        this.storeUser = 'user';
        this.cachedSigner = null;
        this.cryptoFactory = new CryptoFactory(createContext('secp256k1'));
    }

    localStoreSave(key: string, value: string) {
        return localStorage.setItem(`${this.namespace}/${key}`, value);
    }

    localStoreGet(key: string): string | null {
        return localStorage.getItem(`${this.namespace}/${key}`);
    }

    localStoreRemove(key: string): void {
        localStorage.removeItem(`${this.namespace}/${key}`);
    }

    sessionStoreSave(key: string, value: string): void {
        sessionStorage.setItem(`${this.namespace}/${key}`, value);
    }

    sessionStoreGet(key: string): string | null {
        return sessionStorage.getItem(`${this.namespace}/${key}`);
    }

    sessionStoreRemove(key: string): void {
        sessionStorage.removeItem(`${this.namespace}/${key}`);
    }

    setNamespace(ns: string): void {
        this.namespace = ns;
    }

    isSignedIn(): boolean {
        return Boolean(this.localStoreGet(this.storeUser));
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

        this.localStoreSave(this.storeUser, JSON.stringify(storedUser));

        const decryptedKey = sjcl.decrypt(password, user.encrypted_private_key);
        this.sessionStoreSave(this.storePrivateKey, decryptedKey);
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
            this.localStoreSave(this.storeUser, JSON.stringify(currentUser));

            const decryptedKey = sjcl.decrypt(
                update.password,
                update.encrypted_private_key,
            );
            this.sessionStoreSave(this.storePrivateKey, decryptedKey);
        });
    }

    getUserData(): Promise<unknown> {
        return new Promise((resolve, reject) => {
            const userStr = this.localStoreGet(this.storeUser);
            if (!userStr) {
                reject('No User Data Available.  Sign-in required');
                return;
            }

            try {
                resolve(JSON.parse(userStr));
            } catch (e) {
                reject(e);
            }
        });
    }

    getSigner(): Promise<any> {
        if (this.cachedSigner) {
            return Promise.resolve(this.cachedSigner);
        }

        const sessionStoredKey = this.sessionStoreGet(this.storePrivateKey);

        if (sessionStoredKey) {
            const signer = this.cryptoFactory.newSigner(
                Secp256k1PrivateKey.fromHex(sessionStoredKey),
            );
            this.cachedSigner = signer;
            return Promise.resolve(signer);
        }

        return this.getUserData()
            .then((user: any) => Promise.all([user, this.requestPassword()]))
            .then(([user, password]: Array<any>) => {
                const decryptedKey = sjcl.decrypt(
                    password,
                    user.encrypted_private_key,
                );
                this.sessionStoreSave(this.storePrivateKey, decryptedKey);
                const signer = this.cryptoFactory.newSigner(
                    Secp256k1PrivateKey.fromHex(decryptedKey),
                );
                this.cachedSigner = signer;
                return Promise.resolve(signer);
            });
    }

    /**
     *  Returns a new Signer and the encrypted private key, to send to the server.
     */
    createSigner(password: string): any {
        if (this.isSignedIn()) {
            throw new Error('Already signed in');
        }

        const privateKey = this.getNewPrivateKey();
        const signer = this.cryptoFactory.newSigner(privateKey);

        this.cachedSigner = signer;
        this.sessionStoreSave(this.storePrivateKey, privateKey.asHex());

        const encryptedPrivateKey = sjcl.encrypt(password, privateKey.asHex());

        return { signer, encryptedPrivateKey };
    }

    /**
     * Effectively a sign-out method
     */
    clear(): void {
        this.cachedSigner = null;
        this.localStoreRemove(this.storeUser);
        this.sessionStoreRemove(this.storePrivateKey);
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
     * Creates a user and saves it off-chain.
     */
    async createUser(username: string, password: string): Promise<void> {
        const { signer, encryptedPrivateKey } = this.createSigner(password);

        const public_key = signer.getPublicKey().asHex();
        const encrypted_private_key = encryptedPrivateKey;

        const userCreate = {
            username,
            password,
            public_key,
            encrypted_private_key,
        } as any;

        return await AuthApi.createUser(userCreate);
    }

    async createUserWithAgent(
        username: string,
        password: string,
        name: string,
    ): Promise<any> {
        const user = await this.createUser(username, password);
        console.log(user);
        const signer = await this.getSigner();

        await AgentService.createAgent(name, signer);
        await this.setUserData(user, password);
    }
}

export default new AuthService();
