"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VrfKeyLinkTransactionBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const TransactionBuilder_1 = require("./TransactionBuilder");
const VrfKeyLinkTransactionBodyBuilder_1 = require("./VrfKeyLinkTransactionBodyBuilder");
class VrfKeyLinkTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, linkedPublicKey, linkAction) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.vrfKeyLinkTransactionBody = new VrfKeyLinkTransactionBodyBuilder_1.VrfKeyLinkTransactionBodyBuilder(linkedPublicKey, linkAction);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const vrfKeyLinkTransactionBody = VrfKeyLinkTransactionBodyBuilder_1.VrfKeyLinkTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, vrfKeyLinkTransactionBody.getSize());
        return new VrfKeyLinkTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, vrfKeyLinkTransactionBody.linkedPublicKey, vrfKeyLinkTransactionBody.linkAction);
    }
    static createVrfKeyLinkTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, linkedPublicKey, linkAction) {
        return new VrfKeyLinkTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, linkedPublicKey, linkAction);
    }
    getLinkedPublicKey() {
        return this.vrfKeyLinkTransactionBody.getLinkedPublicKey();
    }
    getLinkAction() {
        return this.vrfKeyLinkTransactionBody.getLinkAction();
    }
    getSize() {
        let size = super.getSize();
        size += this.vrfKeyLinkTransactionBody.getSize();
        return size;
    }
    getBody() {
        return this.vrfKeyLinkTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const vrfKeyLinkTransactionBodyBytes = this.vrfKeyLinkTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, vrfKeyLinkTransactionBodyBytes);
        return newArray;
    }
}
exports.VrfKeyLinkTransactionBuilder = VrfKeyLinkTransactionBuilder;
//# sourceMappingURL=VrfKeyLinkTransactionBuilder.js.map