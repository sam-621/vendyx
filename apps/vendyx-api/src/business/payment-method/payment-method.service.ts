import { Inject, Injectable } from '@nestjs/common';

import { CreatePaymentMethodInput, UpdatePaymentMethodInput } from '@/api/shared/types/gql.types';
import { PaymentService } from '@/payment/payment.service';
import {
  PRISMA_FOR_SHOP,
  PrismaForShop
} from '@/persistence/prisma-clients/prisma-for-shop.provider';
import {
  ConfigurableProperty,
  ConfigurablePropertyArgs
} from '@/persistence/types/configurable-operation.type';
import { ID } from '@/persistence/types/scalars.type';
import { SecurityService } from '@/security/security.service';

import { FailedToSaveArgs, HandlerAlreadySelected, HandlerNotFound } from './payment-method.errors';
import { clean } from '../shared/utils/clean.utils';

@Injectable()
export class PaymentMethodService {
  constructor(
    @Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop,
    private readonly paymentService: PaymentService,
    private readonly securityService: SecurityService
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

    const decryptedArgs = this.securityService.decrypt<ConfigurablePropertyArgs>(
      (method.handler as ConfigurableProperty).args
    );

    return {
      ...method,
      name: this.paymentService.getHandler((method.handler as ConfigurableProperty).code).name,
      icon: this.paymentService.getHandler((method.handler as ConfigurableProperty).code).ui?.icon,
      args: decryptedArgs
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

    const handler = input.handler;
    const encryptedArgs = this.securityService.encrypt(clean(handler.args));

    if (!encryptedArgs) {
      return new FailedToSaveArgs();
    }

    const result = await this.prisma.paymentMethod.create({
      data: {
        ...clean(input),
        handler: {
          ...handler,
          args: encryptedArgs
        }
      }
    });

    return this.findById(result.id);
  }

  async update(id: ID, input: UpdatePaymentMethodInput) {
    const method = await this.prisma.paymentMethod.findUniqueOrThrow({ where: { id } });
    const handler = method.handler as ConfigurableProperty;
    const decryptedArgs = this.securityService.decrypt<ConfigurablePropertyArgs>(handler.args);

    const encryptedArgs = this.securityService.encrypt(
      clean({
        ...decryptedArgs,
        ...clean(input.args ?? {})
      })
    );

    if (!encryptedArgs) {
      return new FailedToSaveArgs();
    }

    const result = await this.prisma.paymentMethod.update({
      where: { id },
      data: {
        enabled: input.enabled ?? undefined,
        handler: {
          ...handler,
          args: encryptedArgs
        }
      }
    });

    return this.findById(result.id);
  }

  async remove(id: string) {
    await this.prisma.paymentMethod.delete({ where: { id } });
    return true;
  }
}
