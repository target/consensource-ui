import core = require('./core');
import signing = require('./');

declare module secp256k1 {
    class Secp256k1PrivateKey extends core.PrivateKey {
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

    class Secp256k1PublicKey extends core.PublicKey {
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

    class Secp256k1Context extends core.Context {

        /** Return a string of the algorithm name */
        getAlgorithmName(): string;

        /** Verify that a provided message and Secp256k1PublicKey match a given message */
        verify(signature: string, message: signing.message, publicKey: Secp256k1PublicKey): boolean;

        /** Sign a given message with the provided Secp256k1PublicKey */
        sign(message: signing.message, privateKey: Secp256k1PublicKey): string;

        /** Return a new Secp256k1PublicKey instance from a Secp256k1PrivateKey instance*/
        getPublicKey(privateKey: Secp256k1PrivateKey): Secp256k1PublicKey;

        /** Generate a new Secp256k1PrivateKey */
        newRandomPrivateKey(): Secp256k1PrivateKey;
    }
}

export = secp256k1;
