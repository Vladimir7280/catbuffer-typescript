"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedAccountKeyLinkTransactionBuilder = void 0;
const AccountKeyLinkTransactionBodyBuilder_1 = require("./AccountKeyLinkTransactionBodyBuilder");
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
class EmbeddedAccountKeyLinkTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, linkedPublicKey, linkAction) {
        super(signerPublicKey, version, network, type);
        this.accountKeyLinkTransactionBody = new AccountKeyLinkTransactionBodyBuilder_1.AccountKeyLinkTransactionBodyBuilder(linkedPublicKey, linkAction);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const accountKeyLinkTransactionBody = AccountKeyLinkTransactionBodyBuilder_1.AccountKeyLinkTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountKeyLinkTransactionBody.getSize());
        return new EmbeddedAccountKeyLinkTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, accountKeyLinkTransactionBody.linkedPublicKey, accountKeyLinkTransactionBody.linkAction);
    }
    static createEmbeddedAccountKeyLinkTransactionBuilder(signerPublicKey, version, network, type, linkedPublicKey, linkAction) {
        return new EmbeddedAccountKeyLinkTransactionBuilder(signerPublicKey, version, network, type, linkedPublicKey, linkAction);
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
exports.EmbeddedAccountKeyLinkTransactionBuilder = EmbeddedAccountKeyLinkTransactionBuilder;
//# sourceMappingURL=EmbeddedAccountKeyLinkTransactionBuilder.js.map