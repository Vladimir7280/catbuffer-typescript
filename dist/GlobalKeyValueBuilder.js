"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalKeyValueBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicRestrictionKeyDto_1 = require("./MosaicRestrictionKeyDto");
const RestrictionRuleBuilder_1 = require("./RestrictionRuleBuilder");
class GlobalKeyValueBuilder {
    constructor(key, restrictionRule) {
        GeneratorUtils_1.GeneratorUtils.notNull(key, 'key is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(restrictionRule, 'restrictionRule is null or undefined');
        this.key = key;
        this.restrictionRule = restrictionRule;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const key = MosaicRestrictionKeyDto_1.MosaicRestrictionKeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, key.getSize());
        const restrictionRule = RestrictionRuleBuilder_1.RestrictionRuleBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, restrictionRule.getSize());
        return new GlobalKeyValueBuilder(key, restrictionRule);
    }
    static createGlobalKeyValueBuilder(key, restrictionRule) {
        return new GlobalKeyValueBuilder(key, restrictionRule);
    }
    getKey() {
        return this.key;
    }
    getRestrictionRule() {
        return this.restrictionRule;
    }
    getSize() {
        let size = 0;
        size += this.key.getSize();
        size += this.restrictionRule.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const keyBytes = this.key.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, keyBytes);
        const restrictionRuleBytes = this.restrictionRule.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionRuleBytes);
        return newArray;
    }
}
exports.GlobalKeyValueBuilder = GlobalKeyValueBuilder;
//# sourceMappingURL=GlobalKeyValueBuilder.js.map