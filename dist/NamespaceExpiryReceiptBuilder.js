"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamespaceExpiryReceiptBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const NamespaceIdDto_1 = require("./NamespaceIdDto");
const ReceiptBuilder_1 = require("./ReceiptBuilder");
class NamespaceExpiryReceiptBuilder extends ReceiptBuilder_1.ReceiptBuilder {
    constructor(version, type, artifactId) {
        super(version, type);
        GeneratorUtils_1.GeneratorUtils.notNull(artifactId, 'artifactId is null or undefined');
        this.artifactId = artifactId;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = ReceiptBuilder_1.ReceiptBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const artifactId = NamespaceIdDto_1.NamespaceIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, artifactId.getSize());
        return new NamespaceExpiryReceiptBuilder(superObject.version, superObject.type, artifactId);
    }
    static createNamespaceExpiryReceiptBuilder(version, type, artifactId) {
        return new NamespaceExpiryReceiptBuilder(version, type, artifactId);
    }
    getArtifactId() {
        return this.artifactId;
    }
    getSize() {
        let size = super.getSize();
        size += this.artifactId.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const artifactIdBytes = this.artifactId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, artifactIdBytes);
        return newArray;
    }
}
exports.NamespaceExpiryReceiptBuilder = NamespaceExpiryReceiptBuilder;
//# sourceMappingURL=NamespaceExpiryReceiptBuilder.js.map