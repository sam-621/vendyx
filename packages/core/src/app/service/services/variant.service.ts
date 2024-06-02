import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { convertToCent } from '@vendyx/common';
import { DataSource, In } from 'typeorm';

import { ErrorResult } from '../utils';

import {
  CreateVariantInput,
  ListInput,
  UpdateVariantInput,
  VariantErrorCode
} from '@/app/api/common';
import { ID, OptionValueEntity, ProductEntity, VariantEntity } from '@/app/persistance';

@Injectable()
export class VariantService {
  constructor(@InjectDataSource() private db: DataSource) {}

  async find(input: ListInput) {
    return this.db.getRepository(VariantEntity).find(input);
  }

  async findUnique(id: ID) {
    return this.findById(id);
  }

  async findOptionValues(id: ID) {
    const optionValues = await this.db.getRepository(OptionValueEntity).find({
      where: { variants: { id } }
    });

    return optionValues;
  }

  async findProduct(id: ID) {
    const optionValues = await this.db.getRepository(ProductEntity).findOne({
      where: { variants: { id } }
    });

    return optionValues;
  }

  async create(
    productId: ID,
    input: CreateVariantInput
  ): Promise<ErrorResult<VariantErrorCode> | VariantEntity> {
    if (!input.optionValuesIds?.length) {
      const defaultVariantAlreadyCreated = await this.db
        .getRepository(VariantEntity)
        .findOne({ where: { product: { id: productId } } });

      if (defaultVariantAlreadyCreated) {
        return new ErrorResult(
          VariantErrorCode.DEFAULT_VARIANT_ALREADY_EXISTS,
          'Default variant already created, add options instead'
        );
      }
    }

    const optionValues = input.optionValuesIds?.length
      ? await this.db.getRepository(OptionValueEntity).find({
          where: { id: In(input.optionValuesIds) }
        })
      : undefined;

    const product = await this.db.getRepository(ProductEntity).findOneBy({ id: productId });

    const variantToSave = this.db.getRepository(VariantEntity).create({
      ...input,
      product,
      optionValues,
      price: input.price === 0 ? 0 : convertToCent(input.price)
    });

    return this.db.getRepository(VariantEntity).save(variantToSave);
  }

  async update(
    id: ID,
    input: UpdateVariantInput
  ): Promise<ErrorResult<VariantErrorCode> | VariantEntity> {
    const variantToUpdate = await this.findById(id);

    if (!variantToUpdate) {
      return new ErrorResult(VariantErrorCode.VARIANT_NOT_FOUND, 'Variant not found');
    }

    const optionValues =
      input.optionValuesIds?.length !== undefined
        ? await this.db.getRepository(OptionValueEntity).find({
            where: { id: In(input.optionValuesIds) }
          })
        : undefined;

    // save price as 0 if input price is 0, otherwise convert to cents, if input price is undefined, keep the same price
    const priceToUpdate =
      input.price !== undefined
        ? input.price === 0
          ? 0
          : convertToCent(input.price)
        : variantToUpdate.price;

    return this.db.getRepository(VariantEntity).save({
      ...variantToUpdate,
      ...input,
      price: priceToUpdate,
      optionValues: optionValues
    });
  }

  async remove(id: ID): Promise<ErrorResult<VariantErrorCode> | boolean> {
    const variantToRemove = await this.findById(id);

    if (!variantToRemove) {
      return new ErrorResult(VariantErrorCode.VARIANT_NOT_FOUND, 'Variant not found');
    }

    await this.db.getRepository(VariantEntity).softDelete({ id });

    return true;
  }

  private async findById(id: ID) {
    return this.db.getRepository(VariantEntity).findOne({ where: { id } });
  }
}
