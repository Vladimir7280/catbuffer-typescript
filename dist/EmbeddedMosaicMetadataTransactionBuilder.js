"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedMosaicMetadataTransactionBuilder = void 0;
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicMetadataTransactionBodyBuilder_1 = require("./MosaicMetadataTransactionBodyBuilder");
class EmbeddedMosaicMetadataTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, targetAddress, scopedMetadataKey, targetMosaicId, valueSizeDelta, value) {
        super(signerPublicKey, version, network, type);
        this.mosaicMetadataTransactionBody = new MosaicMetadataTransactionBodyBuilder_1.MosaicMetadataTransactionBodyBuilder(targetAddress, scopedMetadataKey, targetMosaicId, valueSizeDelta, value);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const mosaicMetadataTransactionBody = MosaicMetadataTransactionBodyBuilder_1.MosaicMetadataTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicMetadataTransactionBody.getSize());
        return new EmbeddedMosaicMetadataTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, mosaicMetadataTransactionBody.targetAddress, mosaicMetadataTransactionBody.scopedMetadataKey, mosaicMetadataTransactionBody.targetMosaicId, mosaicMetadataTransactionBody.valueSizeDelta, mosaicMetadataTransactionBody.value);
    }
    static createEmbeddedMosaicMetadataTransactionBuilder(signerPublicKey, version, network, type, targetAddress, scopedMetadataKey, targetMosaicId, valueSizeDelta, value) {
        return new EmbeddedMosaicMetadataTransactionBuilder(signerPublicKey, version, network, type, targetAddress, scopedMetadataKey, targetMosaicId, valueSizeDelta, value);
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
exports.EmbeddedMosaicMetadataTransactionBuilder = EmbeddedMosaicMetadataTransactionBuilder;
//# sourceMappingURL=EmbeddedMosaicMetadataTransactionBuilder.js.map