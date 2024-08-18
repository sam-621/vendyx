import { Inject } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import {
  PRISMA_FOR_ADMIN,
  PRISMA_FOR_SHOP,
  PrismaForAdmin,
  PrismaForShop
} from '../prisma-clients';

export class ShippingMethodRepository {
  constructor(
    @Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop,
    @Inject(PRISMA_FOR_ADMIN) private readonly prismaForAdmin: PrismaForAdmin
  ) {}

  find() {
    return this.prisma.shippingMethod.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  findHandlers() {
    return this.prisma.shippingHandler.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  insert(input: Prisma.ShippingMethodCreateInput) {
    return this.prisma.shippingMethod.create({ data: input });
  }

  update(id: string, input: Prisma.ShippingMethodUpdateInput) {
    return this.prisma.shippingMethod.update({
      where: { id },
      data: input
    });
  }

  async remove(id: string) {
    return this.prisma.shippingMethod.delete({
      where: { id }
    });
  }
}
