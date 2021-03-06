"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultisigAccountModificationTransactionBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const MultisigAccountModificationTransactionBodyBuilder_1 = require("./MultisigAccountModificationTransactionBodyBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
class MultisigAccountModificationTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, minRemovalDelta, minApprovalDelta, addressAdditions, addressDeletions) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.multisigAccountModificationTransactionBody = new MultisigAccountModificationTransactionBodyBuilder_1.MultisigAccountModificationTransactionBodyBuilder(minRemovalDelta, minApprovalDelta, addressAdditions, addressDeletions);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const multisigAccountModificationTransactionBody = MultisigAccountModificationTransactionBodyBuilder_1.MultisigAccountModificationTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, multisigAccountModificationTransactionBody.getSize());
        return new MultisigAccountModificationTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, multisigAccountModificationTransactionBody.minRemovalDelta, multisigAccountModificationTransactionBody.minApprovalDelta, multisigAccountModificationTransactionBody.addressAdditions, multisigAccountModificationTransactionBody.addressDeletions);
    }
    static createMultisigAccountModificationTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, minRemovalDelta, minApprovalDelta, addressAdditions, addressDeletions) {
        return new MultisigAccountModificationTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, minRemovalDelta, minApprovalDelta, addressAdditions, addressDeletions);
    }
    getMinRemovalDelta() {
        return this.multisigAccountModificationTransactionBody.getMinRemovalDelta();
    }
    getMinApprovalDelta() {
        return this.multisigAccountModificationTransactionBody.getMinApprovalDelta();
    }
    getAddressAdditions() {
        return this.multisigAccountModificationTransactionBody.getAddressAdditions();
    }
    getAddressDeletions() {
        return this.multisigAccountModificationTransactionBody.getAddressDeletions();
    }
    getSize() {
        let size = super.getSize();
        size += this.multisigAccountModificationTransactionBody.getSize();
        return size;
    }
    getBody() {
        return this.multisigAccountModificationTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const multisigAccountModificationTransactionBodyBytes = this.multisigAccountModificationTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, multisigAccountModificationTransactionBodyBytes);
        return newArray;
    }
}
exports.MultisigAccountModificationTransactionBuilder = MultisigAccountModificationTransactionBuilder;
//# sourceMappingURL=MultisigAccountModificationTransactionBuilder.js.map