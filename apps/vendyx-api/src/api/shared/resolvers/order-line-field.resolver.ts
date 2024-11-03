import { Inject } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { OrderLine } from '@prisma/client';

import { PRISMA_FOR_SHOP, PrismaForShop } from '@/persistance/prisma-clients';

@Resolver('OrderLine')
export class OrderLineFieldResolver {
  constructor(@Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop) {}

  @ResolveField('productVariant')
  async productVariant(@Parent() orderLine: OrderLine) {
    const result = await this.prisma.orderLine.findUnique({
      where: { id: orderLine.id },
      select: { productVariant: true }
    });

    return { ...result?.productVariant, fromOrders: true };
  }
}
