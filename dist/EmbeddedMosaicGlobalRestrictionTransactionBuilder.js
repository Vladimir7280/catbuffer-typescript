"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedMosaicGlobalRestrictionTransactionBuilder = void 0;
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicGlobalRestrictionTransactionBodyBuilder_1 = require("./MosaicGlobalRestrictionTransactionBodyBuilder");
class EmbeddedMosaicGlobalRestrictionTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, mosaicId, referenceMosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, previousRestrictionType, newRestrictionType) {
        super(signerPublicKey, version, network, type);
        this.mosaicGlobalRestrictionTransactionBody = new MosaicGlobalRestrictionTransactionBodyBuilder_1.MosaicGlobalRestrictionTransactionBodyBuilder(mosaicId, referenceMosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, previousRestrictionType, newRestrictionType);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const mosaicGlobalRestrictionTransactionBody = MosaicGlobalRestrictionTransactionBodyBuilder_1.MosaicGlobalRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicGlobalRestrictionTransactionBody.getSize());
        return new EmbeddedMosaicGlobalRestrictionTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, mosaicGlobalRestrictionTransactionBody.mosaicId, mosaicGlobalRestrictionTransactionBody.referenceMosaicId, mosaicGlobalRestrictionTransactionBody.restrictionKey, mosaicGlobalRestrictionTransactionBody.previousRestrictionValue, mosaicGlobalRestrictionTransactionBody.newRestrictionValue, mosaicGlobalRestrictionTransactionBody.previousRestrictionType, mosaicGlobalRestrictionTransactionBody.newRestrictionType);
    }
    static createEmbeddedMosaicGlobalRestrictionTransactionBuilder(signerPublicKey, version, network, type, mosaicId, referenceMosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, previousRestrictionType, newRestrictionType) {
        return new EmbeddedMosaicGlobalRestrictionTransactionBuilder(signerPublicKey, version, network, type, mosaicId, referenceMosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, previousRestrictionType, newRestrictionType);
    }
    getMosaicId() {
        return this.mosaicGlobalRestrictionTransactionBody.getMosaicId();
    }
    getReferenceMosaicId() {
        return this.mosaicGlobalRestrictionTransactionBody.getReferenceMosaicId();
    }
    getRestrictionKey() {
        return this.mosaicGlobalRestrictionTransactionBody.getRestrictionKey();
    }
    getPreviousRestrictionValue() {
        return this.mosaicGlobalRestrictionTransactionBody.getPreviousRestrictionValue();
    }
    getNewRestrictionValue() {
        return this.mosaicGlobalRestrictionTransactionBody.getNewRestrictionValue();
    }
    getPreviousRestrictionType() {
        return this.mosaicGlobalRestrictionTransactionBody.getPreviousRestrictionType();
    }
    getNewRestrictionType() {
        return this.mosaicGlobalRestrictionTransactionBody.getNewRestrictionType();
    }
    getSize() {
        let size = super.getSize();
        size += this.mosaicGlobalRestrictionTransactionBody.getSize();
        return size;
    }
    getBody() {
        return this.mosaicGlobalRestrictionTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const mosaicGlobalRestrictionTransactionBodyBytes = this.mosaicGlobalRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicGlobalRestrictionTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedMosaicGlobalRestrictionTransactionBuilder = EmbeddedMosaicGlobalRestrictionTransactionBuilder;
//# sourceMappingURL=EmbeddedMosaicGlobalRestrictionTransactionBuilder.js.map