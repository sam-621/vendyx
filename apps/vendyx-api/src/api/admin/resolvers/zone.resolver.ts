import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Zone } from '@prisma/client';

import { UserJwtAuthGuard } from '@/api/shared/guards/user.guard';
import { CreateZoneInput, UpdateZoneInput } from '@/api/shared/types/gql.types';
import { ZoneService } from '@/business/zone/zone.service';
import {
  PRISMA_FOR_ADMIN,
  PrismaForAdmin
} from '@/persistence/prisma-clients/prisma-for-admin.provider';
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
@Resolver('Zone')
export class ZoneResolver {
  constructor(
    private readonly zoneService: ZoneService,
    private readonly shipmentService: ShipmentService,
    private readonly securityService: SecurityService,
    @Inject(PRISMA_FOR_ADMIN) private readonly prismaForAdmin: PrismaForAdmin,
    @Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop
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
    const result = await this.prisma.shippingMethod.findMany({
      where: { zoneId: zone.id },
      orderBy: { createdAt: 'asc' }
    });

    return result
      .map(shippingMethod => {
        const args = this.securityService.decrypt<ConfigurablePropertyArgs>(
          (shippingMethod.handler as ConfigurableProperty).args
        );

        if (!args) return null;

        return {
          ...shippingMethod,
          args,
          code: (shippingMethod.handler as ConfigurableProperty).code,
          pricePreview: this.shipmentService.getPricePreview({
            ...(shippingMethod.handler as ConfigurableProperty),
            args
          })
        };
      })
      .filter(Boolean);
  }
}
