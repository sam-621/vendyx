import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { ListResponse } from '../utils';

import { ID, OrderEntity } from '@/app/persistance';
import { OrderService } from '@/app/service';

@Resolver('Order')
export class OrderCommonResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query('order')
  async order(@Args('id') id: ID, @Args('code') code: string) {
    const order = await this.orderService.findUnique(id, code);

    return order;
  }

  @ResolveField('lines')
  async lines(@Parent() order: OrderEntity) {
    const lines = await this.orderService.findLines(order.id);

    return new ListResponse(lines, lines.length);
  }

  @ResolveField('customer')
  async customer(@Parent() order: OrderEntity) {
    const customer = await this.orderService.findCustomer(order.id);

    return customer;
  }

  @ResolveField('shippingAddress')
  async shippingAddress(@Parent() order: OrderEntity) {
    const shippingAddress = await this.orderService.findShippingAddress(
      order.id,
    );

    return shippingAddress;
  }
}
