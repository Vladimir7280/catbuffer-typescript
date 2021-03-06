"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedAccountMetadataTransactionBuilder = void 0;
const AccountMetadataTransactionBodyBuilder_1 = require("./AccountMetadataTransactionBodyBuilder");
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
class EmbeddedAccountMetadataTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, targetAddress, scopedMetadataKey, valueSizeDelta, value) {
        super(signerPublicKey, version, network, type);
        this.accountMetadataTransactionBody = new AccountMetadataTransactionBodyBuilder_1.AccountMetadataTransactionBodyBuilder(targetAddress, scopedMetadataKey, valueSizeDelta, value);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const accountMetadataTransactionBody = AccountMetadataTransactionBodyBuilder_1.AccountMetadataTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountMetadataTransactionBody.getSize());
        return new EmbeddedAccountMetadataTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, accountMetadataTransactionBody.targetAddress, accountMetadataTransactionBody.scopedMetadataKey, accountMetadataTransactionBody.valueSizeDelta, accountMetadataTransactionBody.value);
    }
    static createEmbeddedAccountMetadataTransactionBuilder(signerPublicKey, version, network, type, targetAddress, scopedMetadataKey, valueSizeDelta, value) {
        return new EmbeddedAccountMetadataTransactionBuilder(signerPublicKey, version, network, type, targetAddress, scopedMetadataKey, valueSizeDelta, value);
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
exports.EmbeddedAccountMetadataTransactionBuilder = EmbeddedAccountMetadataTransactionBuilder;
//# sourceMappingURL=EmbeddedAccountMetadataTransactionBuilder.js.map