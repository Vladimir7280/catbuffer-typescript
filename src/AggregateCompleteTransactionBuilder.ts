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

import { AggregateTransactionBodyBuilder } from './AggregateTransactionBodyBuilder';
import { AmountDto } from './AmountDto';
import { CosignatureBuilder } from './CosignatureBuilder';
import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { GeneratorUtils } from './GeneratorUtils';
import { Hash256Dto } from './Hash256Dto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder } from './TransactionBuilder';
import { TransactionTypeDto } from './TransactionTypeDto';

/**
* Send transactions in batches to different accounts.
Use this transaction when all required signatures are available when the transaction is created.
**/
export class AggregateCompleteTransactionBuilder extends TransactionBuilder implements Serializer {
    /** Aggregate transaction body. **/
    readonly aggregateTransactionBody: AggregateTransactionBodyBuilder;

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
    * @param transactionsHash Hash of the aggregate's transaction..
    * @param transactions Embedded transaction data.
Transactions are variable-sized and the total payload size is in bytes.
Embedded transactions cannot be aggregates..
    * @param cosignatures Cosignatures data.
Fills up remaining body space after transactions..
    */
    public constructor(
        signature: SignatureDto,
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        fee: AmountDto,
        deadline: TimestampDto,
        transactionsHash: Hash256Dto,
        transactions: EmbeddedTransactionBuilder[],
        cosignatures: CosignatureBuilder[],
    ) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.aggregateTransactionBody = new AggregateTransactionBodyBuilder(transactionsHash, transactions, cosignatures);
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): AggregateCompleteTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const aggregateTransactionBody: AggregateTransactionBodyBuilder = AggregateTransactionBodyBuilder.loadFromBinary(
            Uint8Array.from(byteArray),
        );
        byteArray.splice(0, aggregateTransactionBody.getSize());
        return new AggregateCompleteTransactionBuilder(
            superObject.signature,
            superObject.signerPublicKey,
            superObject.version,
            superObject.network,
            superObject.type,
            superObject.fee,
            superObject.deadline,
            aggregateTransactionBody.transactionsHash,
            aggregateTransactionBody.transactions,
            aggregateTransactionBody.cosignatures,
        );
    }

    /**
     * Creates an instance of AggregateCompleteTransactionBuilder.
     *
     * @param signature Entity's signature generated by the signing account..
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param fee Transaction fee.
     * @param deadline Transaction deadline.
     * @param transactionsHash Hash of the aggregate's transaction..
     * @param transactions Embedded transaction data.
Transactions are variable-sized and the total payload size is in bytes.
Embedded transactions cannot be aggregates..
     * @param cosignatures Cosignatures data.
Fills up remaining body space after transactions..
     * @return Instance of AggregateCompleteTransactionBuilder.
     */
    public static createAggregateCompleteTransactionBuilder(
        signature: SignatureDto,
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        fee: AmountDto,
        deadline: TimestampDto,
        transactionsHash: Hash256Dto,
        transactions: EmbeddedTransactionBuilder[],
        cosignatures: CosignatureBuilder[],
    ): AggregateCompleteTransactionBuilder {
        return new AggregateCompleteTransactionBuilder(
            signature,
            signerPublicKey,
            version,
            network,
            type,
            fee,
            deadline,
            transactionsHash,
            transactions,
            cosignatures,
        );
    }

    /**
     * Gets Hash of the aggregate's transaction..
     *
     * @return Hash of the aggregate's transaction..
     */
    public getTransactionsHash(): Hash256Dto {
        return this.aggregateTransactionBody.getTransactionsHash();
    }

    /**
     * Gets Embedded transaction data.
Transactions are variable-sized and the total payload size is in bytes.
Embedded transactions cannot be aggregates..
     *
     * @return Embedded transaction data.
Transactions are variable-sized and the total payload size is in bytes.
Embedded transactions cannot be aggregates..
     */
    public getTransactions(): EmbeddedTransactionBuilder[] {
        return this.aggregateTransactionBody.getTransactions();
    }

    /**
     * Gets Cosignatures data.
Fills up remaining body space after transactions..
     *
     * @return Cosignatures data.
Fills up remaining body space after transactions..
     */
    public getCosignatures(): CosignatureBuilder[] {
        return this.aggregateTransactionBody.getCosignatures();
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = super.getSize();
        size += this.aggregateTransactionBody.getSize(); // aggregateTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public getBody(): AggregateTransactionBodyBuilder {
        return this.aggregateTransactionBody;
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
        const aggregateTransactionBodyBytes = this.aggregateTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, aggregateTransactionBodyBytes);
        return newArray;
    }
}