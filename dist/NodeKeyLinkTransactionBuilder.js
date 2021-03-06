"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeKeyLinkTransactionBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const NodeKeyLinkTransactionBodyBuilder_1 = require("./NodeKeyLinkTransactionBodyBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
class NodeKeyLinkTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, linkedPublicKey, linkAction) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.nodeKeyLinkTransactionBody = new NodeKeyLinkTransactionBodyBuilder_1.NodeKeyLinkTransactionBodyBuilder(linkedPublicKey, linkAction);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const nodeKeyLinkTransactionBody = NodeKeyLinkTransactionBodyBuilder_1.NodeKeyLinkTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, nodeKeyLinkTransactionBody.getSize());
        return new NodeKeyLinkTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, nodeKeyLinkTransactionBody.linkedPublicKey, nodeKeyLinkTransactionBody.linkAction);
    }
    static createNodeKeyLinkTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, linkedPublicKey, linkAction) {
        return new NodeKeyLinkTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, linkedPublicKey, linkAction);
    }
    getLinkedPublicKey() {
        return this.nodeKeyLinkTransactionBody.getLinkedPublicKey();
    }
    getLinkAction() {
        return this.nodeKeyLinkTransactionBody.getLinkAction();
    }
    getSize() {
        let size = super.getSize();
        size += this.nodeKeyLinkTransactionBody.getSize();
        return size;
    }
    getBody() {
        return this.nodeKeyLinkTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const nodeKeyLinkTransactionBodyBytes = this.nodeKeyLinkTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, nodeKeyLinkTransactionBodyBytes);
        return newArray;
    }
}
exports.NodeKeyLinkTransactionBuilder = NodeKeyLinkTransactionBuilder;
//# sourceMappingURL=NodeKeyLinkTransactionBuilder.js.map