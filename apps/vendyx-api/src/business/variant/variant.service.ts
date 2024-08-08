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
    return this.variantRepository.insert({
      ...clean(input),
      salePrice: convertToCent(input.salePrice),
      comparisonPrice: input.comparisonPrice ? convertToCent(input.comparisonPrice) : undefined,
      costPerUnit: input.costPerUnit ? convertToCent(input.costPerUnit) : undefined,
      product: { connect: { id: productId } }
    });
  }

  update(id: string, input: UpdateVariantInput) {
    return this.variantRepository.update(id, {
      ...clean(input),
      salePrice: input.salePrice ? convertToCent(input.salePrice) : undefined,
      comparisonPrice: input.comparisonPrice ? convertToCent(input.comparisonPrice) : undefined,
      costPerUnit: input.costPerUnit ? convertToCent(input.costPerUnit) : undefined
    });
  }

  softRemove(id: string) {
    return this.variantRepository.softDelete(id);
  }
}
