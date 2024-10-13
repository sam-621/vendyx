import { Inject } from '@nestjs/common';
import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Order } from '@prisma/client';

import { clean } from '@/business/shared';
import { PRISMA_FOR_SHOP, PrismaForShop } from '@/persistance/prisma-clients';

import { ListInput } from '../types';
import { ListResponse } from '../utils';

@Resolver('Order')
export class OrderFieldResolver {
  constructor(@Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop) {}

  @ResolveField('lines')
  async lines(@Parent() order: Order, @Args('input') input: ListInput) {
    const [result, total] = await Promise.all([
      this.prisma.orderLine.findMany({
        ...clean(input),
        where: { orderId: order.id }
      }),
      this.prisma.orderLine.count({
        where: { orderId: order.id }
      })
    ]);

    return new ListResponse(result, result.length, { total });
  }
}
