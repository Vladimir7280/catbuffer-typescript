"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressAliasTransactionBuilder = void 0;
const AddressAliasTransactionBodyBuilder_1 = require("./AddressAliasTransactionBodyBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const TransactionBuilder_1 = require("./TransactionBuilder");
class AddressAliasTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, namespaceId, address, aliasAction) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.addressAliasTransactionBody = new AddressAliasTransactionBodyBuilder_1.AddressAliasTransactionBodyBuilder(namespaceId, address, aliasAction);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const addressAliasTransactionBody = AddressAliasTransactionBodyBuilder_1.AddressAliasTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, addressAliasTransactionBody.getSize());
        return new AddressAliasTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, addressAliasTransactionBody.namespaceId, addressAliasTransactionBody.address, addressAliasTransactionBody.aliasAction);
    }
    static createAddressAliasTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, namespaceId, address, aliasAction) {
        return new AddressAliasTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, namespaceId, address, aliasAction);
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
exports.AddressAliasTransactionBuilder = AddressAliasTransactionBuilder;
//# sourceMappingURL=AddressAliasTransactionBuilder.js.map