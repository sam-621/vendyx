import { Inject } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PRISMA_FOR_SHOP, PrismaForShop } from '../prisma-clients';
import { ID } from '../types';

export class ShippingMethodRepository {
  constructor(@Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop) {}

  find(options?: FindOptions) {
    return this.prisma.shippingMethod.findMany({
      orderBy: { createdAt: 'desc' },
      where: options?.onlyEnabled ? { enabled: true } : undefined
    });
  }

  findByIdOrThrow(id: ID, options?: FindOptions) {
    return this.prisma.shippingMethod.findUniqueOrThrow({
      where: { id, ...(options?.onlyEnabled ? { enabled: true } : undefined) }
    });
  }

  findById(id: ID, options?: FindOptions) {
    return this.prisma.shippingMethod.findUniqueOrThrow({
      where: { id, ...(options?.onlyEnabled ? { enabled: true } : undefined) },
      include: { shippingHandler: true }
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

type FindOptions = { onlyEnabled?: boolean };
