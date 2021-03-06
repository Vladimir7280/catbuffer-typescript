"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedAccountAddressRestrictionTransactionBuilder = void 0;
const AccountAddressRestrictionTransactionBodyBuilder_1 = require("./AccountAddressRestrictionTransactionBodyBuilder");
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
class EmbeddedAccountAddressRestrictionTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, restrictionFlags, restrictionAdditions, restrictionDeletions) {
        super(signerPublicKey, version, network, type);
        this.accountAddressRestrictionTransactionBody = new AccountAddressRestrictionTransactionBodyBuilder_1.AccountAddressRestrictionTransactionBodyBuilder(restrictionFlags, restrictionAdditions, restrictionDeletions);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const accountAddressRestrictionTransactionBody = AccountAddressRestrictionTransactionBodyBuilder_1.AccountAddressRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountAddressRestrictionTransactionBody.getSize());
        return new EmbeddedAccountAddressRestrictionTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, accountAddressRestrictionTransactionBody.restrictionFlags, accountAddressRestrictionTransactionBody.restrictionAdditions, accountAddressRestrictionTransactionBody.restrictionDeletions);
    }
    static createEmbeddedAccountAddressRestrictionTransactionBuilder(signerPublicKey, version, network, type, restrictionFlags, restrictionAdditions, restrictionDeletions) {
        return new EmbeddedAccountAddressRestrictionTransactionBuilder(signerPublicKey, version, network, type, restrictionFlags, restrictionAdditions, restrictionDeletions);
    }
    getRestrictionFlags() {
        return this.accountAddressRestrictionTransactionBody.getRestrictionFlags();
    }
    getRestrictionAdditions() {
        return this.accountAddressRestrictionTransactionBody.getRestrictionAdditions();
    }
    getRestrictionDeletions() {
        return this.accountAddressRestrictionTransactionBody.getRestrictionDeletions();
    }
    getSize() {
        let size = super.getSize();
        size += this.accountAddressRestrictionTransactionBody.getSize();
        return size;
    }
    getBody() {
        return this.accountAddressRestrictionTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const accountAddressRestrictionTransactionBodyBytes = this.accountAddressRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountAddressRestrictionTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedAccountAddressRestrictionTransactionBuilder = EmbeddedAccountAddressRestrictionTransactionBuilder;
//# sourceMappingURL=EmbeddedAccountAddressRestrictionTransactionBuilder.js.map