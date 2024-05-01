import { UseGuards } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AdminJwtAuthGuard } from '@/app/api/common';
import { VariantEntity } from '@/app/persistance';
import { VariantService } from '@/app/service';

@UseGuards(AdminJwtAuthGuard)
@Resolver('Variant')
export class VariantCommonResolver {
  constructor(private readonly variantService: VariantService) {}

  async optionValues(@Parent() variant: VariantEntity) {
    const optionValues = await this.variantService.findOptionValues(variant.id);

    return optionValues;
  }

  @ResolveField('product')
  async product(@Parent() variant: VariantEntity) {
    const product = await this.variantService.findProduct(variant.id);

    return product;
  }
}
