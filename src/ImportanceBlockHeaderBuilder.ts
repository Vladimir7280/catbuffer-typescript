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

import { AddressDto } from './AddressDto';
import { AmountDto } from './AmountDto';
import { BlockFeeMultiplierDto } from './BlockFeeMultiplierDto';
import { BlockHeaderBuilder } from './BlockHeaderBuilder';
import { BlockTypeDto } from './BlockTypeDto';
import { DifficultyDto } from './DifficultyDto';
import { GeneratorUtils } from './GeneratorUtils';
import { Hash256Dto } from './Hash256Dto';
import { HeightDto } from './HeightDto';
import { ImportanceBlockFooterBuilder } from './ImportanceBlockFooterBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { VrfProofBuilder } from './VrfProofBuilder';

/**
 * Binary layout for an importance block header
 **/
export class ImportanceBlockHeaderBuilder extends BlockHeaderBuilder implements Serializer {
    /** Importance block footer. **/
    readonly importanceBlockFooter: ImportanceBlockFooterBuilder;

    /**
     * Constructor.
     *
     * @param signature Entity's signature generated by the signing account..
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Block type.
     * @param height Block height.
     * @param timestamp Number of milliseconds elapsed since creation of nemesis block.
     * @param difficulty Block difficulty.
     * @param generationHashProof Generation hash proof.
     * @param previousBlockHash Previous block hash.
     * @param transactionsHash Hash of the transactions in this block.
     * @param receiptsHash Hash of the receipts generated by this block.
     * @param stateHash Hash of the global chain state at this block.
     * @param beneficiaryAddress Beneficiary address designated by harvester.
     * @param feeMultiplier Fee multiplier applied to block transactions.
     * @param totalSupply totalSupply.
     * @param feeToPay feeToPay.
     * @param inflation inflation.
     * @param collectedEpochFees collectedEpochFees.
     * @param votingEligibleAccountsCount Number of voting eligible accounts.
     * @param harvestingEligibleAccountsCount Number of harvesting eligible accounts.
     * @param totalVotingBalance Total balance eligible for voting.
     * @param previousImportanceBlockHash Previous importance block hash.
     */
    public constructor(
        signature: SignatureDto,
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: BlockTypeDto,
        height: HeightDto,
        timestamp: TimestampDto,
        difficulty: DifficultyDto,
        generationHashProof: VrfProofBuilder,
        previousBlockHash: Hash256Dto,
        transactionsHash: Hash256Dto,
        receiptsHash: Hash256Dto,
        stateHash: Hash256Dto,
        beneficiaryAddress: AddressDto,
        feeMultiplier: BlockFeeMultiplierDto,
        totalSupply: AmountDto,
        feeToPay: AmountDto,
        inflation: AmountDto,
        collectedEpochFees: AmountDto,
        votingEligibleAccountsCount: number,
        harvestingEligibleAccountsCount: number[],
        totalVotingBalance: AmountDto,
        previousImportanceBlockHash: Hash256Dto,
    ) {
        super(
            signature,
            signerPublicKey,
            version,
            network,
            type,
            height,
            timestamp,
            difficulty,
            generationHashProof,
            previousBlockHash,
            transactionsHash,
            receiptsHash,
            stateHash,
            beneficiaryAddress,
            feeMultiplier,
            totalSupply,
            feeToPay,
            inflation,
            collectedEpochFees,
        );
        this.importanceBlockFooter = new ImportanceBlockFooterBuilder(
            votingEligibleAccountsCount,
            harvestingEligibleAccountsCount,
            totalVotingBalance,
            previousImportanceBlockHash,
        );
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): ImportanceBlockHeaderBuilder {
        const byteArray = Array.from(payload);
        const superObject = BlockHeaderBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const importanceBlockFooter: ImportanceBlockFooterBuilder = ImportanceBlockFooterBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, importanceBlockFooter.getSize());
        return new ImportanceBlockHeaderBuilder(
            superObject.signature,
            superObject.signerPublicKey,
            superObject.version,
            superObject.network,
            superObject.type,
            superObject.height,
            superObject.timestamp,
            superObject.difficulty,
            superObject.generationHashProof,
            superObject.previousBlockHash,
            superObject.transactionsHash,
            superObject.receiptsHash,
            superObject.stateHash,
            superObject.beneficiaryAddress,
            superObject.feeMultiplier,
            superObject.totalSupply,
            superObject.feeToPay,
            superObject.inflation,
            superObject.collectedEpochFees,
            importanceBlockFooter.votingEligibleAccountsCount,
            importanceBlockFooter.harvestingEligibleAccountsCount,
            importanceBlockFooter.totalVotingBalance,
            importanceBlockFooter.previousImportanceBlockHash,
        );
    }

    /**
     * Creates an instance of ImportanceBlockHeaderBuilder.
     *
     * @param signature Entity's signature generated by the signing account..
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Block type.
     * @param height Block height.
     * @param timestamp Number of milliseconds elapsed since creation of nemesis block.
     * @param difficulty Block difficulty.
     * @param generationHashProof Generation hash proof.
     * @param previousBlockHash Previous block hash.
     * @param transactionsHash Hash of the transactions in this block.
     * @param receiptsHash Hash of the receipts generated by this block.
     * @param stateHash Hash of the global chain state at this block.
     * @param beneficiaryAddress Beneficiary address designated by harvester.
     * @param feeMultiplier Fee multiplier applied to block transactions.
     * @param totalSupply totalSupply.
     * @param feeToPay feeToPay.
     * @param inflation inflation.
     * @param collectedEpochFees collectedEpochFees.
     * @param votingEligibleAccountsCount Number of voting eligible accounts.
     * @param harvestingEligibleAccountsCount Number of harvesting eligible accounts.
     * @param totalVotingBalance Total balance eligible for voting.
     * @param previousImportanceBlockHash Previous importance block hash.
     * @return Instance of ImportanceBlockHeaderBuilder.
     */
    public static createImportanceBlockHeaderBuilder(
        signature: SignatureDto,
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: BlockTypeDto,
        height: HeightDto,
        timestamp: TimestampDto,
        difficulty: DifficultyDto,
        generationHashProof: VrfProofBuilder,
        previousBlockHash: Hash256Dto,
        transactionsHash: Hash256Dto,
        receiptsHash: Hash256Dto,
        stateHash: Hash256Dto,
        beneficiaryAddress: AddressDto,
        feeMultiplier: BlockFeeMultiplierDto,
        totalSupply: AmountDto,
        feeToPay: AmountDto,
        inflation: AmountDto,
        collectedEpochFees: AmountDto,
        votingEligibleAccountsCount: number,
        harvestingEligibleAccountsCount: number[],
        totalVotingBalance: AmountDto,
        previousImportanceBlockHash: Hash256Dto,
    ): ImportanceBlockHeaderBuilder {
        return new ImportanceBlockHeaderBuilder(
            signature,
            signerPublicKey,
            version,
            network,
            type,
            height,
            timestamp,
            difficulty,
            generationHashProof,
            previousBlockHash,
            transactionsHash,
            receiptsHash,
            stateHash,
            beneficiaryAddress,
            feeMultiplier,
            totalSupply,
            feeToPay,
            inflation,
            collectedEpochFees,
            votingEligibleAccountsCount,
            harvestingEligibleAccountsCount,
            totalVotingBalance,
            previousImportanceBlockHash,
        );
    }

    /**
     * Gets number of voting eligible accounts.
     *
     * @return Number of voting eligible accounts.
     */
    public getVotingEligibleAccountsCount(): number {
        return this.importanceBlockFooter.getVotingEligibleAccountsCount();
    }

    /**
     * Gets number of harvesting eligible accounts.
     *
     * @return Number of harvesting eligible accounts.
     */
    public getHarvestingEligibleAccountsCount(): number[] {
        return this.importanceBlockFooter.getHarvestingEligibleAccountsCount();
    }

    /**
     * Gets total balance eligible for voting.
     *
     * @return Total balance eligible for voting.
     */
    public getTotalVotingBalance(): AmountDto {
        return this.importanceBlockFooter.getTotalVotingBalance();
    }

    /**
     * Gets previous importance block hash.
     *
     * @return Previous importance block hash.
     */
    public getPreviousImportanceBlockHash(): Hash256Dto {
        return this.importanceBlockFooter.getPreviousImportanceBlockHash();
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = super.getSize();
        size += this.importanceBlockFooter.getSize(); // importanceBlockFooter
        return size;
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
        const importanceBlockFooterBytes = this.importanceBlockFooter.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, importanceBlockFooterBytes);
        return newArray;
    }
}
