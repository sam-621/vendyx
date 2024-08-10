import { Injectable } from '@nestjs/common';

import { CreateVariantInput, UpdateVariantInput } from '@/api/shared';
import { VariantRepository } from '@/persistance/repositories';

import { clean, convertToCent } from '../shared';

@Injectable()
export class VariantService {
  constructor(private readonly variantRepository: VariantRepository) {}

  async findById(id: string) {
    return this.variantRepository.findById(id);
  }

  create(productId: string, input: CreateVariantInput) {
    const { optionValues, ...rest } = input;

    return this.variantRepository.insert({
      ...clean(rest),
      salePrice: convertToCent(input.salePrice),
      comparisonPrice: input.comparisonPrice ? convertToCent(input.comparisonPrice) : undefined,
      costPerUnit: input.costPerUnit ? convertToCent(input.costPerUnit) : undefined,
      product: { connect: { id: productId } },
      variantOptionValues: { create: optionValues?.map(v => ({ optionValueId: v })) }
    });
  }

  update(id: string, input: UpdateVariantInput) {
    const { optionValues, ...rest } = input;

    return this.variantRepository.update(id, {
      ...clean(rest),
      salePrice: input.salePrice ? convertToCent(input.salePrice) : undefined,
      comparisonPrice: input.comparisonPrice ? convertToCent(input.comparisonPrice) : undefined,
      costPerUnit: input.costPerUnit ? convertToCent(input.costPerUnit) : undefined,
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
