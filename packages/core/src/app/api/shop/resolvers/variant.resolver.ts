import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { ListInput, ListResponse } from '../../common';

import { ID, VariantEntity } from '@/app/persistance';
import { VariantService } from '@/app/service';

@Resolver('Variant')
export class VariantResolver {
  constructor(private readonly variantService: VariantService) {}

  @Query('variants')
  async variants(@Args('input') input: ListInput) {
    const variant = await this.variantService.find(input);

    return new ListResponse(variant, variant.length);
  }

  @Query('variant')
  async variant(@Args('id') id: ID) {
    const variant = await this.variantService.findUnique(id);

    return variant;
  }

  @ResolveField('optionValues')
  async optionValues(@Parent() variant: VariantEntity) {
    const optionValues = await this.variantService.findOptionValues(variant.id);

    return optionValues;
  }
}
