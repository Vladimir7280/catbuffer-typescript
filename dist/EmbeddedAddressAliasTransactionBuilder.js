"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedAddressAliasTransactionBuilder = void 0;
const AddressAliasTransactionBodyBuilder_1 = require("./AddressAliasTransactionBodyBuilder");
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
class EmbeddedAddressAliasTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, namespaceId, address, aliasAction) {
        super(signerPublicKey, version, network, type);
        this.addressAliasTransactionBody = new AddressAliasTransactionBodyBuilder_1.AddressAliasTransactionBodyBuilder(namespaceId, address, aliasAction);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const addressAliasTransactionBody = AddressAliasTransactionBodyBuilder_1.AddressAliasTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, addressAliasTransactionBody.getSize());
        return new EmbeddedAddressAliasTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, addressAliasTransactionBody.namespaceId, addressAliasTransactionBody.address, addressAliasTransactionBody.aliasAction);
    }
    static createEmbeddedAddressAliasTransactionBuilder(signerPublicKey, version, network, type, namespaceId, address, aliasAction) {
        return new EmbeddedAddressAliasTransactionBuilder(signerPublicKey, version, network, type, namespaceId, address, aliasAction);
    }
    getNamespaceId() {
        return this.addressAliasTransactionBody.getNamespaceId();
    }
    getAddress() {
        return this.addressAliasTransactionBody.getAddress();
    }
    getAliasAction() {
        return this.addressAliasTransactionBody.getAliasAction();
    }
    getSize() {
        let size = super.getSize();
        size += this.addressAliasTransactionBody.getSize();
        return size;
    }
    getBody() {
        return this.addressAliasTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const addressAliasTransactionBodyBytes = this.addressAliasTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, addressAliasTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedAddressAliasTransactionBuilder = EmbeddedAddressAliasTransactionBuilder;
//# sourceMappingURL=EmbeddedAddressAliasTransactionBuilder.js.map