import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, In } from 'typeorm';

import { OptionValueService } from './option-value.service';
import { ErrorResult } from '../utils';

import { OptionErrorCode, UpdateOptionInput } from '@/app/api/common';
import { ID, OptionEntity, VariantEntity } from '@/app/persistance';

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
   * Update an option and its option values
   *
   * @description
   * 1. If no new values are provided, update only the option name
   * 2. If new values are provides, check if some values were deleted
   * 3. If some values were deleted, remove the option values from the variants that have that option values
   * 4. Add new option values to the option
   */
  async update(
    id: ID,
    input: UpdateOptionInput
  ): Promise<OptionEntity | ErrorResult<OptionErrorCode>> {
    const { name, values: newValues = [] } = input;
    const hasDuplicatedValues = newValues.length !== new Set(newValues).size;

    if (hasDuplicatedValues) {
      return new ErrorResult(OptionErrorCode.DUPLICATED_OPTION_VALUES, 'Duplicated option values');
    }

    const optionToUpdate = await this.db.getRepository(OptionEntity).findOne({ where: { id } });

    if (!newValues.length) {
      await this.db.getRepository(OptionEntity).save({ ...optionToUpdate, name });
    }

    const optionValuesDeleted = optionToUpdate.values.filter(v => !newValues.includes(v.value));

    // remove option values from variants that have that option values
    if (optionValuesDeleted.length) {
      const variantsToRemoveOptionValues = await this.db.getRepository(VariantEntity).find({
        where: { optionValues: { id: In(optionValuesDeleted.map(v => v.id)) } },
        relations: { optionValues: true }
      });

      await this.db.getRepository(VariantEntity).save(
        variantsToRemoveOptionValues.map(v => ({
          ...v,
          optionValues: v.optionValues.filter(ov => !optionValuesDeleted.includes(ov))
        }))
      );
    }

    await this.db.getRepository(OptionEntity).save({
      ...optionToUpdate,
      values: newValues.map(v => ({ id: v }))
    });

    // get option values deleted
    // get variants with that option values
    // update variants removing that option values
    // delete option values
    // add new option values to option
    // frontend
    // are new options?
    // recalculate what variants should be updated and or created with new values
  }
}
