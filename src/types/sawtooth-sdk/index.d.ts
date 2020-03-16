// Type definitions for Sawooth SDK library
// Project: https://www.hyperledger.org/projects/sawtooth, https://github.com/hyperledger/sawtooth-core
// Definitions by: Patrick Erichsen <https://github.com/Patrick-Erichsen>

// Type definitions for Sawooth SDK Signing library
// Project: https://www.hyperledger.org/projects/sawtooth, https://github.com/hyperledger/sawtooth-core
// Definitions by: Patrick Erichsen <https://github.com/Patrick-Erichsen>

type message = string | Buffer | NodeJS.TypedArray | DataView;

declare module signing {
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

declare module secp256k1 {
    class Secp256k1PrivateKey extends PrivateKey {
        constructor(privateKeyBytes: Buffer);

        /** The bytes of the public key */
        privateKeyBytes: Buffer;

        /** Return a string of the algorithm name */
        getAlgorithmName(): string;

        /** Returns the private key bytes in a Buffer. */
        asBytes(): Buffer;

        /** Creates a private key from a hex encode set of bytes. */
        static fromHex(privateKeyHex: string): Secp256k1PrivateKey;

        /** Generate a new random private key */
        static newRandom(): Secp256k1PrivateKey;
    }

    class Secp256k1PublicKey extends PublicKey {
        constructor(publicKeyBytes: Buffer);

        /** The bytes of the public key */
        publicKeyBytes: Buffer;

        /** Return a string of the algorithm name */
        getAlgorithmName(): string;

        /** Returns the public key bytes in a Buffer. */
        asBytes(): Buffer;

        /** Creates a public key from a hex encode set of bytes. */
        static fromHex(publicKeyHex: string): Secp256k1PublicKey;

        /** Generate a new random public key */
        static newRandom(): Secp256k1PublicKey;
    }

    class Secp256k1Context extends Context {
        /** Return a string of the algorithm name */
        getAlgorithmName(): string;

        /** Verify that a provided message and Secp256k1PublicKey match a given message */
        verify(signature: string, message: message, publicKey: Secp256k1PublicKey): boolean;

        /** Sign a given message with the provided Secp256k1PublicKey */
        sign(message: message, privateKey: Secp256k1PublicKey): string;

        /** Return a new Secp256k1PublicKey instance from a Secp256k1PrivateKey instance*/
        getPublicKey(privateKey: Secp256k1PrivateKey): Secp256k1PublicKey;

        /** Generate a new Secp256k1PrivateKey */
        newRandomPrivateKey(): Secp256k1PrivateKey;
    }
}

declare module core {
    class Signer {
        /** Constructs a new Signer */
        constructor(content: Context, privateKey: PrivateKey);

        /** A cryptographic context */
        _context: Context;

        /** Private key */
        _privateKey: PrivateKey;

        /** Public key */
        _publicKey?: PublicKey;

        /** Signs the given message. */
        sign(message: Buffer): string;

        /** Return the public key for this Signer instance. */
        getPublicKey(): PublicKey;
    }

    class CryptoFactory {
        /** Constructs a CryptoFactory. */
        constructor(context: Context);

        /** A cryptographic context */
        _context: Context;

        /** Returns the context associated with this factory */
        getContext(): Context;

        /** Create a new signer for the given private key. */
        newSigner(privateKey: PrivateKey): Signer;
    }

    /** Returns an Context instance by algorithm name. */
    function createContext(algorithmName: string): Context;
}
