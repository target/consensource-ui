import * as m from 'mithril';
import * as sjcl from 'sjcl';
import Modals from 'App/components/modals';
import { createContext, CryptoFactory } from 'sawtooth-sdk/signing';
import { Secp256k1PrivateKey } from 'sawtooth-sdk/signing/secp256k1';
import { pluck } from 'App/utils';

const CRYPTO_CONTEXT = createContext('secp256k1');
const CRYPTO_FACTORY = new CryptoFactory(CRYPTO_CONTEXT);

const AuthService = {
    namespace: 'consensource',

    STORE_PRIVATE_KEY: 'privateKey',
    STORE_USER: 'user',

    cachedSigner: null,

    localStoreSave: (key: string, value: string): void =>
        localStorage.setItem(`${AuthService.namespace}/${key}`, value),

    localStoreGet: (key: string): string => localStorage.getItem(`${AuthService.namespace}/${key}`),

    localStoreRemove: (key: string): void => localStorage.removeItem(`${AuthService.namespace}/${key}`),

    sessionStoreSave: (key: string, value: string): void =>
        sessionStorage.setItem(`${AuthService.namespace}/${key}`, value),

    sessionStoreGet: (key: string): string => sessionStorage.getItem(`${AuthService.namespace}/${key}`),

    sessionStoreRemove: (key: string): void => sessionStorage.removeItem(`${AuthService.namespace}/${key}`),

    requestPassword: (): Promise<string> => {
        let password: string = null;

        return Modals.show(
            Modals.DialogModal,
            {
                title: 'Enter Password',
                acceptText: 'Submit',
            },
            [
                m('.container', [
                    m('.mb-4', 'Please confirm your password to unlock your private key.'),
                    m('input.format-control[type=password]', {
                        oninput: (e: any) => {
                            password = e.target.value;
                        },
                    }),
                ]),
            ],
        ).then(() => password);
    },

    displaySuccessDialog: (): void => {
        Modals.show(Modals.DialogSuccessModal, { content: 'Password successfully updated' });
    },

    setNamespace: (ns: string): string => (AuthService.namespace = ns),

    isSignedIn: (): boolean => Boolean(AuthService.localStoreGet(AuthService.STORE_USER)),

    setUserData: (user: any, password: string): void => {
        // invalidate cache
        AuthService.cachedSigner = null;

        const storedUser = pluck(user, 'username', 'public_key', 'name', 'email', 'encrypted_private_key');
        AuthService.localStoreSave(AuthService.STORE_USER, JSON.stringify(storedUser));

        const decryptedKey = sjcl.decrypt(password, user.encrypted_private_key);
        AuthService.sessionStoreSave(AuthService.STORE_PRIVATE_KEY, decryptedKey);
    },

    updateUserData: (update: any): void => {
        AuthService.getUserData().then((user: any) => {
            const currentUser = pluck(user, 'username', 'public_key', 'name', 'email', 'encrypted_private_key');
            currentUser.encrypted_private_key = update.encrypted_private_key;
            AuthService.localStoreSave(AuthService.STORE_USER, JSON.stringify(currentUser));

            const decryptedKey = sjcl.decrypt(update.password, update.encrypted_private_key);
            AuthService.sessionStoreSave(AuthService.STORE_PRIVATE_KEY, decryptedKey);
        });
    },

    getUserData: (): Promise<unknown> =>
        new Promise((resolve, reject) => {
            const userStr = AuthService.localStoreGet(AuthService.STORE_USER);
            if (!userStr) {
                reject('No User Data Available.  Sign-in required');
                return;
            }

            try {
                resolve(JSON.parse(userStr));
            } catch (e) {
                reject(e);
            }
        }),

    getSigner: (): Promise<any> => {
        if (AuthService.cachedSigner) {
            return Promise.resolve(AuthService.cachedSigner);
        }

        const sessionStoredKey = AuthService.sessionStoreGet(AuthService.STORE_PRIVATE_KEY);
        if (sessionStoredKey) {
            const signer = CRYPTO_FACTORY.newSigner(Secp256k1PrivateKey.fromHex(sessionStoredKey));
            AuthService.cachedSigner = signer;
            return Promise.resolve(signer);
        }

        return AuthService.getUserData()
            .then((user: any) => Promise.all([user, AuthService.requestPassword()]))
            .then(([user, password]: Array<any>) => {
                const decryptedKey = sjcl.decrypt(password, user.encrypted_private_key);
                AuthService.sessionStoreSave(AuthService.STORE_PRIVATE_KEY, decryptedKey);
                const signer = CRYPTO_FACTORY.newSigner(Secp256k1PrivateKey.fromHex(decryptedKey));
                AuthService.cachedSigner = signer;
                return Promise.resolve(signer);
            });
    },

    /**
     *  Returns a new Signer and the encrypted private key, to send to the server.
     */
    createSigner: (password: string): Promise<any> => {
        if (AuthService.isSignedIn()) {
            return Promise.reject('Already signed in');
        }

        const privateKey = CRYPTO_CONTEXT.newRandomPrivateKey();
        const signer = CRYPTO_FACTORY.newSigner(privateKey);

        AuthService.cachedSigner = signer;
        AuthService.sessionStoreSave(AuthService.STORE_PRIVATE_KEY, privateKey.asHex());

        const encryptedPrivateKey = sjcl.encrypt(password, privateKey.asHex());

        return Promise.resolve({ signer, encryptedPrivateKey });
    },

    /**
     * Effectively a sign-out method
     */
    clear: (): void => {
        AuthService.cachedSigner = null;

        AuthService.localStoreRemove(AuthService.STORE_USER);
        AuthService.sessionStoreRemove(AuthService.STORE_PRIVATE_KEY);

        m.redraw();
    },

    authenticate: (username: string, password: string): Promise<void> =>
        m
            .request({
                method: 'POST',
                url: '/api/users/authenticate',
                body: { username, password },
            })
            .then(user => AuthService.setUserData(user, password))
            .catch(e => {
                if (e.error && e.error.status === 401) {
                    return Promise.reject('User not found');
                } else {
                    return Promise.reject('Unable to sign in at this time.');
                }
            }),

    updateUser: (update: any, signer: sawtooth.signing.Signer): Promise<void> => {
        const userUpdate = pluck(update, 'username', 'old_password', 'password', 'encrypted_private_key');
        const updatedEncryptedKey = sjcl.encrypt(update.password, signer._privateKey.asHex());
        userUpdate.encrypted_private_key = updatedEncryptedKey;
        const public_key = update.public_key;

        return m
            .request({
                method: 'PATCH',
                url: `/api/users/${public_key}`,
                body: userUpdate,
            })
            .catch(e => {
                if (e.error && e.error.status === 401) {
                    return Promise.reject('Unauthorized to change password');
                } else {
                    return Promise.reject('Unable to change password at this time.');
                }
            })
            .then((result: any) => {
                if (result.status === 'ok') {
                    AuthService.updateUserData(userUpdate);
                    AuthService.displaySuccessDialog();
                }
            });
    },

    /**
     * Creates a user, then uses the submitTransactionFn to submit a followup
     * transaction to the block chain
     *
     * The function is a (Signer) => Promise, where the promise is resolved when
     * the transaction completes.
     */
    createUser: (user: any, submitTransactionFn: Function): Promise<void> => {
        const userCreate = pluck(user, 'username', 'password', 'email');
        return AuthService.createSigner(userCreate.password).then(({ signer, encryptedPrivateKey }: any) => {
            userCreate.public_key = signer.getPublicKey().asHex();
            userCreate.encrypted_private_key = encryptedPrivateKey;

            return m
                .request({
                    method: 'POST',
                    url: '/api/users',
                    body: userCreate,
                })
                .catch(e => {
                    if (e.error && e.error.status === 400) {
                        return Promise.reject(e.error.message);
                    } else {
                        return Promise.reject('Unable to sign up at this time');
                    }
                })
                .then((result: any) => {
                    if (result.status === 'ok') {
                        return submitTransactionFn(signer);
                    } else {
                        return Promise.reject('Unable to sign up at this time');
                    }
                })
                .then(() => AuthService.setUserData(userCreate, userCreate.password));
        });
    },
};

export default AuthService;
