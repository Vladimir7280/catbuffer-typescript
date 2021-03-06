"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicSupplyChangeTransactionBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicSupplyChangeTransactionBodyBuilder_1 = require("./MosaicSupplyChangeTransactionBodyBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
class MosaicSupplyChangeTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, mosaicId, delta, action) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.mosaicSupplyChangeTransactionBody = new MosaicSupplyChangeTransactionBodyBuilder_1.MosaicSupplyChangeTransactionBodyBuilder(mosaicId, delta, action);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const mosaicSupplyChangeTransactionBody = MosaicSupplyChangeTransactionBodyBuilder_1.MosaicSupplyChangeTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicSupplyChangeTransactionBody.getSize());
        return new MosaicSupplyChangeTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, mosaicSupplyChangeTransactionBody.mosaicId, mosaicSupplyChangeTransactionBody.delta, mosaicSupplyChangeTransactionBody.action);
    }
    static createMosaicSupplyChangeTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, mosaicId, delta, action) {
        return new MosaicSupplyChangeTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, mosaicId, delta, action);
    }
    getMosaicId() {
        return this.mosaicSupplyChangeTransactionBody.getMosaicId();
    }
    getDelta() {
        return this.mosaicSupplyChangeTransactionBody.getDelta();
    }
    getAction() {
        return this.mosaicSupplyChangeTransactionBody.getAction();
    }
    getSize() {
        let size = super.getSize();
        size += this.mosaicSupplyChangeTransactionBody.getSize();
        return size;
    }
    getBody() {
        return this.mosaicSupplyChangeTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const mosaicSupplyChangeTransactionBodyBytes = this.mosaicSupplyChangeTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicSupplyChangeTransactionBodyBytes);
        return newArray;
    }
}
exports.MosaicSupplyChangeTransactionBuilder = MosaicSupplyChangeTransactionBuilder;
//# sourceMappingURL=MosaicSupplyChangeTransactionBuilder.js.map