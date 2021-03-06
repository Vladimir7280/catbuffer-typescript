"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountKeyLinkTransactionBuilder = void 0;
const AccountKeyLinkTransactionBodyBuilder_1 = require("./AccountKeyLinkTransactionBodyBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const TransactionBuilder_1 = require("./TransactionBuilder");
class AccountKeyLinkTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, linkedPublicKey, linkAction) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.accountKeyLinkTransactionBody = new AccountKeyLinkTransactionBodyBuilder_1.AccountKeyLinkTransactionBodyBuilder(linkedPublicKey, linkAction);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const accountKeyLinkTransactionBody = AccountKeyLinkTransactionBodyBuilder_1.AccountKeyLinkTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountKeyLinkTransactionBody.getSize());
        return new AccountKeyLinkTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, accountKeyLinkTransactionBody.linkedPublicKey, accountKeyLinkTransactionBody.linkAction);
    }
    static createAccountKeyLinkTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, linkedPublicKey, linkAction) {
        return new AccountKeyLinkTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, linkedPublicKey, linkAction);
    }
    getLinkedPublicKey() {
        return this.accountKeyLinkTransactionBody.getLinkedPublicKey();
    }
    getLinkAction() {
        return this.accountKeyLinkTransactionBody.getLinkAction();
    }
    getSize() {
        let size = super.getSize();
        size += this.accountKeyLinkTransactionBody.getSize();
        return size;
    }
    getBody() {
        return this.accountKeyLinkTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const accountKeyLinkTransactionBodyBytes = this.accountKeyLinkTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountKeyLinkTransactionBodyBytes);
        return newArray;
    }
}
exports.AccountKeyLinkTransactionBuilder = AccountKeyLinkTransactionBuilder;
//# sourceMappingURL=AccountKeyLinkTransactionBuilder.js.map