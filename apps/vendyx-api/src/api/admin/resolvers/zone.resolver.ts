import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { CreateZoneInput, UpdateZoneInput, UserJwtAuthGuard, Zone } from '@/api/shared';
import { ZoneService } from '@/business/zone';
import { PRISMA_FOR_ADMIN, PrismaForShop } from '@/persistence/prisma-clients';
import { ShipmentService } from '@/shipments';

@UseGuards(UserJwtAuthGuard)
@Resolver('Zone')
export class ZoneResolver {
  constructor(
    private readonly zoneService: ZoneService,
    private readonly shipmentService: ShipmentService,
    @Inject(PRISMA_FOR_ADMIN) private readonly prismaForAdmin: PrismaForShop
  ) {}

  @Query('zones')
  async zones() {
    return this.zoneService.find();
  }

  @Query('zone')
  async zone(@Args('id') id: string) {
    return this.zoneService.findById(id);
  }

  @Mutation('createZone')
  async createZone(@Args('input') input: CreateZoneInput) {
    return this.zoneService.create(input);
  }

  @Mutation('updateZone')
  async updateZone(@Args('id') id: string, @Args('input') input: UpdateZoneInput) {
    return this.zoneService.update(id, input);
  }

  @Mutation('removeZone')
  async removeZone(@Args('id') id: string) {
    return this.zoneService.remove(id);
  }

  @ResolveField('states')
  async states(@Parent() zone: Zone) {
    const result = await this.prismaForAdmin.stateZone.findMany({
      where: { zoneId: zone.id },
      select: { state: true }
    });

    return result.map(({ state }) => state);
  }

  @ResolveField('shippingMethods')
  async shippingMethods(@Parent() zone: Zone) {
    const result = await this.prismaForAdmin.shippingMethod.findMany({
      where: { zoneId: zone.id },
      include: { shippingHandler: true },
      orderBy: { createdAt: 'asc' }
    });

    return result.map(shippingMethod => ({
      ...shippingMethod,
      pricePreview: this.shipmentService.getPricePreview(
        shippingMethod.shippingHandler.handlerCode,
        shippingMethod.handlerMetadata as Record<string, string>
      )
    }));
  }
}
