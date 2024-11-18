import { Injectable } from '@nestjs/common';

import { CreateVariantInput, UpdateVariantInput } from '@/api/shared';
import { VariantRepository } from '@/persistence/repositories';
import { ID } from '@/persistence/types';

import { clean, convertToCent } from '../shared';

@Injectable()
export class VariantService {
  constructor(private readonly variantRepository: VariantRepository) {}

  async findById(id: string) {
    return this.variantRepository.findById(id);
  }

  create(productId: ID, input: CreateVariantInput) {
    const { optionValues, assetId, ...rest } = input;

    return this.variantRepository.insert({
      ...clean(rest),
      salePrice: convertToCent(input.salePrice),
      comparisonPrice: input.comparisonPrice ? convertToCent(input.comparisonPrice) : undefined,
      costPerUnit: input.costPerUnit ? convertToCent(input.costPerUnit) : undefined,
      asset: assetId ? { connect: { id: assetId } } : undefined,
      product: { connect: { id: productId } },
      variantOptionValues: { create: optionValues?.map(v => ({ optionValueId: v })) }
    });
  }

  async update(id: ID, input: UpdateVariantInput) {
    const { optionValues, assetId, ...rest } = input;

    if (optionValues) {
      await this.variantRepository.removeOptionValuesNotIn(id, optionValues ?? []);
    }

    return this.variantRepository.update(id, {
      ...clean(rest),
      salePrice: input.salePrice ? convertToCent(input.salePrice) : undefined,
      comparisonPrice: input.comparisonPrice ? convertToCent(input.comparisonPrice) : undefined,
      costPerUnit: input.costPerUnit ? convertToCent(input.costPerUnit) : undefined,
      asset: assetId
        ? { connect: { id: assetId } }
        : assetId === null
        ? { disconnect: true }
        : undefined,
      variantOptionValues: optionValues?.length
        ? {
            connectOrCreate: optionValues?.map(v => ({
              where: { variantId_optionValueId: { variantId: id, optionValueId: v } },
              create: { optionValueId: v }
            }))
          }
        : undefined
    });
  }

  softRemove(id: string) {
    return this.variantRepository.softDelete(id);
  }
}
