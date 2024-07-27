import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  AdminJwtAuthGuard,
  ListInput,
  ListResponse,
  MarkOrderAsShippedInput
} from '@/app/api/common';
import { ID } from '@/app/persistance';
import { OrderService, isErrorResult } from '@/app/business';

@UseGuards(AdminJwtAuthGuard)
@Resolver('Order')
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query('orders')
  async orders(@Args('input') input: ListInput) {
    const order = await this.orderService.find(input);

    return new ListResponse(order, order.length);
  }

  @Mutation('markOrderAsShipped')
  async markOrderAsShipped(@Args('id') id: ID, @Args('input') input: MarkOrderAsShippedInput) {
    const result = await this.orderService.markAsShipped(id, input);

    return isErrorResult(result) ? { apiErrors: [result] } : { order: result, apiErrors: [] };
  }

  @Mutation('markOrderAsDelivered')
  async markOrderAsDelivered(@Args('id') id: ID) {
    const result = await this.orderService.markAsDelivered(id);

    return isErrorResult(result) ? { apiErrors: [result] } : { order: result, apiErrors: [] };
  }

  @Mutation('cancelOrder')
  async cancelOrder(@Args('id') id: ID) {
    const result = await this.orderService.cancelOrder(id);

    return isErrorResult(result) ? { apiErrors: [result] } : { order: result, apiErrors: [] };
  }
}
