import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import {
  PRISMA_FOR_ADMIN,
  PRISMA_FOR_SHOP,
  PrismaForAdmin,
  PrismaForShop
} from '../prisma-clients';

@Injectable()
export class PaymentMethodRepository {
  constructor(
    @Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop,
    @Inject(PRISMA_FOR_ADMIN) private readonly prismaForAdmin: PrismaForAdmin
  ) {}

  async find() {
    const result = await this.prisma.paymentMethod.findMany({
      include: { paymentIntegration: { select: { name: true, icon: true } } }
    });

    return result.map(item => ({
      ...item,
      name: item.paymentIntegration.name,
      icon: item.paymentIntegration.icon
    }));
  }

  async findById(id: string) {
    const result = await this.prisma.paymentMethod.findUnique({
      where: { id },
      include: { paymentIntegration: { select: { name: true, icon: true } } }
    });

    if (!result) {
      return null;
    }

    return {
      ...result,
      name: result.paymentIntegration.name,
      icon: result.paymentIntegration.icon
    };
  }

  findIntegrations() {
    return this.prismaForAdmin.paymentIntegration.findMany();
  }

  insert(input: Prisma.PaymentMethodCreateInput) {
    return this.prisma.paymentMethod.create({ data: input });
  }

  update(id: string, input: Prisma.PaymentMethodUpdateInput) {
    return this.prisma.paymentMethod.update({ where: { id }, data: input });
  }

  remove(id: string) {
    return this.prisma.paymentMethod.delete({ where: { id } });
  }
}
