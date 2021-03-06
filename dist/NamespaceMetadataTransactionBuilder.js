"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamespaceMetadataTransactionBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const NamespaceMetadataTransactionBodyBuilder_1 = require("./NamespaceMetadataTransactionBodyBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
class NamespaceMetadataTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, targetAddress, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.namespaceMetadataTransactionBody = new NamespaceMetadataTransactionBodyBuilder_1.NamespaceMetadataTransactionBodyBuilder(targetAddress, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const namespaceMetadataTransactionBody = NamespaceMetadataTransactionBodyBuilder_1.NamespaceMetadataTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, namespaceMetadataTransactionBody.getSize());
        return new NamespaceMetadataTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, namespaceMetadataTransactionBody.targetAddress, namespaceMetadataTransactionBody.scopedMetadataKey, namespaceMetadataTransactionBody.targetNamespaceId, namespaceMetadataTransactionBody.valueSizeDelta, namespaceMetadataTransactionBody.value);
    }
    static createNamespaceMetadataTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, targetAddress, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value) {
        return new NamespaceMetadataTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, targetAddress, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value);
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
exports.NamespaceMetadataTransactionBuilder = NamespaceMetadataTransactionBuilder;
//# sourceMappingURL=NamespaceMetadataTransactionBuilder.js.map