import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { convertToCent } from '@vendyx/common';
import { DataSource, In } from 'typeorm';

import {
  CreateVariantInput,
  ListInput,
  UpdateVariantInput,
} from '@/app/api/common';
import {
  ID,
  OptionValueEntity,
  ProductEntity,
  VariantEntity,
} from '@/app/persistance';
import { UserInputError, ValidationError } from '@/lib/errors';

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
      where: { variants: { id } },
    });

    return optionValues;
  }

  async findProduct(id: ID) {
    const optionValues = await this.db.getRepository(ProductEntity).findOne({
      where: { variants: { id } },
    });

    return optionValues;
  }

  async create(productId: ID, input: CreateVariantInput) {
    if (!input.optionValuesIds?.length) {
      const defaultVariantAlreadyCreated = await this.db
        .getRepository(VariantEntity)
        .findOne({ where: { product: { id: productId } } });

      if (defaultVariantAlreadyCreated) {
        throw new ValidationError(
          'Default variant already created, add options instead',
        );
      }
    }

    const optionValues = input.optionValuesIds?.length
      ? await this.db.getRepository(OptionValueEntity).find({
          where: { id: In(input.optionValuesIds) },
        })
      : undefined;

    const product = await this.db
      .getRepository(ProductEntity)
      .findOneBy({ id: productId });

    const variantToSave = this.db.getRepository(VariantEntity).create({
      ...input,
      product,
      optionValues,
      price: convertToCent(input.price),
    });

    return this.db.getRepository(VariantEntity).save(variantToSave);
  }

  async update(id: ID, input: UpdateVariantInput) {
    const variantToUpdate = await this.findById(id);

    if (!variantToUpdate) {
      throw new UserInputError('Variant not found');
    }

    const optionValues =
      input.optionValuesIds?.length !== undefined
        ? await this.db.getRepository(OptionValueEntity).find({
            where: { id: In(input.optionValuesIds) },
          })
        : undefined;

    return this.db.getRepository(VariantEntity).save({
      ...variantToUpdate,
      ...input,
      price: input.price ? convertToCent(input.price) : variantToUpdate.price,
      optionValues: optionValues,
    });
  }

  async remove(id: ID) {
    const variantToRemove = await this.findById(id);

    if (!variantToRemove) {
      throw new UserInputError('Variant not found with the given id');
    }

    await this.db.getRepository(VariantEntity).softDelete({ id });

    return true;
  }

  private async findById(id: ID) {
    return this.db.getRepository(VariantEntity).findOne({ where: { id } });
  }
}
