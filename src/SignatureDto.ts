/**
 *** Copyright (c) 2016-2019, Jaguar0625, gimre, BloodyRookie, Tech Bureau, Corp.
 *** Copyright (c) 2020-present, Jaguar0625, gimre, BloodyRookie.
 *** All rights reserved.
 ***
 *** This file is part of Catapult.
 ***
 *** Catapult is free software: you can redistribute it and/or modify
 *** it under the terms of the GNU Lesser General Public License as published by
 *** the Free Software Foundation, either version 3 of the License, or
 *** (at your option) any later version.
 ***
 *** Catapult is distributed in the hope that it will be useful,
 *** but WITHOUT ANY WARRANTY; without even the implied warranty of
 *** MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *** GNU Lesser General Public License for more details.
 ***
 *** You should have received a copy of the GNU Lesser General Public License
 *** along with Catapult. If not, see <http://www.gnu.org/licenses/>.
 **/

import { GeneratorUtils } from './GeneratorUtils';
import { Serializer } from './Serializer';

/** A 64-byte (512 bit) array certifying that the signed data has not been modified.
Symbol currently uses [Ed25519](https://ed25519.cr.yp.to/) signatures.. */
export class SignatureDto implements Serializer {
    /** A 64-byte (512 bit) array certifying that the signed data has not been modified.
Symbol currently uses [Ed25519](https://ed25519.cr.yp.to/) signatures.. */
    readonly signature: Uint8Array;

    /**
     * Constructor.
     *
     * @param signature A 64-byte (512 bit) array certifying that the signed data has not been modified.
Symbol currently uses [Ed25519](https://ed25519.cr.yp.to/) signatures..
     */
    constructor(signature: Uint8Array) {
        this.signature = signature;
    }

    /**
     * Creates an instance of SignatureDto from binary payload.
     *
     * @param payload Byte payload to use to serialize the object.
     * @return Instance of SignatureDto.
     */
    public static loadFromBinary(payload: Uint8Array): SignatureDto {
        const signature = GeneratorUtils.getBytes(Uint8Array.from(payload), 64);
        return new SignatureDto(signature);
    }

    /**
     * Gets A 64-byte (512 bit) array certifying that the signed data has not been modified.
Symbol currently uses [Ed25519](https://ed25519.cr.yp.to/) signatures..
     *
     * @return A 64-byte (512 bit) array certifying that the signed data has not been modified.
Symbol currently uses [Ed25519](https://ed25519.cr.yp.to/) signatures..
     */
    public getSignature(): Uint8Array {
        return this.signature;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        return 64;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        return this.getSignature();
    }
}
