"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedMosaicDefinitionTransactionBuilder = void 0;
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicDefinitionTransactionBodyBuilder_1 = require("./MosaicDefinitionTransactionBodyBuilder");
class EmbeddedMosaicDefinitionTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, id, duration, nonce, flags, divisibility) {
        super(signerPublicKey, version, network, type);
        this.mosaicDefinitionTransactionBody = new MosaicDefinitionTransactionBodyBuilder_1.MosaicDefinitionTransactionBodyBuilder(id, duration, nonce, flags, divisibility);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const mosaicDefinitionTransactionBody = MosaicDefinitionTransactionBodyBuilder_1.MosaicDefinitionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicDefinitionTransactionBody.getSize());
        return new EmbeddedMosaicDefinitionTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, mosaicDefinitionTransactionBody.id, mosaicDefinitionTransactionBody.duration, mosaicDefinitionTransactionBody.nonce, mosaicDefinitionTransactionBody.flags, mosaicDefinitionTransactionBody.divisibility);
    }
    static createEmbeddedMosaicDefinitionTransactionBuilder(signerPublicKey, version, network, type, id, duration, nonce, flags, divisibility) {
        return new EmbeddedMosaicDefinitionTransactionBuilder(signerPublicKey, version, network, type, id, duration, nonce, flags, divisibility);
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
exports.EmbeddedMosaicDefinitionTransactionBuilder = EmbeddedMosaicDefinitionTransactionBuilder;
//# sourceMappingURL=EmbeddedMosaicDefinitionTransactionBuilder.js.map