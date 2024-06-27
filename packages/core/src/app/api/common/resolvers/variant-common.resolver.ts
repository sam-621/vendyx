import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { VariantEntity } from '@/app/persistance';
import { VariantService } from '@/app/service';

@Resolver('Variant')
export class VariantCommonResolver {
  constructor(private readonly variantService: VariantService) {}

  @ResolveField('optionValues')
  async optionValues(@Parent() variant: VariantEntity, @Args('withDeleted') withDeleted: boolean) {
    const optionValues = await this.variantService.findOptionValues(variant.id, withDeleted);

    return optionValues;
  }

  @ResolveField('product')
  async product(@Parent() variant: VariantEntity) {
    const product = await this.variantService.findProduct(variant.id);

    return product;
  }
}
