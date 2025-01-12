import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserJwtAuthGuard } from '@/api/shared/guards/user.guard';
import { CreateShippingMethodInput, UpdateShippingMethodInput } from '@/api/shared/types/gql.types';
import { isErrorResult } from '@/business/shared/utils/error-result.utils';
import { ShippingMethodService } from '@/business/shipping-method/shipping-method.service';
import {
  PRISMA_FOR_SHOP,
  PrismaForShop
} from '@/persistence/prisma-clients/prisma-for-shop.provider';
import {
  ConfigurableProperty,
  ConfigurablePropertyArgs
} from '@/persistence/types/configurable-operation.type';
import { SecurityService } from '@/security/security.service';
import { ShipmentService } from '@/shipments/shipment.service';

@UseGuards(UserJwtAuthGuard)
@Resolver('ShippingMethod')
export class ShippingMethodResolver {
  constructor(
    private readonly shippingMethodService: ShippingMethodService,
    private readonly shipmentService: ShipmentService,
    private readonly securityService: SecurityService,
    @Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop
  ) {}

  @Query('shippingMethods')
  async shippingMethods() {
    const shippingMethods = await this.prisma.shippingMethod.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return shippingMethods
      .map(shippingMethod => {
        const args = this.securityService.decrypt<ConfigurablePropertyArgs>(
          (shippingMethod.handler as ConfigurableProperty).args
        );

        if (!args) return null;

        return {
          ...shippingMethod,
          args: args,
          code: (shippingMethod.handler as ConfigurableProperty).code,
          pricePreview: this.shipmentService.getPricePreview({
            ...(shippingMethod.handler as ConfigurableProperty),
            args
          })
        };
      })
      .filter(Boolean);
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
            args: result.handler.args,
            pricePreview: this.shipmentService.getPricePreview(result.handler)
          }
        };
  }

  @Mutation('updateShippingMethod')
  async updateShippingMethod(
    @Args('id') id: string,
    @Args('input') input: UpdateShippingMethodInput
  ) {
    const result = await this.shippingMethodService.update(id, input);

    return isErrorResult(result)
      ? { apiErrors: [result] }
      : {
          ...result,
          args: (result.handler as ConfigurableProperty).args,
          pricePreview: this.shipmentService.getPricePreview(result.handler)
        };
  }

  @Mutation('removeShippingMethod')
  async removeShippingMethod(@Args('id') id: string) {
    return this.shippingMethodService.remove(id);
  }
}
