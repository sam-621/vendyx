import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, In } from 'typeorm';

import { OptionValueService } from './option-value.service';
import { ErrorResult } from '../utils';

import { OptionErrorCode, UpdateOptionInput, UpdateOptionValueInput } from '@/app/api/common';
import { ID, OptionEntity, OptionValueEntity } from '@/app/persistance';

@Injectable()
export class OptionService {
  constructor(
    private optionValueService: OptionValueService,
    @InjectDataSource() private db: DataSource
  ) {}

  async findValues(id: ID) {
    const optionValues = await this.db.getRepository(OptionValueEntity).find({
      where: { option: { id } }
    });

    return optionValues.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  /**
   * Create a new option
   */
  async create(
    name: string,
    values: string[]
  ): Promise<OptionEntity | ErrorResult<OptionErrorCode>> {
    const hasDuplicatedValues = values.length !== new Set(values).size;

    if (hasDuplicatedValues) {
      return new ErrorResult(OptionErrorCode.DUPLICATED_OPTION_VALUES, 'Duplicated option values');
    }

    const optionValues = await this.optionValueService.create(values);

    const optionToSave = this.db.getRepository(OptionEntity).create({
      name,
      values: optionValues
    });

    return await this.db.getRepository(OptionEntity).save(optionToSave);
  }

  /**
   * Update an option with the given id
   */
  async update(
    id: ID,
    input: UpdateOptionInput
  ): Promise<OptionEntity | ErrorResult<OptionErrorCode>> {
    const { name } = input;

    const optionToUpdate = await this.db
      .getRepository(OptionEntity)
      .findOne({ where: { id }, relations: { values: true } });

    if (!optionToUpdate) {
      return new ErrorResult(OptionErrorCode.OPTION_NOT_FOUND, 'Option not found');
    }

    return await this.db
      .getRepository(OptionEntity)
      .save({ ...optionToUpdate, name: name ?? undefined });
  }

  /**
   * Remove an option with the given id
   */
  async remove(id: ID) {
    const optionToRemove = await this.db
      .getRepository(OptionEntity)
      .findOne({ where: { id }, relations: { values: { variants: true } }, withDeleted: true });

    if (!optionToRemove) {
      return new ErrorResult(OptionErrorCode.OPTION_NOT_FOUND, 'Option not found');
    }

    const optionValuesToRemove = optionToRemove.values.filter(v => !v.deletedAt);
    const hasOptionValuesAlreadySoftDeleted = optionToRemove.values.some(v => v.deletedAt);
    const anyOptionValueToRemoveHasVariants = optionValuesToRemove.some(v => v.variants.length);

    const optionValuesForSoftDelete = optionValuesToRemove.filter(v => v.variants.length);
    const optionValuesForHardDelete = optionValuesToRemove.filter(
      v => !optionValuesForSoftDelete.map(v => v.id).includes(v.id)
    );

    await this.db.getRepository(OptionValueEntity).remove(optionValuesForHardDelete);
    await this.db
      .getRepository(OptionValueEntity)
      .softRemove(optionValuesForSoftDelete.map(v => ({ id: v.id })));

    if (
      optionValuesForSoftDelete.length ||
      hasOptionValuesAlreadySoftDeleted ||
      anyOptionValueToRemoveHasVariants
    ) {
      await this.db.getRepository(OptionEntity).softDelete(optionToRemove.id);
    } else {
      await this.db.getRepository(OptionEntity).remove(optionToRemove);
    }

    return true;
  }

  /**
   * Add option values to an option with the given id
   */
  async addOptionValues(
    optionId: ID,
    values: string[]
  ): Promise<OptionEntity | ErrorResult<OptionErrorCode>> {
    const option = await this.db
      .getRepository(OptionEntity)
      .findOne({ where: { id: optionId }, relations: { values: true } });

    if (!option) {
      return new ErrorResult(OptionErrorCode.OPTION_NOT_FOUND, 'Option not found');
    }

    const optionValues = await this.optionValueService.create(values);

    option.values.push(...optionValues);

    return await this.db.getRepository(OptionEntity).save(option);
  }

  /**
   * Update an option value with the given id
   */
  async updateOptionValues(
    input: UpdateOptionValueInput[]
  ): Promise<boolean | ErrorResult<OptionErrorCode>> {
    await this.db.getRepository(OptionValueEntity).save(input.map(v => ({ ...v, value: v.value })));

    return true;
  }

  /**
   * Remove option values with the given ids
   *
   * 1. Remove option values from variants
   * 2. Remove option values from db
   */
  async removeOptionValues(ids: ID[]) {
    const optionValuesToRemove = await this.db.getRepository(OptionValueEntity).find({
      where: { id: In(ids) },
      relations: { option: true, variants: true },
      withDeleted: true
    });

    const option = optionValuesToRemove[0].option;

    const optionsForSoftDelete = optionValuesToRemove.filter(v => v.variants.length);
    const optionsForHardDelete = optionValuesToRemove.filter(
      v => !optionsForSoftDelete.map(v => v.id).includes(v.id)
    );

    await this.db.getRepository(OptionValueEntity).remove(optionsForHardDelete);
    await this.db
      .getRepository(OptionValueEntity)
      .softRemove(optionsForSoftDelete.map(v => ({ id: v.id })));

    return await this.db.getRepository(OptionEntity).findOne({ where: { id: option.id } });
  }
}
