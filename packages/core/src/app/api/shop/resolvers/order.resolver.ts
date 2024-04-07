import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import {
  CreateOrderInput,
  CreateOrderLineInput,
  ListResponse,
} from '@/app/api/common';
import { ID, OrderEntity } from '@/app/persistance';
import { OrderService } from '@/app/service';

@Resolver('Order')
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query('order')
  async order(@Args('id') id: ID, @Args('code') code: string) {
    const order = await this.orderService.findUnique(id, code);

    return order;
  }

  @Mutation('createOrder')
  async createProduct(@Args('input') input: CreateOrderInput) {
    const newOrder = await this.orderService.create();
    const orderWithLine = await this.orderService.addLine(
      newOrder.id,
      input.line,
    );

    return orderWithLine;
  }

  @Mutation('addLineToOrder')
  async addLineToOrder(
    @Args('orderId') orderId: ID,
    @Args('input') input: CreateOrderLineInput,
  ) {
    const order = await this.orderService.addLine(orderId, input);

    return order;
  }

  @Mutation('removeOrderLine')
  async removeOrderLine(@Args('lineId') lineId: ID) {
    const order = await this.orderService.removeLine(lineId);

    return order;
  }

  @ResolveField('lines')
  async lines(@Parent() order: OrderEntity) {
    const lines = await this.orderService.findLines(order.id);
    console.log(lines);

    return new ListResponse(lines, lines.length);
  }
}
