import { Inject } from '@nestjs/common';
import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Customer } from '@prisma/client';

import { OrderService } from '@/business/order';
import { clean } from '@/business/shared';
import { PRISMA_FOR_SHOP, PrismaForShop } from '@/persistence/prisma-clients';

import { ListInput, OrderListInput } from '../types';
import { ListResponse } from '../utils';

@Resolver('Customer')
export class CustomerFieldResolver {
  constructor(
    @Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop,
    private readonly orderService: OrderService
  ) {}

  @ResolveField('orders')
  async orders(@Parent() customer: Customer, @Args('input') input: OrderListInput) {
    const [result, total] = await Promise.all([
      this.orderService.find(input, customer.id),
      this.orderService.count(input, customer.id)
    ]);

    return new ListResponse(result, result.length, { total });
  }

  @ResolveField('addresses')
  async addresses(@Parent() customer: Customer, @Args('input') input?: ListInput) {
    const [result, total] = await Promise.all([
      this.prisma.address.findMany({
        ...clean({ skip: input?.skip, take: input?.take }),
        where: { customerId: customer.id },
        orderBy: { createdAt: 'asc' }
      }),
      this.prisma.address.count({
        ...clean({ skip: input?.skip, take: input?.take }),
        where: { customerId: customer.id }
      })
    ]);

    return new ListResponse(result, result.length, { total });
  }
}
