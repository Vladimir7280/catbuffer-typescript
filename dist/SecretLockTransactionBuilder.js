"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretLockTransactionBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const SecretLockTransactionBodyBuilder_1 = require("./SecretLockTransactionBodyBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
class SecretLockTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, recipientAddress, secret, mosaic, duration, hashAlgorithm) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.secretLockTransactionBody = new SecretLockTransactionBodyBuilder_1.SecretLockTransactionBodyBuilder(recipientAddress, secret, mosaic, duration, hashAlgorithm);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const secretLockTransactionBody = SecretLockTransactionBodyBuilder_1.SecretLockTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, secretLockTransactionBody.getSize());
        return new SecretLockTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, secretLockTransactionBody.recipientAddress, secretLockTransactionBody.secret, secretLockTransactionBody.mosaic, secretLockTransactionBody.duration, secretLockTransactionBody.hashAlgorithm);
    }
    static createSecretLockTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, recipientAddress, secret, mosaic, duration, hashAlgorithm) {
        return new SecretLockTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, recipientAddress, secret, mosaic, duration, hashAlgorithm);
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
exports.SecretLockTransactionBuilder = SecretLockTransactionBuilder;
//# sourceMappingURL=SecretLockTransactionBuilder.js.map