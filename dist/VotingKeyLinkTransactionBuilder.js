"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VotingKeyLinkTransactionBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const TransactionBuilder_1 = require("./TransactionBuilder");
const VotingKeyLinkTransactionBodyBuilder_1 = require("./VotingKeyLinkTransactionBodyBuilder");
class VotingKeyLinkTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, linkedPublicKey, startEpoch, endEpoch, linkAction) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.votingKeyLinkTransactionBody = new VotingKeyLinkTransactionBodyBuilder_1.VotingKeyLinkTransactionBodyBuilder(linkedPublicKey, startEpoch, endEpoch, linkAction);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const votingKeyLinkTransactionBody = VotingKeyLinkTransactionBodyBuilder_1.VotingKeyLinkTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, votingKeyLinkTransactionBody.getSize());
        return new VotingKeyLinkTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, votingKeyLinkTransactionBody.linkedPublicKey, votingKeyLinkTransactionBody.startEpoch, votingKeyLinkTransactionBody.endEpoch, votingKeyLinkTransactionBody.linkAction);
    }
    static createVotingKeyLinkTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, linkedPublicKey, startEpoch, endEpoch, linkAction) {
        return new VotingKeyLinkTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, linkedPublicKey, startEpoch, endEpoch, linkAction);
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
exports.VotingKeyLinkTransactionBuilder = VotingKeyLinkTransactionBuilder;
//# sourceMappingURL=VotingKeyLinkTransactionBuilder.js.map