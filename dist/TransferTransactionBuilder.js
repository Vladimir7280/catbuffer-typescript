"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferTransactionBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const TransactionBuilder_1 = require("./TransactionBuilder");
const TransferTransactionBodyBuilder_1 = require("./TransferTransactionBodyBuilder");
class TransferTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, recipientAddress, mosaics, message) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.transferTransactionBody = new TransferTransactionBodyBuilder_1.TransferTransactionBodyBuilder(recipientAddress, mosaics, message);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const transferTransactionBody = TransferTransactionBodyBuilder_1.TransferTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, transferTransactionBody.getSize());
        return new TransferTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, transferTransactionBody.recipientAddress, transferTransactionBody.mosaics, transferTransactionBody.message);
    }
    static createTransferTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, recipientAddress, mosaics, message) {
        return new TransferTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, recipientAddress, mosaics, message);
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
exports.TransferTransactionBuilder = TransferTransactionBuilder;
//# sourceMappingURL=TransferTransactionBuilder.js.map