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

import { AmountDto } from './AmountDto';
import { GeneratorUtils } from './GeneratorUtils';
import { Hash256Dto } from './Hash256Dto';
import { LockHashAlgorithmDto } from './LockHashAlgorithmDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { SecretProofTransactionBodyBuilder } from './SecretProofTransactionBodyBuilder';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder } from './TransactionBuilder';
import { TransactionTypeDto } from './TransactionTypeDto';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';

/**
* Conclude a token swap between different chains.
Use a SecretProofTransaction to unlock the funds locked by a SecretLockTransaction.
The transaction must prove knowing the *proof* that unlocks the mosaics.
**/
export class SecretProofTransactionBuilder extends TransactionBuilder implements Serializer {
    /** Secret proof transaction body. **/
    readonly secretProofTransactionBody: SecretProofTransactionBodyBuilder;

    /**
     * Constructor.
     *
     * @param signature Entity's signature generated by the signing account..
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param fee Transaction fee.
     * @param deadline Transaction deadline.
     * @param recipientAddress Address that receives the funds once unlocked..
     * @param secret Hashed proof..
     * @param hashAlgorithm Algorithm used to hash the proof..
     * @param proof Original random set of bytes that were hashed..
     */
    public constructor(
        signature: SignatureDto,
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        fee: AmountDto,
        deadline: TimestampDto,
        recipientAddress: UnresolvedAddressDto,
        secret: Hash256Dto,
        hashAlgorithm: LockHashAlgorithmDto,
        proof: Uint8Array,
    ) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.secretProofTransactionBody = new SecretProofTransactionBodyBuilder(recipientAddress, secret, hashAlgorithm, proof);
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): SecretProofTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const secretProofTransactionBody: SecretProofTransactionBodyBuilder = SecretProofTransactionBodyBuilder.loadFromBinary(
            Uint8Array.from(byteArray),
        );
        byteArray.splice(0, secretProofTransactionBody.getSize());
        return new SecretProofTransactionBuilder(
            superObject.signature,
            superObject.signerPublicKey,
            superObject.version,
            superObject.network,
            superObject.type,
            superObject.fee,
            superObject.deadline,
            secretProofTransactionBody.recipientAddress,
            secretProofTransactionBody.secret,
            secretProofTransactionBody.hashAlgorithm,
            secretProofTransactionBody.proof,
        );
    }

    /**
     * Creates an instance of SecretProofTransactionBuilder.
     *
     * @param signature Entity's signature generated by the signing account..
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param fee Transaction fee.
     * @param deadline Transaction deadline.
     * @param recipientAddress Address that receives the funds once unlocked..
     * @param secret Hashed proof..
     * @param hashAlgorithm Algorithm used to hash the proof..
     * @param proof Original random set of bytes that were hashed..
     * @return Instance of SecretProofTransactionBuilder.
     */
    public static createSecretProofTransactionBuilder(
        signature: SignatureDto,
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        fee: AmountDto,
        deadline: TimestampDto,
        recipientAddress: UnresolvedAddressDto,
        secret: Hash256Dto,
        hashAlgorithm: LockHashAlgorithmDto,
        proof: Uint8Array,
    ): SecretProofTransactionBuilder {
        return new SecretProofTransactionBuilder(
            signature,
            signerPublicKey,
            version,
            network,
            type,
            fee,
            deadline,
            recipientAddress,
            secret,
            hashAlgorithm,
            proof,
        );
    }

    /**
     * Gets Address that receives the funds once unlocked..
     *
     * @return Address that receives the funds once unlocked..
     */
    public getRecipientAddress(): UnresolvedAddressDto {
        return this.secretProofTransactionBody.getRecipientAddress();
    }

    /**
     * Gets Hashed proof..
     *
     * @return Hashed proof..
     */
    public getSecret(): Hash256Dto {
        return this.secretProofTransactionBody.getSecret();
    }

    /**
     * Gets Algorithm used to hash the proof..
     *
     * @return Algorithm used to hash the proof..
     */
    public getHashAlgorithm(): LockHashAlgorithmDto {
        return this.secretProofTransactionBody.getHashAlgorithm();
    }

    /**
     * Gets Original random set of bytes that were hashed..
     *
     * @return Original random set of bytes that were hashed..
     */
    public getProof(): Uint8Array {
        return this.secretProofTransactionBody.getProof();
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = super.getSize();
        size += this.secretProofTransactionBody.getSize(); // secretProofTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public getBody(): SecretProofTransactionBodyBuilder {
        return this.secretProofTransactionBody;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const secretProofTransactionBodyBytes = this.secretProofTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, secretProofTransactionBodyBytes);
        return newArray;
    }
}