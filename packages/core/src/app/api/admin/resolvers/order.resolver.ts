import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { ListInput, ListResponse } from '@/app/api/common';
import { OrderEntity } from '@/app/persistance';
import { OrderService } from '@/app/service';

@Resolver('Order')
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query('orders')
  async orders(@Args('input') input: ListInput) {
    const order = await this.orderService.find(input);

    return order;
  }

  @ResolveField('lines')
  async lines(@Parent() order: OrderEntity) {
    const lines = await this.orderService.findLines(order.id);
    console.log(lines);

    return new ListResponse(lines, lines.length);
  }
}
