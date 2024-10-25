import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Order } from '@prisma/client';

import { ListResponse, OrderListInput } from '@/api/shared';
import { OrderService } from '@/business/order/order.service';
import { ID } from '@/persistance/types';

@Resolver('Order')
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query('order')
  async order(@Args('id') id: ID, @Args('code') code: string) {
    return this.orderService.findUnique(id, code);
  }

  @Query('orders')
  async orders(@Args('input') input: OrderListInput) {
    const [result, total] = await Promise.all([
      this.orderService.find(input),
      this.orderService.count(input)
    ]);

    return new ListResponse(result, result.length, { total });
  }

  @ResolveField('code')
  async code(@Parent() order: Order) {
    const { code } = order;

    return this.orderService.formatOrderCode(code);
  }
}
