import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import {
  AdminJwtAuthGuard,
  CreateShippingMethodInput,
  UpdateShippingMethodInput
} from '../../common';

import { ID } from '@/persistance';
import { ShippingMethodService, isErrorResult } from '@/business';

@UseGuards(AdminJwtAuthGuard)
@Resolver('ShippingMethod')
export class ShippingMethodResolver {
  constructor(private readonly shippingMethodService: ShippingMethodService) {}

  @Mutation('createShippingMethod')
  async createShippingMethod(
    @Args('zoneId') zoneId: ID,
    @Args('input') input: CreateShippingMethodInput
  ) {
    const result = await this.shippingMethodService.create(zoneId, input);

    return isErrorResult(result)
      ? { apiErrors: [result] }
      : { apiErrors: [], shippingMethod: result };
  }

  @Mutation('updateShippingMethod')
  async updateShippingMethod(@Args('id') id: ID, @Args('input') input: UpdateShippingMethodInput) {
    const result = await this.shippingMethodService.update(id, input);

    return isErrorResult(result)
      ? { apiErrors: [result] }
      : { apiErrors: [], shippingMethod: result };
  }

  @Mutation('removeShippingMethod')
  async removeShippingMethod(@Args('id') id: ID) {
    const result = await this.shippingMethodService.remove(id);

    return isErrorResult(result) ? { apiErrors: [result] } : { apiErrors: [], success: true };
  }
}
