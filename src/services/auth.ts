const m = require('mithril')
const sjcl = require('sjcl')
const { createContext, CryptoFactory } = require('sawtooth-sdk/signing')
const { Secp256k1PrivateKey } = require('sawtooth-sdk/signing/secp256k1')
const { pluck } = require('App/utils')
const modals = require('App/components/modals')

const STORE_PRIVATE_KEY = 'privateKey'
const STORE_USER = 'user'

const CRYPTO_CONTEXT = createContext('secp256k1')
const CRYPTO_FACTORY = new CryptoFactory(CRYPTO_CONTEXT)

let _authStore_cachedSigner = null;

const _localStoreSave = (key, value) =>
  localStorage.setItem(`${AuthService.namespace}/${key}`, value)

const _localStoreGet = (key) =>
  localStorage.getItem(`${AuthService.namespace}/${key}`)

const _localStoreRemove = (key) =>
  localStorage.removeItem(`${AuthService.namespace}/${key}`)

const _sessionStoreSave = (key, value) =>
  sessionStorage.setItem(`${AuthService.namespace}/${key}`, value)

const _sessionStoreGet = (key) =>
  sessionStorage.getItem(`${AuthService.namespace}/${key}`)

const _sessionStoreRemove = (key) =>
  sessionStorage.removeItem(`${AuthService.namespace}/${key}`)

const requestPassword = () => {
  let password = null

  return modals.show(modals.DialogModal, {
    title: 'Enter Password',
    acceptText: 'Submit',
  },
    m('.container', [
      m('.mb-4', 'Please confirm your password to unlock your private key.'),
      m('input.format-control[type=password]', {
        oninput: m.withAttr('value', value => {
          password = value
        })
      })
    ]))
    .then(() => password)
}

const displaySuccessDialog = () => {
  modals.show(modals.DialogSuccessModal, { content: 'Password successfully updated' })
}


const AuthService = {
  namespace: 'consensource',

  isSignedIn: () => Boolean(_localStoreGet(STORE_USER)),

  setUserData: (user, password) => {
    // invalidate cache
    _authStore_cachedSigner = null;

    let storedUser = pluck(user, 'username', 'public_key', 'name', 'email', 'encrypted_private_key')
    _localStoreSave(STORE_USER, JSON.stringify(storedUser))

    let decryptedKey = sjcl.decrypt(password, user.encrypted_private_key)
    _sessionStoreSave(STORE_PRIVATE_KEY, decryptedKey)
  },

  updateUserData: (update) => {
    AuthService.getUserData()
      .then((user) => {
        let currentUser = pluck(user, 'username', 'public_key', 'name', 'email', 'encrypted_private_key')
        currentUser.encrypted_private_key = update.encrypted_private_key
        _localStoreSave(STORE_USER, JSON.stringify(currentUser))

        let decryptedKey = sjcl.decrypt(update.password, update.encrypted_private_key)
        _sessionStoreSave(STORE_PRIVATE_KEY, decryptedKey)
      })
  },

  getUserData: () => new Promise((resolve, reject) => {
    let userStr = _localStoreGet(STORE_USER)
    if (!userStr) {
      reject('No User Data Available.  Sign-in required')
      return;
    }

    try {
      resolve(JSON.parse(userStr))
    } catch (e) {
      reject(e)
    }
  }),

  getSigner: () => {
    if (_authStore_cachedSigner) {
      return Promise.resolve(_authStore_cachedSigner);
    }

    let sessionStoredKey = _sessionStoreGet(STORE_PRIVATE_KEY)
    if (sessionStoredKey) {
      let signer = CRYPTO_FACTORY.newSigner(Secp256k1PrivateKey.fromHex(sessionStoredKey))
      _authStore_cachedSigner = signer
      return Promise.resolve(signer)
    }

    return AuthService.getUserData()
      .then((user) => Promise.all([user, requestPassword()]))
      .then(([user, password]) => {
        let decryptedKey = sjcl.decrypt(password, user.encrypted_private_key)
        _sessionStoreSave(STORE_PRIVATE_KEY, decryptedKey)
        let signer = CRYPTO_FACTORY.newSigner(Secp256k1PrivateKey.fromHex(decryptedKey))
        _authStore_cachedSigner = signer
        return Promise.resolve(signer)
      })
  },

  /**
   *  Returns a new Signer and the encrypted private key, to send to the server.
   */
  createSigner: (password) => {
    if (AuthService.isSignedIn()) {
      return Promise.reject('Already signed in')
    }

    let privateKey = CRYPTO_CONTEXT.newRandomPrivateKey()
    let signer = CRYPTO_FACTORY.newSigner(privateKey)

    _authStore_cachedSigner = signer
    _sessionStoreSave(STORE_PRIVATE_KEY, privateKey.asHex())

    let encryptedPrivateKey = sjcl.encrypt(password, privateKey.asHex())

    return Promise.resolve({ signer, encryptedPrivateKey })
  },

  /**
   * Effectively a sign-out method
   */
  clear: () => {
    // invalidate cache
    _authStore_cachedSigner = null;

    _localStoreRemove(STORE_USER)
    _sessionStoreRemove(STORE_PRIVATE_KEY)

    m.redraw()
  },

  authenticate: (username, password) =>
    m.request({
      method: 'POST',
      url: '/api/users/authenticate',
      data: { username, password }
    })
      .then((user) => AuthService.setUserData(user, password))
      .catch((e) => {
        if (e.error && e.error.status === 401) {
          return Promise.reject('User not found')
        } else {
          return Promise.reject('Unable to sign in at this time.')
        }
      }),

  updateUser: (update, signer) => {
    let userUpdate = pluck(update, 'username', 'old_password', 'password', 'encrypted_private_key')
    let updatedEncryptedKey = sjcl.encrypt(update.password, signer._privateKey.asHex())
    userUpdate.encrypted_private_key = updatedEncryptedKey
    let public_key = update.public_key

    return m.request({
      method: 'PATCH',
      url: `/api/users/${public_key}`,
      data: userUpdate
    })
      .catch((e) => {
        if (e.error && e.error.status === 401) {
          return Promise.reject('Unauthorized to change password')
        } else {
          return Promise.reject('Unable to change password at this time.')
        }
      })
      .then((result) => {
        if (result.status === 'ok') {
          AuthService.updateUserData(userUpdate)
          displaySuccessDialog()
        }
      })
  },

  /**
   * Creates a user, then uses the submitTransactionFn to submit a followup
   * transaction to the block chain
   *
   * The function is a (Signer) => Promise, where the promise is resolved when
   * the transaction completes.
   */
  createUser: (user, submitTransactionFn) => {
    let userCreate = pluck(user, 'username', 'password', 'email')
    return AuthService.createSigner(userCreate.password)
      .then(({ signer, encryptedPrivateKey }) => {
        userCreate.public_key = signer.getPublicKey().asHex()
        userCreate.encrypted_private_key = encryptedPrivateKey

        return m.request({
          method: 'POST',
          url: '/api/users',
          data: userCreate
        })
          .catch((e) => {
            if (e.error && e.error.status === 400) {
              return Promise.reject(e.error.message)
            } else {
              return Promise.reject("Unable to sign up at this time")
            }
          })
          .then((result) => {
            if (result.status === 'ok') {
              return submitTransactionFn(signer)
            } else {
              return Promise.reject("Unable to sign up at this time")
            }
          })
          .then(() => AuthService.setUserData(userCreate, userCreate.password))
      })
  }
}

module.exports = AuthService
