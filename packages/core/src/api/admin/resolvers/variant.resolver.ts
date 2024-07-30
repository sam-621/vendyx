import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  AdminJwtAuthGuard,
  CreateVariantInput,
  ListInput,
  ListResponse,
  UpdateVariantInput
} from '@/api/common';
import { ID } from '@/persistance';
import { VariantService, isErrorResult } from '@/business';

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
  async createVariant(@Args('productId') id: ID, @Args('input') input: CreateVariantInput) {
    const result = await this.variantService.create(id, input);

    return isErrorResult(result) ? { apiErrors: [result] } : { variant: result, apiErrors: [] };
  }

  @Mutation('updateVariant')
  async updateVariant(@Args('id') id: ID, @Args('input') input: UpdateVariantInput) {
    const result = await this.variantService.update(id, input);

    return isErrorResult(result) ? { apiErrors: [result] } : { variant: result, apiErrors: [] };
  }

  @Mutation('removeVariant')
  async removeVariant(@Args('id') id: ID) {
    const result = await this.variantService.remove(id);

    return isErrorResult(result) ? { apiErrors: [result] } : { success: result, apiErrors: [] };
  }
}
