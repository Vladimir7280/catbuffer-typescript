import { Serializer } from './Serializer';
export declare class Hash256Dto implements Serializer {
    readonly hash256: Uint8Array;
    constructor(hash256: Uint8Array);
    static loadFromBinary(payload: Uint8Array): Hash256Dto;
    getHash256(): Uint8Array;
    getSize(): number;
    serialize(): Uint8Array;
}
