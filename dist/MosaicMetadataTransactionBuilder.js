"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicMetadataTransactionBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicMetadataTransactionBodyBuilder_1 = require("./MosaicMetadataTransactionBodyBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
class MosaicMetadataTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, targetAddress, scopedMetadataKey, targetMosaicId, valueSizeDelta, value) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.mosaicMetadataTransactionBody = new MosaicMetadataTransactionBodyBuilder_1.MosaicMetadataTransactionBodyBuilder(targetAddress, scopedMetadataKey, targetMosaicId, valueSizeDelta, value);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const mosaicMetadataTransactionBody = MosaicMetadataTransactionBodyBuilder_1.MosaicMetadataTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicMetadataTransactionBody.getSize());
        return new MosaicMetadataTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, mosaicMetadataTransactionBody.targetAddress, mosaicMetadataTransactionBody.scopedMetadataKey, mosaicMetadataTransactionBody.targetMosaicId, mosaicMetadataTransactionBody.valueSizeDelta, mosaicMetadataTransactionBody.value);
    }
    static createMosaicMetadataTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, targetAddress, scopedMetadataKey, targetMosaicId, valueSizeDelta, value) {
        return new MosaicMetadataTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, targetAddress, scopedMetadataKey, targetMosaicId, valueSizeDelta, value);
    }
    getTargetAddress() {
        return this.mosaicMetadataTransactionBody.getTargetAddress();
    }
    getScopedMetadataKey() {
        return this.mosaicMetadataTransactionBody.getScopedMetadataKey();
    }
    getTargetMosaicId() {
        return this.mosaicMetadataTransactionBody.getTargetMosaicId();
    }
    getValueSizeDelta() {
        return this.mosaicMetadataTransactionBody.getValueSizeDelta();
    }
    getValue() {
        return this.mosaicMetadataTransactionBody.getValue();
    }
    getSize() {
        let size = super.getSize();
        size += this.mosaicMetadataTransactionBody.getSize();
        return size;
    }
    getBody() {
        return this.mosaicMetadataTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const mosaicMetadataTransactionBodyBytes = this.mosaicMetadataTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicMetadataTransactionBodyBytes);
        return newArray;
    }
}
exports.MosaicMetadataTransactionBuilder = MosaicMetadataTransactionBuilder;
//# sourceMappingURL=MosaicMetadataTransactionBuilder.js.map