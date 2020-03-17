// Type definitions for Sawooth SDK
// TypeScript: 3.8
// Project: https://www.hyperledger.org/projects/sawtooth, https://github.com/hyperledger/sawtooth-core
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/sawtooth-sdk
// Definitions by:
//  - Patrick Erichsen <https://github.com/Patrick-Erichsen>
//  - Trevor McDonald  <https://github.com/trevormcdonald>

declare module core {
    /** Thrown when trying to create a context for an algorithm which does not exist. */
    class NoSuchAlgorithmError extends Error {
        constructor(message?: string);

        name: string;
    }

    /** Thrown when an error occurs during the signing process. */
    class SigningError extends Error {
        constructor(message?: string);

        name: string;
    }

    /** Thrown when an error occurs during deserialization of a Private or Public key from various formats. */
    class ParseError extends Error {
        constructor(message?: string);

        name: string;
    }

    /** A private key instance. The underlying content is dependent on implementation. */
    abstract class PrivateKey {
        constructor();

        /** Returns the algorithm name used for this public key. */
        getAlgorithmName(): string;

        /** Return the public key encoded as a hex string */
        asHex(): string;

        /** Returns the public key bytes in a Buffer. */
        asBytes(): Buffer;
    }

    /** A public key instance. The underlying content is dependent on implementation. */
    abstract class PublicKey {
        constructor();

        /** Returns the algorithm name used for this public key. */
        getAlgorithmName(): string;

        /** Return the public key encoded as a hex string */
        asHex(): string;

        /** Returns the public key bytes in a Buffer. */
        asBytes(): Buffer;
    }

    /** A context for a cryptographic signing algorithm. */
    abstract class Context {
        constructor();

        /** Returns the algorithm name used for this context. */
        getAlgorithmName(): string;

        /**
         * Sign a message.
         *
         * Given a private key for this algorithm, sign the given message bytes
         * and return a hex-encoded string of the resulting signature.
         */
        sign(message: Buffer, privateKey: PrivateKey): string;

        /** Verifies that a signature of a message was produced with the associated public key. */
        verify(signature: string, message: Buffer, publicKey: PublicKey): boolean;

        /** Produce a public key for the given private key. */
        getPublicKey(privateKey: PrivateKey): PublicKey;

        /** Generate a new random private key, based on the underlying algorithm. */
        newRandomPrivateKey(): PrivateKey;
    }
}

export = core;
