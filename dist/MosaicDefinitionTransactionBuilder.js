"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicDefinitionTransactionBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicDefinitionTransactionBodyBuilder_1 = require("./MosaicDefinitionTransactionBodyBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
class MosaicDefinitionTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, id, duration, nonce, flags, divisibility) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.mosaicDefinitionTransactionBody = new MosaicDefinitionTransactionBodyBuilder_1.MosaicDefinitionTransactionBodyBuilder(id, duration, nonce, flags, divisibility);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const mosaicDefinitionTransactionBody = MosaicDefinitionTransactionBodyBuilder_1.MosaicDefinitionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicDefinitionTransactionBody.getSize());
        return new MosaicDefinitionTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, mosaicDefinitionTransactionBody.id, mosaicDefinitionTransactionBody.duration, mosaicDefinitionTransactionBody.nonce, mosaicDefinitionTransactionBody.flags, mosaicDefinitionTransactionBody.divisibility);
    }
    static createMosaicDefinitionTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, id, duration, nonce, flags, divisibility) {
        return new MosaicDefinitionTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, id, duration, nonce, flags, divisibility);
    }
    getId() {
        return this.mosaicDefinitionTransactionBody.getId();
    }
    getDuration() {
        return this.mosaicDefinitionTransactionBody.getDuration();
    }
    getNonce() {
        return this.mosaicDefinitionTransactionBody.getNonce();
    }
    getFlags() {
        return this.mosaicDefinitionTransactionBody.getFlags();
    }
    getDivisibility() {
        return this.mosaicDefinitionTransactionBody.getDivisibility();
    }
    getSize() {
        let size = super.getSize();
        size += this.mosaicDefinitionTransactionBody.getSize();
        return size;
    }
    getBody() {
        return this.mosaicDefinitionTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const mosaicDefinitionTransactionBodyBytes = this.mosaicDefinitionTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicDefinitionTransactionBodyBytes);
        return newArray;
    }
}
exports.MosaicDefinitionTransactionBuilder = MosaicDefinitionTransactionBuilder;
//# sourceMappingURL=MosaicDefinitionTransactionBuilder.js.map