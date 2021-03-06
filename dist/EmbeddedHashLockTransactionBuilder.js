"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedHashLockTransactionBuilder = void 0;
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const HashLockTransactionBodyBuilder_1 = require("./HashLockTransactionBodyBuilder");
class EmbeddedHashLockTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, mosaic, duration, hash) {
        super(signerPublicKey, version, network, type);
        this.hashLockTransactionBody = new HashLockTransactionBodyBuilder_1.HashLockTransactionBodyBuilder(mosaic, duration, hash);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const hashLockTransactionBody = HashLockTransactionBodyBuilder_1.HashLockTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, hashLockTransactionBody.getSize());
        return new EmbeddedHashLockTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, hashLockTransactionBody.mosaic, hashLockTransactionBody.duration, hashLockTransactionBody.hash);
    }
    static createEmbeddedHashLockTransactionBuilder(signerPublicKey, version, network, type, mosaic, duration, hash) {
        return new EmbeddedHashLockTransactionBuilder(signerPublicKey, version, network, type, mosaic, duration, hash);
    }
    getMosaic() {
        return this.hashLockTransactionBody.getMosaic();
    }
    getDuration() {
        return this.hashLockTransactionBody.getDuration();
    }
    getHash() {
        return this.hashLockTransactionBody.getHash();
    }
    getSize() {
        let size = super.getSize();
        size += this.hashLockTransactionBody.getSize();
        return size;
    }
    getBody() {
        return this.hashLockTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const hashLockTransactionBodyBytes = this.hashLockTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, hashLockTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedHashLockTransactionBuilder = EmbeddedHashLockTransactionBuilder;
//# sourceMappingURL=EmbeddedHashLockTransactionBuilder.js.map