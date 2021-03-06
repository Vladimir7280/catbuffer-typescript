"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamespaceMetadataTransactionBodyBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const NamespaceIdDto_1 = require("./NamespaceIdDto");
const UnresolvedAddressDto_1 = require("./UnresolvedAddressDto");
class NamespaceMetadataTransactionBodyBuilder {
    constructor(targetAddress, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value) {
        GeneratorUtils_1.GeneratorUtils.notNull(targetAddress, 'targetAddress is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(scopedMetadataKey, 'scopedMetadataKey is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(targetNamespaceId, 'targetNamespaceId is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(valueSizeDelta, 'valueSizeDelta is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(value, 'value is null or undefined');
        this.targetAddress = targetAddress;
        this.scopedMetadataKey = scopedMetadataKey;
        this.targetNamespaceId = targetNamespaceId;
        this.valueSizeDelta = valueSizeDelta;
        this.value = value;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const targetAddress = UnresolvedAddressDto_1.UnresolvedAddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, targetAddress.getSize());
        const scopedMetadataKey = GeneratorUtils_1.GeneratorUtils.bufferToUint64(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const targetNamespaceId = NamespaceIdDto_1.NamespaceIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, targetNamespaceId.getSize());
        const valueSizeDelta = GeneratorUtils_1.GeneratorUtils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const valueSize = GeneratorUtils_1.GeneratorUtils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const value = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), valueSize);
        byteArray.splice(0, valueSize);
        return new NamespaceMetadataTransactionBodyBuilder(targetAddress, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value);
    }
    static createNamespaceMetadataTransactionBodyBuilder(targetAddress, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value) {
        return new NamespaceMetadataTransactionBodyBuilder(targetAddress, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value);
    }
    getTargetAddress() {
        return this.targetAddress;
    }
    getScopedMetadataKey() {
        return this.scopedMetadataKey;
    }
    getTargetNamespaceId() {
        return this.targetNamespaceId;
    }
    getValueSizeDelta() {
        return this.valueSizeDelta;
    }
    getValue() {
        return this.value;
    }
    getSize() {
        let size = 0;
        size += this.targetAddress.getSize();
        size += 8;
        size += this.targetNamespaceId.getSize();
        size += 2;
        size += 2;
        size += this.value.length;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const targetAddressBytes = this.targetAddress.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, targetAddressBytes);
        const scopedMetadataKeyBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getScopedMetadataKey());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, scopedMetadataKeyBytes);
        const targetNamespaceIdBytes = this.targetNamespaceId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, targetNamespaceIdBytes);
        const valueSizeDeltaBytes = GeneratorUtils_1.GeneratorUtils.uint16ToBuffer(this.getValueSizeDelta());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, valueSizeDeltaBytes);
        const valueSizeBytes = GeneratorUtils_1.GeneratorUtils.uint16ToBuffer(this.value.length);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, valueSizeBytes);
        const valueBytes = this.value;
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, valueBytes);
        return newArray;
    }
}
exports.NamespaceMetadataTransactionBodyBuilder = NamespaceMetadataTransactionBodyBuilder;
//# sourceMappingURL=NamespaceMetadataTransactionBodyBuilder.js.map