import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, In } from 'typeorm';

import { OptionValueService } from './option-value.service';
import { ErrorResult } from '../utils';

import { OptionErrorCode, UpdateOptionInput, UpdateOptionValueInput } from '@/app/api/common';
import { ID, OptionEntity, OptionValueEntity, VariantEntity } from '@/app/persistance';

@Injectable()
export class OptionService {
  constructor(
    private optionValueService: OptionValueService,
    @InjectDataSource() private db: DataSource
  ) {}

  async findValues(id: ID) {
    const option = await this.db
      .getRepository(OptionEntity)
      .findOne({ where: { id }, relations: { values: true } });

    return option.values;
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

    return await this.db.getRepository(OptionEntity).save({ ...optionToUpdate, name });
  }

  /**
   * Remove an option with the given id
   */
  async remove(id: ID) {
    const optionToRemove = await this.db
      .getRepository(OptionEntity)
      .findOne({ where: { id }, relations: { values: true } });

    const optionValuesToRemove = optionToRemove.values;

    await this.db.getRepository(OptionValueEntity).remove(optionValuesToRemove);
    await this.db.getRepository(OptionEntity).remove(optionToRemove);

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
  async updateOptionValue(
    input: UpdateOptionValueInput
  ): Promise<OptionValueEntity | ErrorResult<OptionErrorCode>> {
    const optionValueToUpdate = await this.db
      .getRepository(OptionValueEntity)
      .findOne({ where: { id: input.id } });

    if (!optionValueToUpdate) {
      return new ErrorResult(OptionErrorCode.OPTION_VALUE_NOT_FOUND, 'Option value not found');
    }

    return await this.db
      .getRepository(OptionValueEntity)
      .save({ ...optionValueToUpdate, value: input.value });
  }

  /**
   * Remove option values with the given ids
   *
   * 1. Remove option values from variants
   * 2. Remove option values from db
   */
  async removeOptionValues(ids: ID[]) {
    const optionValuesToRemove = await this.db
      .getRepository(OptionValueEntity)
      .find({ where: { id: In(ids) } });

    await this.removeOptionValuesFromVariants(ids);

    await this.db.getRepository(OptionValueEntity).remove(optionValuesToRemove);

    return true;
  }

  private async removeOptionValuesFromVariants(optionValuesToRemove: ID[]) {
    const variantsToRemoveOptionValues = await this.db.getRepository(VariantEntity).find({
      where: { optionValues: { id: In(optionValuesToRemove) } },
      relations: { optionValues: true }
    });

    console.log({
      variantsToRemoveOptionValues
    });

    await this.db.getRepository(VariantEntity).save(
      variantsToRemoveOptionValues.map(v => ({
        ...v,
        optionValues: v.optionValues.filter(ov => {
          console.log({
            ov,
            optionValuesToRemove
          });

          return !optionValuesToRemove.includes(ov.id);
        })
      }))
    );
  }
}
