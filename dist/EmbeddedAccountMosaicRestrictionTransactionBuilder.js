"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedAccountMosaicRestrictionTransactionBuilder = void 0;
const AccountMosaicRestrictionTransactionBodyBuilder_1 = require("./AccountMosaicRestrictionTransactionBodyBuilder");
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
class EmbeddedAccountMosaicRestrictionTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, restrictionFlags, restrictionAdditions, restrictionDeletions) {
        super(signerPublicKey, version, network, type);
        this.accountMosaicRestrictionTransactionBody = new AccountMosaicRestrictionTransactionBodyBuilder_1.AccountMosaicRestrictionTransactionBodyBuilder(restrictionFlags, restrictionAdditions, restrictionDeletions);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const accountMosaicRestrictionTransactionBody = AccountMosaicRestrictionTransactionBodyBuilder_1.AccountMosaicRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountMosaicRestrictionTransactionBody.getSize());
        return new EmbeddedAccountMosaicRestrictionTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, accountMosaicRestrictionTransactionBody.restrictionFlags, accountMosaicRestrictionTransactionBody.restrictionAdditions, accountMosaicRestrictionTransactionBody.restrictionDeletions);
    }
    static createEmbeddedAccountMosaicRestrictionTransactionBuilder(signerPublicKey, version, network, type, restrictionFlags, restrictionAdditions, restrictionDeletions) {
        return new EmbeddedAccountMosaicRestrictionTransactionBuilder(signerPublicKey, version, network, type, restrictionFlags, restrictionAdditions, restrictionDeletions);
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
exports.EmbeddedAccountMosaicRestrictionTransactionBuilder = EmbeddedAccountMosaicRestrictionTransactionBuilder;
//# sourceMappingURL=EmbeddedAccountMosaicRestrictionTransactionBuilder.js.map