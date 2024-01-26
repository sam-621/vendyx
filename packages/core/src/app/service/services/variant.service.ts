import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import {
  CreateVariantInput,
  ListInput,
  UpdateVariantInput,
} from '@/app/api/common';
import { ID, OptionValueEntity, VariantEntity } from '@/app/persistance';
import { UserInputError, ValidationError } from '@/lib/errors';

@Injectable()
export class VariantService {
  constructor(
    @InjectRepository(VariantEntity)
    private variantRepository: Repository<VariantEntity>,
    @InjectRepository(OptionValueEntity)
    private optionValueRepository: Repository<OptionValueEntity>,
  ) {}

  async find(input: ListInput) {
    return this.variantRepository.find(input);
  }

  async findUnique(id: ID) {
    return this.findById(id);
  }

  async create(productId: ID, input: CreateVariantInput) {
    if (!input.optionValuesIds?.length) {
      const defaultVariantAlreadyCreated = await this.variantRepository.findOne(
        { where: { product: { id: productId } } },
      );

      if (defaultVariantAlreadyCreated) {
        throw new ValidationError(
          'Default variant already created, add options instead',
        );
      }
    }

    const optionValues = await this.optionValueRepository.find({
      where: { id: In(input.optionValuesIds) },
    });

    const variantToSave = this.variantRepository.create({
      ...input,
      product: { id: productId },
      options: optionValues,
    });
    await this.variantRepository.save(variantToSave);

    return variantToSave;
  }

  async update(id: ID, input: UpdateVariantInput) {
    if (!(await this.findById(id))) {
      throw new UserInputError('Variant not found');
    }

    const optionValues = input.optionValuesIds.length
      ? await this.optionValueRepository.find({
          where: { id: In(input.optionValuesIds) },
        })
      : undefined;

    const variantToUpdate = this.variantRepository.update(
      { id },
      { ...input, options: optionValues },
    );

    return variantToUpdate;
  }

  async remove(id: ID) {
    const variantToRemove = await this.findById(id);

    if (!variantToRemove) {
      throw new UserInputError('Variant not found with the given id');
    }

    await this.variantRepository.softDelete(variantToRemove);

    return true;
  }

  private async findById(id: ID) {
    return this.variantRepository.findOne({ where: { id } });
  }
}
