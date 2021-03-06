"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashLockTransactionBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const HashLockTransactionBodyBuilder_1 = require("./HashLockTransactionBodyBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
class HashLockTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, mosaic, duration, hash) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.hashLockTransactionBody = new HashLockTransactionBodyBuilder_1.HashLockTransactionBodyBuilder(mosaic, duration, hash);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const hashLockTransactionBody = HashLockTransactionBodyBuilder_1.HashLockTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, hashLockTransactionBody.getSize());
        return new HashLockTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, hashLockTransactionBody.mosaic, hashLockTransactionBody.duration, hashLockTransactionBody.hash);
    }
    static createHashLockTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, mosaic, duration, hash) {
        return new HashLockTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, mosaic, duration, hash);
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
exports.HashLockTransactionBuilder = HashLockTransactionBuilder;
//# sourceMappingURL=HashLockTransactionBuilder.js.map