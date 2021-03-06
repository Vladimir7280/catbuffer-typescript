"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicDefinitionBuilder = void 0;
const AddressDto_1 = require("./AddressDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const HeightDto_1 = require("./HeightDto");
const MosaicPropertiesBuilder_1 = require("./MosaicPropertiesBuilder");
class MosaicDefinitionBuilder {
    constructor(startHeight, ownerAddress, revision, properties) {
        GeneratorUtils_1.GeneratorUtils.notNull(startHeight, 'startHeight is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(ownerAddress, 'ownerAddress is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(revision, 'revision is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(properties, 'properties is null or undefined');
        this.startHeight = startHeight;
        this.ownerAddress = ownerAddress;
        this.revision = revision;
        this.properties = properties;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const startHeight = HeightDto_1.HeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, startHeight.getSize());
        const ownerAddress = AddressDto_1.AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, ownerAddress.getSize());
        const revision = GeneratorUtils_1.GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const properties = MosaicPropertiesBuilder_1.MosaicPropertiesBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, properties.getSize());
        return new MosaicDefinitionBuilder(startHeight, ownerAddress, revision, properties);
    }
    static createMosaicDefinitionBuilder(startHeight, ownerAddress, revision, properties) {
        return new MosaicDefinitionBuilder(startHeight, ownerAddress, revision, properties);
    }
    getStartHeight() {
        return this.startHeight;
    }
    getOwnerAddress() {
        return this.ownerAddress;
    }
    getRevision() {
        return this.revision;
    }
    getProperties() {
        return this.properties;
    }
    getSize() {
        let size = 0;
        size += this.startHeight.getSize();
        size += this.ownerAddress.getSize();
        size += 4;
        size += this.properties.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const startHeightBytes = this.startHeight.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, startHeightBytes);
        const ownerAddressBytes = this.ownerAddress.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, ownerAddressBytes);
        const revisionBytes = GeneratorUtils_1.GeneratorUtils.uint32ToBuffer(this.getRevision());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, revisionBytes);
        const propertiesBytes = this.properties.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, propertiesBytes);
        return newArray;
    }
}
exports.MosaicDefinitionBuilder = MosaicDefinitionBuilder;
//# sourceMappingURL=MosaicDefinitionBuilder.js.map