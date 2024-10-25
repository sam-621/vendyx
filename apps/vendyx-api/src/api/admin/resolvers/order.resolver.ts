import { Args, Query, Resolver } from '@nestjs/graphql';

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
}
