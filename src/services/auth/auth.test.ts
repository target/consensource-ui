import * as sjcl from 'sjcl';
import * as m from 'mithril';
import { createContext, CryptoFactory, Signer } from 'sawtooth-sdk/signing';
import { pluck } from 'App/utils';
import AuthService from 'App/services/auth';
import { mocked } from 'ts-jest/utils';

jest.mock('mithril');
const mockedMithril = mocked(m, true);

describe('AuthService', () => {
    const getStorageKey = (key: string): string => `${AuthService.namespace}/${key}`;

    const password = 'password';
    const cryptoContext = createContext('secp256k1');
    const cryptoFactory = new CryptoFactory(cryptoContext);
    const privateKey = cryptoContext.newRandomPrivateKey();
    const encryptedPrivateKey = sjcl.encrypt(password, privateKey.asHex());
    const decryptedPrivateKey = sjcl.decrypt(password, encryptedPrivateKey);
    const publicKey = cryptoContext.getPublicKey(privateKey);
    const user = {
        username: 'test',
        public_key: publicKey,
        name: 'test',
        email: 'test',
        encrypted_private_key: encryptedPrivateKey,
    };

    beforeEach(() => {
        AuthService.clear();
        jest.clearAllMocks();
    });

    describe('AuthService.setNamespace()', () => {
        it('confirms the default namespace is "consensource"', () => {
            expect(AuthService.namespace).toEqual('consensource');
        });

        it('sets a new namespace value', () => {
            const newNamespace = 'auditor';
            AuthService.setNamespace(newNamespace);

            expect(AuthService.namespace).toEqual(newNamespace);
        });
    });

    describe('AuthService.isSignedIn()', () => {
        describe('given there is no user in local storage', () => {
            it('returns false', () => {
                expect(AuthService.isSignedIn()).toEqual(false);
            });
        });

        describe('given there is a user in local storage', () => {
            it('returns true', () => {
                localStorage.setItem(getStorageKey(AuthService.STORE_USER), JSON.stringify(user));
                expect(AuthService.isSignedIn()).toEqual(true);
            });
        });
    });

    describe('AuthService.setUserData()', () => {
        it('invalidates the cache, sets user data in local storage, and sets the decrypted private key in session storage', () => {
            const oldCachedUser = { ...user, username: 'old-user' };
            localStorage.setItem(getStorageKey(AuthService.STORE_USER), JSON.stringify(oldCachedUser));

            AuthService.setUserData(user, password);

            expect(localStorage.getItem(getStorageKey(AuthService.STORE_USER)) === JSON.stringify(oldCachedUser)).toBe(
                false,
            );

            expect(localStorage.setItem).toHaveBeenCalledWith(
                getStorageKey(AuthService.STORE_USER),
                JSON.stringify(user),
            );

            expect(sessionStorage.setItem).toHaveBeenLastCalledWith(
                getStorageKey(AuthService.STORE_PRIVATE_KEY),
                decryptedPrivateKey,
            );
        });
    });

    describe('AuthService.updateUserData()', () => {
        it('updates user data in local storage and the decrypted private key in session storage', async () => {
            const newPassword = 'new-password';
            const newPrivateKey = cryptoContext.newRandomPrivateKey();
            const newEncryptedPrivateKey = sjcl.encrypt(newPassword, newPrivateKey.asHex());

            const updates = { ...user, encrypted_private_key: newEncryptedPrivateKey, password: newPassword };
            const updatedUser = pluck(updates, 'username', 'public_key', 'name', 'email', 'encrypted_private_key');

            const decryptedPrivateKey = sjcl.decrypt(newPassword, newEncryptedPrivateKey);

            jest.spyOn(AuthService, 'getUserData').mockResolvedValueOnce(user);

            await AuthService.updateUserData(updates);

            expect(localStorage.setItem).toHaveBeenCalledWith(
                getStorageKey(AuthService.STORE_USER),
                JSON.stringify(updatedUser),
            );

            expect(sessionStorage.setItem).toHaveBeenCalledWith(
                getStorageKey(AuthService.STORE_PRIVATE_KEY),
                decryptedPrivateKey,
            );
        });
    });

    describe('AuthService.getUserData()', () => {
        describe('given there is a user in local storage', () => {
            it('returns a resolved promise with user data from local storage', async () => {
                const userStr = JSON.stringify(user);
                localStorage.setItem(getStorageKey(AuthService.STORE_USER), userStr);

                const userFromStorage = await AuthService.getUserData();

                expect(localStorage.getItem).toHaveBeenCalledWith(getStorageKey(AuthService.STORE_USER));
                expect(userFromStorage).toEqual(JSON.parse(userStr));
            });
        });

        describe('given the user data in local storage is not valid json', () => {
            it('returns a rejected promise with an error', async () => {
                expect.assertions(1);
                localStorage.setItem(getStorageKey(AuthService.STORE_USER), 'bad-json');
                await AuthService.getUserData().catch(e => expect(e).toEqual(expect.any(Error)));
            });
        });

        describe('given there is no user in local storage', () => {
            it('returns a rejected promise with a string', async () => {
                expect.assertions(1);
                // TODO: Use a snapshot here
                await AuthService.getUserData().catch(e => expect(e).toEqual(expect.any(String)));
            });
        });
    });

    describe('AuthService.getSigner()', () => {
        describe('given there is a cached signer', () => {
            it('returns the cached signer', async () => {
                const signer = cryptoFactory.newSigner(privateKey);
                AuthService.cachedSigner = signer;

                const cachedSigner = await AuthService.getSigner();

                expect(cachedSigner).toEqual(signer);
            });
        });

        describe('given there is a private key in session storage', () => {
            it('creates a new signer with the key, stores the signer in cache and returns a resolved promise with the signer', async () => {
                const decryptedKey = sjcl.decrypt(password, user.encrypted_private_key);
                sessionStorage.setItem(getStorageKey(AuthService.STORE_PRIVATE_KEY), decryptedKey);

                const signer = await AuthService.getSigner();

                expect(sessionStorage.getItem).toHaveBeenCalledWith(getStorageKey(AuthService.STORE_PRIVATE_KEY));
                expect(AuthService.cachedSigner).toEqual(signer);
                expect(signer._privateKey).toEqual(privateKey);
            });
        });

        describe('given there is no cached signer or private key in session storage, but there is a user in local storage', () => {
            beforeEach(() => {
                jest.spyOn(AuthService, 'getUserData').mockResolvedValueOnce(user);
            });

            it('when an incorrect password entered, then it fails to decrypt the private key and returns a rejected promise', async () => {
                expect.assertions(1);
                jest.spyOn(AuthService, 'requestPassword').mockResolvedValueOnce('wrong-password');
                await AuthService.getSigner().catch(e => expect(e).toBeTruthy());
            });

            it('stores the private key in session storage, caches the user in local storage, and returns a resolved promise with the new signer when the correct password is entered', async () => {
                jest.spyOn(AuthService, 'requestPassword').mockResolvedValueOnce(password);

                const signer = await AuthService.getSigner();

                expect(sessionStorage.setItem).toHaveBeenCalledWith(
                    getStorageKey(AuthService.STORE_PRIVATE_KEY),
                    decryptedPrivateKey,
                );

                expect(AuthService.cachedSigner).toEqual(signer);
            });
        });
    });

    describe('AuthService.createSigner()', () => {
        describe('given a user is signed in', () => {
            it('returns a rejected promise with an error message', async () => {
                expect.assertions(1);
                jest.spyOn(AuthService, 'isSignedIn').mockReturnValueOnce(true);
                // TODO: Use a snapshot here
                await AuthService.createSigner(password).catch(e => expect(e).toEqual(expect.any(String)));
            });
        });

        describe('given a user is not signed in', () => {
            it('creates a new private key to store in session, a new signer to store in cache, and returns a resolved promsie with the signer and encrypted key', async () => {
                const { signer, encryptedPrivateKey } = await AuthService.createSigner(password);
                const decryptedKey = sjcl.decrypt(password, encryptedPrivateKey);

                expect(AuthService.cachedSigner).toEqual(signer);
                expect(sessionStorage.getItem(getStorageKey(AuthService.STORE_PRIVATE_KEY))).toEqual(decryptedKey);
            });
        });
    });

    describe('AuthService.clear()', () => {
        it('clears local/session storage, cache, and performs a redraw', () => {
            AuthService.cachedSigner = cryptoFactory.newSigner(privateKey);
            const spy = jest.spyOn(m, 'redraw');

            AuthService.clear();

            expect(localStorage.removeItem).toHaveBeenCalledWith(getStorageKey(AuthService.STORE_USER));
            expect(sessionStorage.removeItem).toHaveBeenCalledWith(getStorageKey(AuthService.STORE_PRIVATE_KEY));
            expect(AuthService.cachedSigner).toBe(null);
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('AuthService.authenticate()', () => {
        describe('given an unsuccessful response', () => {
            it('rejects the prmomise a unique failure message on a 401, and a generic message on all other failures', async () => {
                expect.assertions(3);

                mockedMithril.request.mockRejectedValueOnce({ error: { status: 401 } });
                const failure401 = await AuthService.authenticate(user.username, password).catch(e => {
                    // TODO: Use a snapshot here
                    expect(e).toEqual(expect.any(String));
                    return e;
                });

                mockedMithril.request.mockRejectedValueOnce({ error: new Error() });
                const failureGeneric = await AuthService.authenticate(user.username, password).catch(e => {
                    // TODO: Use a snapshot here
                    expect(e).toEqual(expect.any(String));
                    return e;
                });

                expect(failure401 !== failureGeneric).toBe(true);
            });
        });

        describe('given a successful response', () => {
            it('calls AuthService.setUserData()', async () => {
                mockedMithril.request.mockResolvedValueOnce(user);
                const spy = jest.spyOn(AuthService, 'setUserData');

                await AuthService.authenticate(user.username, password);

                expect(spy).toHaveBeenCalled();
            });
        });
    });

    describe('AuthService.updateUser()', () => {
        const signer = new Signer(cryptoContext, privateKey);
        const userUpdate = {
            username: user.username,
            old_password: password,
            password: 'new-password',
            encrypted_private_key: user.encrypted_private_key,
        };

        describe('given an unsuccessful response', () => {
            it('rejects the promise with a unique failure message on a 401, and a generic message on all other failures', async () => {
                expect.assertions(3);

                mockedMithril.request.mockRejectedValueOnce({ error: { status: 401 } });
                const failure401 = await AuthService.updateUser(userUpdate, signer).catch(e => {
                    // TODO: Use a snapshot here
                    expect(e).toEqual(expect.any(String));
                    return e;
                });

                mockedMithril.request.mockRejectedValueOnce({ error: new Error() });
                const failureGeneric = await AuthService.updateUser(userUpdate, signer).catch(e => {
                    // TODO: Use a snapshot here
                    expect(e).toEqual(expect.any(String));
                    return e;
                });

                expect(failure401 !== failureGeneric).toBe(true);
            });
        });

        describe('given a successful response', () => {
            it('calls AuthService.updateUserData() and AuthService.displaySuccessDialog()', async () => {
                const updateSpy = jest.spyOn(AuthService, 'updateUserData').mockImplementation();
                const dialogSpy = jest.spyOn(AuthService, 'displaySuccessDialog').mockImplementation();
                mockedMithril.request.mockResolvedValueOnce({ status: 'ok' });

                await AuthService.updateUser(userUpdate, signer);

                expect(updateSpy).toHaveBeenCalled();
                expect(dialogSpy).toHaveBeenCalled();
            });
        });
    });

    describe('AuthService.createUser()', () => {
        const submitTransactionFn = jest.fn().mockResolvedValueOnce(null);
        const signer = new Signer(cryptoContext, privateKey);
        const encryptedPrivateKey = sjcl.encrypt(password, signer._privateKey.asHex());
        const publicKey = signer.getPublicKey().asHex();
        const userCreate = {
            username: user.username,
            password: password,
            email: user.email,
            public_key: publicKey,
            encrypted_private_key: encryptedPrivateKey,
        };

        beforeAll(() => {
            jest.spyOn(AuthService, 'createSigner').mockResolvedValue({ signer, encryptedPrivateKey });
        });

        describe('given an unsuccessful response', () => {
            it('rejects the promise with a unique failure message on a 400, and a generic message on all other status codes', async () => {
                expect.assertions(3);

                mockedMithril.request.mockRejectedValueOnce({ error: { status: 400, message: '400 error' } });
                const failure400 = await AuthService.createUser(userCreate, submitTransactionFn).catch(e => {
                    // TODO: Use a snapshot here
                    expect(e).toEqual(expect.any(String));
                    return e;
                });

                mockedMithril.request.mockRejectedValueOnce({ error: new Error() });
                const failureGeneric = await AuthService.createUser(userCreate, submitTransactionFn).catch(e => {
                    // TODO: Use a snapshot here
                    expect(e).toEqual(expect.any(String));
                    return e;
                });

                expect(failure400 !== failureGeneric).toBe(true);
            });
        });

        describe('given an successful response', () => {
            it('rejects the promise when the response status is not "ok"', async () => {
                expect.assertions(1);
                mockedMithril.request.mockResolvedValueOnce({ status: 'not-ok' });
                await AuthService.createUser(userCreate, submitTransactionFn).catch(e => {
                    // TODO: Use a snapshot here
                    expect(e).toEqual(expect.any(String));
                    return e;
                });
            });

            it('calls the submitTransactionFn param when the result status is "ok", resolves the promise, and calls AuthService.setUserData()', async () => {
                const spy = jest.spyOn(AuthService, 'setUserData');
                mockedMithril.request.mockResolvedValueOnce({ status: 'ok' });

                await AuthService.createUser(userCreate, submitTransactionFn);

                expect(submitTransactionFn).toHaveBeenCalledWith(signer);
                expect(spy).toHaveBeenCalledWith(userCreate, userCreate.password);
            });
        });
    });
});
