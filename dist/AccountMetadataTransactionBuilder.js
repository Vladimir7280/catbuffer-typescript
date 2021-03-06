"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountMetadataTransactionBuilder = void 0;
const AccountMetadataTransactionBodyBuilder_1 = require("./AccountMetadataTransactionBodyBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const TransactionBuilder_1 = require("./TransactionBuilder");
class AccountMetadataTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, targetAddress, scopedMetadataKey, valueSizeDelta, value) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.accountMetadataTransactionBody = new AccountMetadataTransactionBodyBuilder_1.AccountMetadataTransactionBodyBuilder(targetAddress, scopedMetadataKey, valueSizeDelta, value);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const accountMetadataTransactionBody = AccountMetadataTransactionBodyBuilder_1.AccountMetadataTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountMetadataTransactionBody.getSize());
        return new AccountMetadataTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, accountMetadataTransactionBody.targetAddress, accountMetadataTransactionBody.scopedMetadataKey, accountMetadataTransactionBody.valueSizeDelta, accountMetadataTransactionBody.value);
    }
    static createAccountMetadataTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, targetAddress, scopedMetadataKey, valueSizeDelta, value) {
        return new AccountMetadataTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, targetAddress, scopedMetadataKey, valueSizeDelta, value);
    }
    getTargetAddress() {
        return this.accountMetadataTransactionBody.getTargetAddress();
    }
    getScopedMetadataKey() {
        return this.accountMetadataTransactionBody.getScopedMetadataKey();
    }
    getValueSizeDelta() {
        return this.accountMetadataTransactionBody.getValueSizeDelta();
    }
    getValue() {
        return this.accountMetadataTransactionBody.getValue();
    }
    getSize() {
        let size = super.getSize();
        size += this.accountMetadataTransactionBody.getSize();
        return size;
    }
    getBody() {
        return this.accountMetadataTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const accountMetadataTransactionBodyBytes = this.accountMetadataTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountMetadataTransactionBodyBytes);
        return newArray;
    }
}
exports.AccountMetadataTransactionBuilder = AccountMetadataTransactionBuilder;
//# sourceMappingURL=AccountMetadataTransactionBuilder.js.map