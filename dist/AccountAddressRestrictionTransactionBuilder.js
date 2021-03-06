"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountAddressRestrictionTransactionBuilder = void 0;
const AccountAddressRestrictionTransactionBodyBuilder_1 = require("./AccountAddressRestrictionTransactionBodyBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const TransactionBuilder_1 = require("./TransactionBuilder");
class AccountAddressRestrictionTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, restrictionFlags, restrictionAdditions, restrictionDeletions) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.accountAddressRestrictionTransactionBody = new AccountAddressRestrictionTransactionBodyBuilder_1.AccountAddressRestrictionTransactionBodyBuilder(restrictionFlags, restrictionAdditions, restrictionDeletions);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const accountAddressRestrictionTransactionBody = AccountAddressRestrictionTransactionBodyBuilder_1.AccountAddressRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountAddressRestrictionTransactionBody.getSize());
        return new AccountAddressRestrictionTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, accountAddressRestrictionTransactionBody.restrictionFlags, accountAddressRestrictionTransactionBody.restrictionAdditions, accountAddressRestrictionTransactionBody.restrictionDeletions);
    }
    static createAccountAddressRestrictionTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, restrictionFlags, restrictionAdditions, restrictionDeletions) {
        return new AccountAddressRestrictionTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, restrictionFlags, restrictionAdditions, restrictionDeletions);
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
exports.AccountAddressRestrictionTransactionBuilder = AccountAddressRestrictionTransactionBuilder;
//# sourceMappingURL=AccountAddressRestrictionTransactionBuilder.js.map