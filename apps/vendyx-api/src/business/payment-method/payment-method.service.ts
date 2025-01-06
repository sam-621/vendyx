import { Inject, Injectable } from '@nestjs/common';

import { CreatePaymentMethodInput, UpdatePaymentMethodInput } from '@/api/shared/types/gql.types';
import { PaymentService } from '@/payment/payment.service';
import {
  PRISMA_FOR_SHOP,
  PrismaForShop
} from '@/persistence/prisma-clients/prisma-for-shop.provider';
import { ConfigurableProperty } from '@/persistence/types/configurable-operation.type';
import { ID } from '@/persistence/types/scalars.type';

import { HandlerAlreadySelected, HandlerNotFound } from './payment-method.errors';
import { clean } from '../shared/utils/clean.utils';

@Injectable()
export class PaymentMethodService {
  constructor(
    @Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop,
    private readonly paymentService: PaymentService
  ) {}

  async find() {
    const methods = await this.prisma.paymentMethod.findMany();

    return methods.map(method => ({
      ...method,
      name: this.paymentService.getHandler((method.handler as ConfigurableProperty).code).name,
      icon: this.paymentService.getHandler((method.handler as ConfigurableProperty).code).ui?.icon,
      args: (method.handler as ConfigurableProperty).args
    }));
  }

  async findById(id: ID) {
    const method = await this.prisma.paymentMethod.findUnique({ where: { id } });

    if (!method) return null;

    return {
      ...method,
      name: this.paymentService.getHandler((method.handler as ConfigurableProperty).code).name,
      icon: this.paymentService.getHandler((method.handler as ConfigurableProperty).code).ui?.icon,
      args: (method.handler as ConfigurableProperty).args
    };
  }

  findHandlers() {
    return this.paymentService.getHandlers().map(handler => ({
      code: handler.code,
      name: handler.name,
      args: handler.args,
      icon: handler.ui?.icon
    }));
  }

  async create(input: CreatePaymentMethodInput) {
    if (!this.paymentService.safeGetHandler(input.handler.code)) {
      return new HandlerNotFound();
    }

    const existingHandler = await this.prisma.paymentMethod.findFirst({
      where: {
        handler: {
          path: ['code'],
          equals: input.handler.code
        }
      }
    });

    if (existingHandler) {
      return new HandlerAlreadySelected();
    }

    const result = await this.prisma.paymentMethod.create({
      data: {
        ...clean(input)
      }
    });

    return this.findById(result.id);
  }

  async update(id: ID, input: UpdatePaymentMethodInput) {
    const method = await this.prisma.paymentMethod.findUniqueOrThrow({ where: { id } });
    const handler = method.handler as ConfigurableProperty;

    const result = await this.prisma.paymentMethod.update({
      where: { id },
      data: {
        enabled: input.enabled ?? undefined,
        handler: {
          ...handler,
          args: {
            ...handler.args,
            ...clean(input.args ?? {})
          }
        } satisfies ConfigurableProperty
      }
    });

    return this.findById(result.id);
  }

  async remove(id: string) {
    await this.prisma.paymentMethod.delete({ where: { id } });
    return true;
  }
}
