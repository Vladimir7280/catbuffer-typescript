"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedSecretProofTransactionBuilder = void 0;
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const SecretProofTransactionBodyBuilder_1 = require("./SecretProofTransactionBodyBuilder");
class EmbeddedSecretProofTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, recipientAddress, secret, hashAlgorithm, proof) {
        super(signerPublicKey, version, network, type);
        this.secretProofTransactionBody = new SecretProofTransactionBodyBuilder_1.SecretProofTransactionBodyBuilder(recipientAddress, secret, hashAlgorithm, proof);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const secretProofTransactionBody = SecretProofTransactionBodyBuilder_1.SecretProofTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, secretProofTransactionBody.getSize());
        return new EmbeddedSecretProofTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, secretProofTransactionBody.recipientAddress, secretProofTransactionBody.secret, secretProofTransactionBody.hashAlgorithm, secretProofTransactionBody.proof);
    }
    static createEmbeddedSecretProofTransactionBuilder(signerPublicKey, version, network, type, recipientAddress, secret, hashAlgorithm, proof) {
        return new EmbeddedSecretProofTransactionBuilder(signerPublicKey, version, network, type, recipientAddress, secret, hashAlgorithm, proof);
    }
    getRecipientAddress() {
        return this.secretProofTransactionBody.getRecipientAddress();
    }
    getSecret() {
        return this.secretProofTransactionBody.getSecret();
    }
    getHashAlgorithm() {
        return this.secretProofTransactionBody.getHashAlgorithm();
    }
    getProof() {
        return this.secretProofTransactionBody.getProof();
    }
    getSize() {
        let size = super.getSize();
        size += this.secretProofTransactionBody.getSize();
        return size;
    }
    getBody() {
        return this.secretProofTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const secretProofTransactionBodyBytes = this.secretProofTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, secretProofTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedSecretProofTransactionBuilder = EmbeddedSecretProofTransactionBuilder;
//# sourceMappingURL=EmbeddedSecretProofTransactionBuilder.js.map