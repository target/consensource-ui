// Type definitions for Sawooth SDK Signing library
// Project: https://www.hyperledger.org/projects/sawtooth, https://github.com/hyperledger/sawtooth-core
// Definitions by: Patrick Erichsen <https://github.com/Patrick-Erichsen>

import core = require('./core');

declare module signing {
    type message = string | Buffer | NodeJS.TypedArray | DataView;

    class Signer {

        /** Constructs a new Signer */
        constructor(content: core.Context, privateKey: core.PrivateKey);

        /** A cryptographic context */
        _context: core.Context;

        /** Private key */
        _privateKey: core.PrivateKey;

        /** Public key */
        _publicKey?: core.PublicKey;

        /** Signs the given message. */
        sign(message: Buffer): string;

        /** Return the public key for this Signer instance. */
        getPublicKey(): core.PublicKey;
    }

    class CryptoFactory {

        /** Constructs a CryptoFactory. */
        constructor(context: core.Context);

        /** A cryptographic context */
        _context: core.Context;

        /** Returns the context associated with this factory */
        getContext(): core.Context;

        /** Create a new signer for the given private key. */
        newSigner(privateKey: core.PrivateKey): Signer;
    }

    /** Returns an Context instance by algorithm name. */
    function createContext(algorithmName: string): core.Context;
}

export = signing;
