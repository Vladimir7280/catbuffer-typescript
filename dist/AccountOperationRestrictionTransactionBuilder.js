"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountOperationRestrictionTransactionBuilder = void 0;
const AccountOperationRestrictionTransactionBodyBuilder_1 = require("./AccountOperationRestrictionTransactionBodyBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const TransactionBuilder_1 = require("./TransactionBuilder");
class AccountOperationRestrictionTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, restrictionFlags, restrictionAdditions, restrictionDeletions) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.accountOperationRestrictionTransactionBody = new AccountOperationRestrictionTransactionBodyBuilder_1.AccountOperationRestrictionTransactionBodyBuilder(restrictionFlags, restrictionAdditions, restrictionDeletions);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const accountOperationRestrictionTransactionBody = AccountOperationRestrictionTransactionBodyBuilder_1.AccountOperationRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountOperationRestrictionTransactionBody.getSize());
        return new AccountOperationRestrictionTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, accountOperationRestrictionTransactionBody.restrictionFlags, accountOperationRestrictionTransactionBody.restrictionAdditions, accountOperationRestrictionTransactionBody.restrictionDeletions);
    }
    static createAccountOperationRestrictionTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, restrictionFlags, restrictionAdditions, restrictionDeletions) {
        return new AccountOperationRestrictionTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, restrictionFlags, restrictionAdditions, restrictionDeletions);
    }
    getRestrictionFlags() {
        return this.accountOperationRestrictionTransactionBody.getRestrictionFlags();
    }
    getRestrictionAdditions() {
        return this.accountOperationRestrictionTransactionBody.getRestrictionAdditions();
    }
    getRestrictionDeletions() {
        return this.accountOperationRestrictionTransactionBody.getRestrictionDeletions();
    }
    getSize() {
        let size = super.getSize();
        size += this.accountOperationRestrictionTransactionBody.getSize();
        return size;
    }
    getBody() {
        return this.accountOperationRestrictionTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const accountOperationRestrictionTransactionBodyBytes = this.accountOperationRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountOperationRestrictionTransactionBodyBytes);
        return newArray;
    }
}
exports.AccountOperationRestrictionTransactionBuilder = AccountOperationRestrictionTransactionBuilder;
//# sourceMappingURL=AccountOperationRestrictionTransactionBuilder.js.map