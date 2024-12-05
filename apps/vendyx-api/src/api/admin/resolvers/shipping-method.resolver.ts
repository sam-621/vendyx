import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  CreateShippingMethodInput,
  UpdateShippingMethodInput,
  UserJwtAuthGuard
} from '@/api/shared';
import { isErrorResult } from '@/business/shared';
import { ShippingMethodService } from '@/business/shipping-method';
import { PRISMA_FOR_SHOP, PrismaForShop } from '@/persistence/prisma-clients';
import { ConfigurableProperty } from '@/persistence/types';
import { ShipmentService } from '@/shipments';

@UseGuards(UserJwtAuthGuard)
@Resolver('ShippingMethod')
export class ShippingMethodResolver {
  constructor(
    private readonly shippingMethodService: ShippingMethodService,
    private readonly shipmentService: ShipmentService,
    @Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop
  ) {}

  @Query('shippingMethods')
  async shippingMethods() {
    const shippingMethods = await this.prisma.shippingMethod.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return shippingMethods.map(shippingMethod => ({
      ...shippingMethod,
      args: (shippingMethod.handler as ConfigurableProperty).args,
      pricePreview: this.shipmentService.getPricePreview(
        shippingMethod.handler as ConfigurableProperty
      )
    }));
  }

  @Query('shippingHandlers')
  async shippingHandlers() {
    return this.shippingMethodService.findHandlers();
  }

  @Mutation('createShippingMethod')
  async createShippingMethod(@Args('input') input: CreateShippingMethodInput) {
    const result = await this.shippingMethodService.create(input);

    return isErrorResult(result)
      ? { apiErrors: [result] }
      : {
          apiErrors: [],
          shippingMethod: {
            ...result,
            args: (result.handler as ConfigurableProperty).args,
            pricePreview: this.shipmentService.getPricePreview(
              result.handler as ConfigurableProperty
            )
          }
        };
  }

  @Mutation('updateShippingMethod')
  async updateShippingMethod(
    @Args('id') id: string,
    @Args('input') input: UpdateShippingMethodInput
  ) {
    const result = await this.shippingMethodService.update(id, input);

    return {
      ...result,
      args: (result.handler as ConfigurableProperty).args,
      pricePreview: this.shipmentService.getPricePreview(result.handler as ConfigurableProperty)
    };
  }

  @Mutation('removeShippingMethod')
  async removeShippingMethod(@Args('id') id: string) {
    return this.shippingMethodService.remove(id);
  }
}
