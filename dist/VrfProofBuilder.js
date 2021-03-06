"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VrfProofBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const ProofGammaDto_1 = require("./ProofGammaDto");
const ProofScalarDto_1 = require("./ProofScalarDto");
const ProofVerificationHashDto_1 = require("./ProofVerificationHashDto");
class VrfProofBuilder {
    constructor(gamma, verificationHash, scalar) {
        GeneratorUtils_1.GeneratorUtils.notNull(gamma, 'gamma is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(verificationHash, 'verificationHash is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(scalar, 'scalar is null or undefined');
        this.gamma = gamma;
        this.verificationHash = verificationHash;
        this.scalar = scalar;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const gamma = ProofGammaDto_1.ProofGammaDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, gamma.getSize());
        const verificationHash = ProofVerificationHashDto_1.ProofVerificationHashDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, verificationHash.getSize());
        const scalar = ProofScalarDto_1.ProofScalarDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, scalar.getSize());
        return new VrfProofBuilder(gamma, verificationHash, scalar);
    }
    static createVrfProofBuilder(gamma, verificationHash, scalar) {
        return new VrfProofBuilder(gamma, verificationHash, scalar);
    }
    getGamma() {
        return this.gamma;
    }
    getVerificationHash() {
        return this.verificationHash;
    }
    getScalar() {
        return this.scalar;
    }
    getSize() {
        let size = 0;
        size += this.gamma.getSize();
        size += this.verificationHash.getSize();
        size += this.scalar.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const gammaBytes = this.gamma.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, gammaBytes);
        const verificationHashBytes = this.verificationHash.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, verificationHashBytes);
        const scalarBytes = this.scalar.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, scalarBytes);
        return newArray;
    }
}
exports.VrfProofBuilder = VrfProofBuilder;
//# sourceMappingURL=VrfProofBuilder.js.map