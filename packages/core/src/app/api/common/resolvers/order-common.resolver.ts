import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ListResponse } from '../utils';

import { OrderEntity } from '@/app/persistance';
import { OrderService } from '@/app/service';

@Resolver('Order')
export class OrderCommonResolver {
  constructor(private readonly orderService: OrderService) {}

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
}
