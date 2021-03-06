"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedNamespaceMetadataTransactionBuilder = void 0;
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const NamespaceMetadataTransactionBodyBuilder_1 = require("./NamespaceMetadataTransactionBodyBuilder");
class EmbeddedNamespaceMetadataTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, targetAddress, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value) {
        super(signerPublicKey, version, network, type);
        this.namespaceMetadataTransactionBody = new NamespaceMetadataTransactionBodyBuilder_1.NamespaceMetadataTransactionBodyBuilder(targetAddress, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const namespaceMetadataTransactionBody = NamespaceMetadataTransactionBodyBuilder_1.NamespaceMetadataTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, namespaceMetadataTransactionBody.getSize());
        return new EmbeddedNamespaceMetadataTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, namespaceMetadataTransactionBody.targetAddress, namespaceMetadataTransactionBody.scopedMetadataKey, namespaceMetadataTransactionBody.targetNamespaceId, namespaceMetadataTransactionBody.valueSizeDelta, namespaceMetadataTransactionBody.value);
    }
    static createEmbeddedNamespaceMetadataTransactionBuilder(signerPublicKey, version, network, type, targetAddress, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value) {
        return new EmbeddedNamespaceMetadataTransactionBuilder(signerPublicKey, version, network, type, targetAddress, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value);
    }
    getTargetAddress() {
        return this.namespaceMetadataTransactionBody.getTargetAddress();
    }
    getScopedMetadataKey() {
        return this.namespaceMetadataTransactionBody.getScopedMetadataKey();
    }
    getTargetNamespaceId() {
        return this.namespaceMetadataTransactionBody.getTargetNamespaceId();
    }
    getValueSizeDelta() {
        return this.namespaceMetadataTransactionBody.getValueSizeDelta();
    }
    getValue() {
        return this.namespaceMetadataTransactionBody.getValue();
    }
    getSize() {
        let size = super.getSize();
        size += this.namespaceMetadataTransactionBody.getSize();
        return size;
    }
    getBody() {
        return this.namespaceMetadataTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const namespaceMetadataTransactionBodyBytes = this.namespaceMetadataTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, namespaceMetadataTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedNamespaceMetadataTransactionBuilder = EmbeddedNamespaceMetadataTransactionBuilder;
//# sourceMappingURL=EmbeddedNamespaceMetadataTransactionBuilder.js.map