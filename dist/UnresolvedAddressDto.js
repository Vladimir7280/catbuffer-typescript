"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnresolvedAddressDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class UnresolvedAddressDto {
    constructor(unresolvedAddress) {
        this.unresolvedAddress = unresolvedAddress;
    }
    static loadFromBinary(payload) {
        const unresolvedAddress = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(payload), 24);
        return new UnresolvedAddressDto(unresolvedAddress);
    }
    getUnresolvedAddress() {
        return this.unresolvedAddress;
    }
    getSize() {
        return 24;
    }
    serialize() {
        return this.getUnresolvedAddress();
    }
}
exports.UnresolvedAddressDto = UnresolvedAddressDto;
//# sourceMappingURL=UnresolvedAddressDto.js.map