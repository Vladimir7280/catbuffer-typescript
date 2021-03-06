"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedTransferTransactionBuilder = void 0;
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const TransferTransactionBodyBuilder_1 = require("./TransferTransactionBodyBuilder");
class EmbeddedTransferTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, recipientAddress, mosaics, message) {
        super(signerPublicKey, version, network, type);
        this.transferTransactionBody = new TransferTransactionBodyBuilder_1.TransferTransactionBodyBuilder(recipientAddress, mosaics, message);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const transferTransactionBody = TransferTransactionBodyBuilder_1.TransferTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, transferTransactionBody.getSize());
        return new EmbeddedTransferTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, transferTransactionBody.recipientAddress, transferTransactionBody.mosaics, transferTransactionBody.message);
    }
    static createEmbeddedTransferTransactionBuilder(signerPublicKey, version, network, type, recipientAddress, mosaics, message) {
        return new EmbeddedTransferTransactionBuilder(signerPublicKey, version, network, type, recipientAddress, mosaics, message);
    }
    getRecipientAddress() {
        return this.transferTransactionBody.getRecipientAddress();
    }
    getMosaics() {
        return this.transferTransactionBody.getMosaics();
    }
    getMessage() {
        return this.transferTransactionBody.getMessage();
    }
    getSize() {
        let size = super.getSize();
        size += this.transferTransactionBody.getSize();
        return size;
    }
    getBody() {
        return this.transferTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const transferTransactionBodyBytes = this.transferTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, transferTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedTransferTransactionBuilder = EmbeddedTransferTransactionBuilder;
//# sourceMappingURL=EmbeddedTransferTransactionBuilder.js.map