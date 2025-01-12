import { Inject, Injectable } from '@nestjs/common';

import { CreateShippingMethodInput, UpdateShippingMethodInput } from '@/api/shared/types/gql.types';
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

import { FailedToSaveArgs, HandlerNotFound } from './shipping-method.errors';
import { clean } from '../shared/utils/clean.utils';

@Injectable()
export class ShippingMethodService {
  constructor(
    @Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop,
    private readonly shipmentService: ShipmentService,
    private readonly securityService: SecurityService
  ) {}

  findHandlers() {
    return this.shipmentService.getHandlers();
  }

  async create(input: CreateShippingMethodInput) {
    const handlerExists = this.shipmentService.safeGetHandler(input.handler.code);

    if (!handlerExists) {
      return new HandlerNotFound();
    }

    const encryptedArgs = this.securityService.encrypt(clean(input.handler.args));

    if (!encryptedArgs) {
      return new FailedToSaveArgs();
    }

    const shippingMethod = await this.prisma.shippingMethod.create({
      data: {
        name: input.name,
        description: input.description,
        enabled: input.enabled ?? false,
        handler: {
          ...input.handler,
          args: encryptedArgs
        },
        zone: {
          connect: {
            id: input.zoneId
          }
        }
      }
    });

    return {
      ...shippingMethod,
      handler: {
        ...input.handler,
        args: clean(input.handler.args) as ConfigurablePropertyArgs
      }
    };
  }

  async update(id: string, input: UpdateShippingMethodInput) {
    const method = await this.prisma.shippingMethod.findUniqueOrThrow({ where: { id } });
    const handler = method.handler as ConfigurableProperty;
    const decryptedArgs = this.securityService.decrypt<ConfigurablePropertyArgs>(handler.args);

    const { args, ...rest } = input;

    const newArgs = {
      ...decryptedArgs,
      ...clean(args ?? {})
    };

    const encryptedArgs = this.securityService.encrypt(newArgs);

    if (!encryptedArgs) {
      return new FailedToSaveArgs();
    }

    const shippingMethod = await this.prisma.shippingMethod.update({
      where: { id },
      data: {
        ...clean(rest),
        handler: {
          ...handler,
          args: encryptedArgs
        } satisfies ConfigurableProperty
      }
    });

    return {
      ...shippingMethod,
      handler: {
        ...handler,
        args: newArgs
      }
    };
  }

  async remove(id: string) {
    await this.prisma.shippingMethod.delete({ where: { id } });
    return true;
  }
}
