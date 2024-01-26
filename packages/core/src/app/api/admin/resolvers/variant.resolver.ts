import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  AdminJwtAuthGuard,
  CreateVariantInput,
  ListInput,
  ListResponse,
  UpdateVariantInput,
} from '@/app/api/common';
import { ID } from '@/app/persistance';
import { VariantService } from '@/app/service';

@UseGuards(AdminJwtAuthGuard)
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

  @Mutation('createVariant')
  async createVariant(
    @Args('id') id: ID,
    @Args('input') input: CreateVariantInput,
  ) {
    const variant = await this.variantService.create(id, input);

    return variant;
  }

  @Mutation('updateVariant')
  async updateVariant(
    @Args('id') id: ID,
    @Args('input') input: UpdateVariantInput,
  ) {
    const variant = await this.variantService.update(id, input);

    return variant;
  }

  @Mutation('removeVariant')
  async removeVariant(@Args('id') id: ID) {
    const variant = await this.variantService.remove(id);

    return variant;
  }
}
