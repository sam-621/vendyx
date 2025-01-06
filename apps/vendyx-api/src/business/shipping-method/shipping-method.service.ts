import { Inject, Injectable } from '@nestjs/common';

import { CreateShippingMethodInput, UpdateShippingMethodInput } from '@/api/shared/types/gql.types';
import {
  PRISMA_FOR_SHOP,
  PrismaForShop
} from '@/persistence/prisma-clients/prisma-for-shop.provider';
import { ConfigurableProperty } from '@/persistence/types/configurable-operation.type';
import { ShipmentService } from '@/shipments/shipment.service';

import { HandlerNotFound } from './shipping-method.errors';
import { clean } from '../shared/utils/clean.utils';

@Injectable()
export class ShippingMethodService {
  constructor(
    private readonly shipmentService: ShipmentService,
    @Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop
  ) {}

  findHandlers() {
    return this.shipmentService.getHandlers();
  }

  create(input: CreateShippingMethodInput) {
    const handlerExists = this.shipmentService.safeGetHandler(input.handler.code);

    if (!handlerExists) {
      return new HandlerNotFound();
    }

    return this.prisma.shippingMethod.create({
      data: {
        name: input.name,
        description: input.description,
        enabled: input.enabled ?? false,
        handler: input.handler,
        zone: {
          connect: {
            id: input.zoneId
          }
        }
      }
    });
  }

  async update(id: string, input: UpdateShippingMethodInput) {
    const method = await this.prisma.shippingMethod.findUniqueOrThrow({ where: { id } });
    const handler = method.handler as ConfigurableProperty;

    const { args, ...rest } = input;

    return await this.prisma.shippingMethod.update({
      where: { id },
      data: {
        ...clean(rest),
        handler: {
          ...handler,
          args: {
            ...handler.args,
            ...clean(args ?? {})
          }
        } satisfies ConfigurableProperty
      }
    });
  }

  async remove(id: string) {
    await this.prisma.shippingMethod.delete({ where: { id } });
    return true;
  }
}
