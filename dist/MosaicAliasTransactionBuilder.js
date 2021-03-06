"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicAliasTransactionBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicAliasTransactionBodyBuilder_1 = require("./MosaicAliasTransactionBodyBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
class MosaicAliasTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, namespaceId, mosaicId, aliasAction) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.mosaicAliasTransactionBody = new MosaicAliasTransactionBodyBuilder_1.MosaicAliasTransactionBodyBuilder(namespaceId, mosaicId, aliasAction);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const mosaicAliasTransactionBody = MosaicAliasTransactionBodyBuilder_1.MosaicAliasTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicAliasTransactionBody.getSize());
        return new MosaicAliasTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, mosaicAliasTransactionBody.namespaceId, mosaicAliasTransactionBody.mosaicId, mosaicAliasTransactionBody.aliasAction);
    }
    static createMosaicAliasTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, namespaceId, mosaicId, aliasAction) {
        return new MosaicAliasTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, namespaceId, mosaicId, aliasAction);
    }
    getNamespaceId() {
        return this.mosaicAliasTransactionBody.getNamespaceId();
    }
    getMosaicId() {
        return this.mosaicAliasTransactionBody.getMosaicId();
    }
    getAliasAction() {
        return this.mosaicAliasTransactionBody.getAliasAction();
    }
    getSize() {
        let size = super.getSize();
        size += this.mosaicAliasTransactionBody.getSize();
        return size;
    }
    getBody() {
        return this.mosaicAliasTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const mosaicAliasTransactionBodyBytes = this.mosaicAliasTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicAliasTransactionBodyBytes);
        return newArray;
    }
}
exports.MosaicAliasTransactionBuilder = MosaicAliasTransactionBuilder;
//# sourceMappingURL=MosaicAliasTransactionBuilder.js.map