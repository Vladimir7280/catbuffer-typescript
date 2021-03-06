"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedSecretLockTransactionBuilder = void 0;
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const SecretLockTransactionBodyBuilder_1 = require("./SecretLockTransactionBodyBuilder");
class EmbeddedSecretLockTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, recipientAddress, secret, mosaic, duration, hashAlgorithm) {
        super(signerPublicKey, version, network, type);
        this.secretLockTransactionBody = new SecretLockTransactionBodyBuilder_1.SecretLockTransactionBodyBuilder(recipientAddress, secret, mosaic, duration, hashAlgorithm);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const secretLockTransactionBody = SecretLockTransactionBodyBuilder_1.SecretLockTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, secretLockTransactionBody.getSize());
        return new EmbeddedSecretLockTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, secretLockTransactionBody.recipientAddress, secretLockTransactionBody.secret, secretLockTransactionBody.mosaic, secretLockTransactionBody.duration, secretLockTransactionBody.hashAlgorithm);
    }
    static createEmbeddedSecretLockTransactionBuilder(signerPublicKey, version, network, type, recipientAddress, secret, mosaic, duration, hashAlgorithm) {
        return new EmbeddedSecretLockTransactionBuilder(signerPublicKey, version, network, type, recipientAddress, secret, mosaic, duration, hashAlgorithm);
    }
    getRecipientAddress() {
        return this.secretLockTransactionBody.getRecipientAddress();
    }
    getSecret() {
        return this.secretLockTransactionBody.getSecret();
    }
    getMosaic() {
        return this.secretLockTransactionBody.getMosaic();
    }
    getDuration() {
        return this.secretLockTransactionBody.getDuration();
    }
    getHashAlgorithm() {
        return this.secretLockTransactionBody.getHashAlgorithm();
    }
    getSize() {
        let size = super.getSize();
        size += this.secretLockTransactionBody.getSize();
        return size;
    }
    getBody() {
        return this.secretLockTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const secretLockTransactionBodyBytes = this.secretLockTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, secretLockTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedSecretLockTransactionBuilder = EmbeddedSecretLockTransactionBuilder;
//# sourceMappingURL=EmbeddedSecretLockTransactionBuilder.js.map