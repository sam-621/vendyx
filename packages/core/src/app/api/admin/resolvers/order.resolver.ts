import { Args, Query, Resolver } from '@nestjs/graphql';

import { ListInput, ListResponse } from '@/app/api/common';
import { OrderService } from '@/app/service';

@Resolver('Order')
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query('orders')
  async orders(@Args('input') input: ListInput) {
    const order = await this.orderService.find(input);

    return new ListResponse(order, order.length);
  }
}
