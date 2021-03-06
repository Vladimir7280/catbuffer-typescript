"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedMosaicSupplyChangeTransactionBuilder = void 0;
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicSupplyChangeTransactionBodyBuilder_1 = require("./MosaicSupplyChangeTransactionBodyBuilder");
class EmbeddedMosaicSupplyChangeTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, mosaicId, delta, action) {
        super(signerPublicKey, version, network, type);
        this.mosaicSupplyChangeTransactionBody = new MosaicSupplyChangeTransactionBodyBuilder_1.MosaicSupplyChangeTransactionBodyBuilder(mosaicId, delta, action);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const mosaicSupplyChangeTransactionBody = MosaicSupplyChangeTransactionBodyBuilder_1.MosaicSupplyChangeTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicSupplyChangeTransactionBody.getSize());
        return new EmbeddedMosaicSupplyChangeTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, mosaicSupplyChangeTransactionBody.mosaicId, mosaicSupplyChangeTransactionBody.delta, mosaicSupplyChangeTransactionBody.action);
    }
    static createEmbeddedMosaicSupplyChangeTransactionBuilder(signerPublicKey, version, network, type, mosaicId, delta, action) {
        return new EmbeddedMosaicSupplyChangeTransactionBuilder(signerPublicKey, version, network, type, mosaicId, delta, action);
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
exports.EmbeddedMosaicSupplyChangeTransactionBuilder = EmbeddedMosaicSupplyChangeTransactionBuilder;
//# sourceMappingURL=EmbeddedMosaicSupplyChangeTransactionBuilder.js.map