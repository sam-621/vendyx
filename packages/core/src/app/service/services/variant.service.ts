import { clean, convertToCent } from '@ebloc/common';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, In, Not } from 'typeorm';

import { ErrorResult } from '../utils';

import {
  CreateVariantInput,
  ListInput,
  UpdateVariantInput,
  VariantErrorCode
} from '@/app/api/common';
import {
  ID,
  OptionValueEntity,
  OrderLineEntity,
  ProductEntity,
  VariantEntity
} from '@/app/persistance';

@Injectable()
export class VariantService {
  constructor(@InjectDataSource() private db: DataSource) {}

  async find(input: ListInput) {
    return this.db.getRepository(VariantEntity).find(clean(input));
  }

  async findUnique(id: ID) {
    return this.findById(id);
  }

  async findOptionValues(id: ID) {
    const optionValues = await this.db.getRepository(OptionValueEntity).find({
      where: { variants: { id } },
      relations: { option: true }
    });

    // order option values by option created at date
    return optionValues.sort((a, b) => {
      if (a.option.createdAt > b.option.createdAt) return 1;
      if (a.option.createdAt < b.option.createdAt) return -1;
      return 0;
    });
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
    const product = await this.db
      .getRepository(ProductEntity)
      .findOneBy({ id: productId, deletedAt: undefined });

    if (!product) {
      return new ErrorResult(VariantErrorCode.PRODUCT_NOT_FOUND, 'Product not found');
    }

    const optionValues = input.optionValuesIds?.length
      ? await this.db.getRepository(OptionValueEntity).find({
          where: { id: In(input.optionValuesIds) }
        })
      : undefined;

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
        ? input.price === 0 || input.price === null
          ? 0
          : convertToCent(input.price)
        : variantToUpdate.price;

    return this.db.getRepository(VariantEntity).save({
      ...variantToUpdate,
      ...clean(input),
      price: priceToUpdate,
      optionValues: optionValues
    });
  }

  /**
   * Remove a variant entity
   *
   * @description
   * 1. Apply a soft or hard delete to unused option values
   * 2. Soft delete the variant if it is in any order
   * 3. Hard delete the variant if it is not in any order
   */
  async remove(id: ID): Promise<ErrorResult<VariantErrorCode> | boolean> {
    const variantToRemove = await this.db
      .getRepository(VariantEntity)
      .findOne({ where: { id }, relations: { product: true, optionValues: true } });

    if (!variantToRemove) {
      return new ErrorResult(VariantErrorCode.VARIANT_NOT_FOUND, 'Variant not found');
    }

    const isVariantInAnyOrder = await this.db
      .getRepository(OrderLineEntity)
      .findOne({ where: { productVariant: { id } } });

    // await this.removeUnusedOptionValues(variantToRemove, isVariantInAnyOrder ? 'soft' : 'hard');

    if (isVariantInAnyOrder) {
      await this.db.getRepository(VariantEntity).softDelete({ id });
    } else {
      await this.db.getRepository(VariantEntity).remove(variantToRemove);
    }

    return true;
  }

  private async findById(id: ID) {
    return this.db.getRepository(VariantEntity).findOne({ where: { id } });
  }

  /**
   * Remove option values that are not used in any active variant, this is needed to avoid orphaned data.
   * We generate the variants depending on the option values, so if we remove a variant,
   * we need to check if the option values are used in other variants, if not, we can remove them.
   */
  private async removeUnusedOptionValues(variantToRemove: VariantEntity, type: 'soft' | 'hard') {
    const product = variantToRemove.product;
    const availableVariants = await this.db.getRepository(VariantEntity).find({
      where: { product: { id: product.id }, id: Not(variantToRemove.id) },
      relations: { optionValues: true }
    });

    const optionValuesInUse = availableVariants
      .map(variant => variant.optionValues)
      .flat()
      .map(v => v.id);

    const totalOptionValuesInProduct = (
      await this.db.getRepository(OptionValueEntity).find({
        where: { variants: { product: { id: product.id } } }
      })
    ).map(v => v.id);

    const optionValuesToDelete = totalOptionValuesInProduct.filter(
      optionValue => !optionValuesInUse.includes(optionValue)
    );

    if (!optionValuesToDelete.length) return;

    if (type === 'soft') {
      await this.db.getRepository(OptionValueEntity).softDelete({ id: In(optionValuesToDelete) });
    } else {
      await this.db
        .getRepository(OptionValueEntity)
        .remove(
          optionValuesToDelete.map(id => this.db.getRepository(OptionValueEntity).create({ id }))
        );
    }
  }
}
