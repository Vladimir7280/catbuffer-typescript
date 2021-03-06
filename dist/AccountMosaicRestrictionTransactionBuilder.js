"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountMosaicRestrictionTransactionBuilder = void 0;
const AccountMosaicRestrictionTransactionBodyBuilder_1 = require("./AccountMosaicRestrictionTransactionBodyBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const TransactionBuilder_1 = require("./TransactionBuilder");
class AccountMosaicRestrictionTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, restrictionFlags, restrictionAdditions, restrictionDeletions) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.accountMosaicRestrictionTransactionBody = new AccountMosaicRestrictionTransactionBodyBuilder_1.AccountMosaicRestrictionTransactionBodyBuilder(restrictionFlags, restrictionAdditions, restrictionDeletions);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const accountMosaicRestrictionTransactionBody = AccountMosaicRestrictionTransactionBodyBuilder_1.AccountMosaicRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountMosaicRestrictionTransactionBody.getSize());
        return new AccountMosaicRestrictionTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, accountMosaicRestrictionTransactionBody.restrictionFlags, accountMosaicRestrictionTransactionBody.restrictionAdditions, accountMosaicRestrictionTransactionBody.restrictionDeletions);
    }
    static createAccountMosaicRestrictionTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, restrictionFlags, restrictionAdditions, restrictionDeletions) {
        return new AccountMosaicRestrictionTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, restrictionFlags, restrictionAdditions, restrictionDeletions);
    }
    getRestrictionFlags() {
        return this.accountMosaicRestrictionTransactionBody.getRestrictionFlags();
    }
    getRestrictionAdditions() {
        return this.accountMosaicRestrictionTransactionBody.getRestrictionAdditions();
    }
    getRestrictionDeletions() {
        return this.accountMosaicRestrictionTransactionBody.getRestrictionDeletions();
    }
    getSize() {
        let size = super.getSize();
        size += this.accountMosaicRestrictionTransactionBody.getSize();
        return size;
    }
    getBody() {
        return this.accountMosaicRestrictionTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const accountMosaicRestrictionTransactionBodyBytes = this.accountMosaicRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountMosaicRestrictionTransactionBodyBytes);
        return newArray;
    }
}
exports.AccountMosaicRestrictionTransactionBuilder = AccountMosaicRestrictionTransactionBuilder;
//# sourceMappingURL=AccountMosaicRestrictionTransactionBuilder.js.map