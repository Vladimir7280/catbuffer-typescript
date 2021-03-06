"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicGlobalRestrictionTransactionBodyBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const UnresolvedMosaicIdDto_1 = require("./UnresolvedMosaicIdDto");
class MosaicGlobalRestrictionTransactionBodyBuilder {
    constructor(mosaicId, referenceMosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, previousRestrictionType, newRestrictionType) {
        GeneratorUtils_1.GeneratorUtils.notNull(mosaicId, 'mosaicId is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(referenceMosaicId, 'referenceMosaicId is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(restrictionKey, 'restrictionKey is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(previousRestrictionValue, 'previousRestrictionValue is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(newRestrictionValue, 'newRestrictionValue is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(previousRestrictionType, 'previousRestrictionType is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(newRestrictionType, 'newRestrictionType is null or undefined');
        this.mosaicId = mosaicId;
        this.referenceMosaicId = referenceMosaicId;
        this.restrictionKey = restrictionKey;
        this.previousRestrictionValue = previousRestrictionValue;
        this.newRestrictionValue = newRestrictionValue;
        this.previousRestrictionType = previousRestrictionType;
        this.newRestrictionType = newRestrictionType;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const mosaicId = UnresolvedMosaicIdDto_1.UnresolvedMosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.getSize());
        const referenceMosaicId = UnresolvedMosaicIdDto_1.UnresolvedMosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, referenceMosaicId.getSize());
        const restrictionKey = GeneratorUtils_1.GeneratorUtils.bufferToUint64(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const previousRestrictionValue = GeneratorUtils_1.GeneratorUtils.bufferToUint64(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const newRestrictionValue = GeneratorUtils_1.GeneratorUtils.bufferToUint64(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const previousRestrictionType = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const newRestrictionType = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        return new MosaicGlobalRestrictionTransactionBodyBuilder(mosaicId, referenceMosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, previousRestrictionType, newRestrictionType);
    }
    static createMosaicGlobalRestrictionTransactionBodyBuilder(mosaicId, referenceMosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, previousRestrictionType, newRestrictionType) {
        return new MosaicGlobalRestrictionTransactionBodyBuilder(mosaicId, referenceMosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, previousRestrictionType, newRestrictionType);
    }
    getMosaicId() {
        return this.mosaicId;
    }
    getReferenceMosaicId() {
        return this.referenceMosaicId;
    }
    getRestrictionKey() {
        return this.restrictionKey;
    }
    getPreviousRestrictionValue() {
        return this.previousRestrictionValue;
    }
    getNewRestrictionValue() {
        return this.newRestrictionValue;
    }
    getPreviousRestrictionType() {
        return this.previousRestrictionType;
    }
    getNewRestrictionType() {
        return this.newRestrictionType;
    }
    getSize() {
        let size = 0;
        size += this.mosaicId.getSize();
        size += this.referenceMosaicId.getSize();
        size += 8;
        size += 8;
        size += 8;
        size += 1;
        size += 1;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const mosaicIdBytes = this.mosaicId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicIdBytes);
        const referenceMosaicIdBytes = this.referenceMosaicId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, referenceMosaicIdBytes);
        const restrictionKeyBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getRestrictionKey());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionKeyBytes);
        const previousRestrictionValueBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getPreviousRestrictionValue());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, previousRestrictionValueBytes);
        const newRestrictionValueBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getNewRestrictionValue());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, newRestrictionValueBytes);
        const previousRestrictionTypeBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(this.previousRestrictionType);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, previousRestrictionTypeBytes);
        const newRestrictionTypeBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(this.newRestrictionType);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, newRestrictionTypeBytes);
        return newArray;
    }
}
exports.MosaicGlobalRestrictionTransactionBodyBuilder = MosaicGlobalRestrictionTransactionBodyBuilder;
//# sourceMappingURL=MosaicGlobalRestrictionTransactionBodyBuilder.js.map