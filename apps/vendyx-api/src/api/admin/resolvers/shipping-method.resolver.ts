import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import {
  CreateShippingMethodInput,
  ShippingMethod,
  UpdateShippingMethodInput,
  UserJwtAuthGuard
} from '@/api/shared';
import { ShippingMethodService } from '@/business/shipping-method';
import { PRISMA_FOR_SHOP, PrismaForShop } from '@/persistance/prisma-clients';
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
      orderBy: { createdAt: 'desc' },
      include: { shippingHandler: true }
    });

    return shippingMethods.map(shippingMethod => ({
      ...shippingMethod,
      pricePreview: this.shipmentService.getPricePreview(
        shippingMethod.shippingHandler.handlerCode,
        shippingMethod.handlerMetadata as Record<string, string>
      )
    }));
  }

  @Query('shippingHandlers')
  async shippingHandlers() {
    return this.shippingMethodService.findHandlers();
  }

  @Mutation('createShippingMethod')
  async createShippingMethod(@Args('input') input: CreateShippingMethodInput) {
    return this.shippingMethodService.create(input);
  }

  @Mutation('updateShippingMethod')
  async updateShippingMethod(
    @Args('id') id: string,
    @Args('input') input: UpdateShippingMethodInput
  ) {
    return this.shippingMethodService.update(id, input);
  }

  @Mutation('removeShippingMethod')
  async removeShippingMethod(@Args('id') id: string) {
    return this.shippingMethodService.remove(id);
  }

  @ResolveField('handler')
  async handler(@Parent() shippingMethod: ShippingMethod) {
    const result = await this.prisma.shippingMethod.findUnique({
      where: { id: shippingMethod.id },
      select: { shippingHandler: true }
    });

    return result?.shippingHandler;
  }
}
