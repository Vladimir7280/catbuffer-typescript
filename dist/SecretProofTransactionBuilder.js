"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretProofTransactionBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const SecretProofTransactionBodyBuilder_1 = require("./SecretProofTransactionBodyBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
class SecretProofTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, recipientAddress, secret, hashAlgorithm, proof) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.secretProofTransactionBody = new SecretProofTransactionBodyBuilder_1.SecretProofTransactionBodyBuilder(recipientAddress, secret, hashAlgorithm, proof);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const secretProofTransactionBody = SecretProofTransactionBodyBuilder_1.SecretProofTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, secretProofTransactionBody.getSize());
        return new SecretProofTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, secretProofTransactionBody.recipientAddress, secretProofTransactionBody.secret, secretProofTransactionBody.hashAlgorithm, secretProofTransactionBody.proof);
    }
    static createSecretProofTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, recipientAddress, secret, hashAlgorithm, proof) {
        return new SecretProofTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, recipientAddress, secret, hashAlgorithm, proof);
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
exports.SecretProofTransactionBuilder = SecretProofTransactionBuilder;
//# sourceMappingURL=SecretProofTransactionBuilder.js.map