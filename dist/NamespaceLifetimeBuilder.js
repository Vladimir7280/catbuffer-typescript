"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamespaceLifetimeBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const HeightDto_1 = require("./HeightDto");
class NamespaceLifetimeBuilder {
    constructor(lifetimeStart, lifetimeEnd) {
        GeneratorUtils_1.GeneratorUtils.notNull(lifetimeStart, 'lifetimeStart is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(lifetimeEnd, 'lifetimeEnd is null or undefined');
        this.lifetimeStart = lifetimeStart;
        this.lifetimeEnd = lifetimeEnd;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const lifetimeStart = HeightDto_1.HeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, lifetimeStart.getSize());
        const lifetimeEnd = HeightDto_1.HeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, lifetimeEnd.getSize());
        return new NamespaceLifetimeBuilder(lifetimeStart, lifetimeEnd);
    }
    static createNamespaceLifetimeBuilder(lifetimeStart, lifetimeEnd) {
        return new NamespaceLifetimeBuilder(lifetimeStart, lifetimeEnd);
    }
    getLifetimeStart() {
        return this.lifetimeStart;
    }
    getLifetimeEnd() {
        return this.lifetimeEnd;
    }
    getSize() {
        let size = 0;
        size += this.lifetimeStart.getSize();
        size += this.lifetimeEnd.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const lifetimeStartBytes = this.lifetimeStart.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, lifetimeStartBytes);
        const lifetimeEndBytes = this.lifetimeEnd.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, lifetimeEndBytes);
        return newArray;
    }
}
exports.NamespaceLifetimeBuilder = NamespaceLifetimeBuilder;
//# sourceMappingURL=NamespaceLifetimeBuilder.js.map