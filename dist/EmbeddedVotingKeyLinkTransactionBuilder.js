"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedVotingKeyLinkTransactionBuilder = void 0;
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const VotingKeyLinkTransactionBodyBuilder_1 = require("./VotingKeyLinkTransactionBodyBuilder");
class EmbeddedVotingKeyLinkTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, linkedPublicKey, startEpoch, endEpoch, linkAction) {
        super(signerPublicKey, version, network, type);
        this.votingKeyLinkTransactionBody = new VotingKeyLinkTransactionBodyBuilder_1.VotingKeyLinkTransactionBodyBuilder(linkedPublicKey, startEpoch, endEpoch, linkAction);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const votingKeyLinkTransactionBody = VotingKeyLinkTransactionBodyBuilder_1.VotingKeyLinkTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, votingKeyLinkTransactionBody.getSize());
        return new EmbeddedVotingKeyLinkTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, votingKeyLinkTransactionBody.linkedPublicKey, votingKeyLinkTransactionBody.startEpoch, votingKeyLinkTransactionBody.endEpoch, votingKeyLinkTransactionBody.linkAction);
    }
    static createEmbeddedVotingKeyLinkTransactionBuilder(signerPublicKey, version, network, type, linkedPublicKey, startEpoch, endEpoch, linkAction) {
        return new EmbeddedVotingKeyLinkTransactionBuilder(signerPublicKey, version, network, type, linkedPublicKey, startEpoch, endEpoch, linkAction);
    }
    getLinkedPublicKey() {
        return this.votingKeyLinkTransactionBody.getLinkedPublicKey();
    }
    getStartEpoch() {
        return this.votingKeyLinkTransactionBody.getStartEpoch();
    }
    getEndEpoch() {
        return this.votingKeyLinkTransactionBody.getEndEpoch();
    }
    getLinkAction() {
        return this.votingKeyLinkTransactionBody.getLinkAction();
    }
    getSize() {
        let size = super.getSize();
        size += this.votingKeyLinkTransactionBody.getSize();
        return size;
    }
    getBody() {
        return this.votingKeyLinkTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const votingKeyLinkTransactionBodyBytes = this.votingKeyLinkTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, votingKeyLinkTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedVotingKeyLinkTransactionBuilder = EmbeddedVotingKeyLinkTransactionBuilder;
//# sourceMappingURL=EmbeddedVotingKeyLinkTransactionBuilder.js.map