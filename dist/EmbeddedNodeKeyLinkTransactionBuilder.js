"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedNodeKeyLinkTransactionBuilder = void 0;
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const NodeKeyLinkTransactionBodyBuilder_1 = require("./NodeKeyLinkTransactionBodyBuilder");
class EmbeddedNodeKeyLinkTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, linkedPublicKey, linkAction) {
        super(signerPublicKey, version, network, type);
        this.nodeKeyLinkTransactionBody = new NodeKeyLinkTransactionBodyBuilder_1.NodeKeyLinkTransactionBodyBuilder(linkedPublicKey, linkAction);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const nodeKeyLinkTransactionBody = NodeKeyLinkTransactionBodyBuilder_1.NodeKeyLinkTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, nodeKeyLinkTransactionBody.getSize());
        return new EmbeddedNodeKeyLinkTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, nodeKeyLinkTransactionBody.linkedPublicKey, nodeKeyLinkTransactionBody.linkAction);
    }
    static createEmbeddedNodeKeyLinkTransactionBuilder(signerPublicKey, version, network, type, linkedPublicKey, linkAction) {
        return new EmbeddedNodeKeyLinkTransactionBuilder(signerPublicKey, version, network, type, linkedPublicKey, linkAction);
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
exports.EmbeddedNodeKeyLinkTransactionBuilder = EmbeddedNodeKeyLinkTransactionBuilder;
//# sourceMappingURL=EmbeddedNodeKeyLinkTransactionBuilder.js.map