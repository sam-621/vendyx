import { Args, Query, Resolver } from '@nestjs/graphql';

import { ListInput, ListResponse } from '../../common';

import { ID } from '@/persistance';
import { VariantService } from '@/business';

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
}
