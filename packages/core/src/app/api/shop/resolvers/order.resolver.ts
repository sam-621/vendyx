import { Args, Mutation, Resolver } from '@nestjs/graphql';

import {
  AddPaymentToOrderInput,
  AddShipmentToOrderInput,
  CreateAddressInput,
  CreateCustomerInput,
  CreateOrderInput,
  CreateOrderLineInput,
  UpdateOrderLineInput,
} from '@/app/api/common';
import { ID } from '@/app/persistance';
import { OrderService } from '@/app/service';

@Resolver('Order')
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation('createOrder')
  async createOrder(@Args('input') input: CreateOrderInput) {
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

  @Mutation('updateOrderLine')
  async updateOrderLine(
    @Args('lineId') lineId: ID,
    @Args('input') input: UpdateOrderLineInput,
  ) {
    const order = await this.orderService.updateLine(lineId, input);

    return order;
  }

  @Mutation('removeOrderLine')
  async removeOrderLine(@Args('lineId') lineId: ID) {
    const order = await this.orderService.removeLine(lineId);

    return order;
  }

  @Mutation('addCustomerToOrder')
  async addCustomerToOrder(
    @Args('orderId') orderId: ID,
    @Args('input') input: CreateCustomerInput,
  ) {
    const order = await this.orderService.addCustomer(orderId, input);

    return order;
  }

  @Mutation('addShippingAddressToOrder')
  async addShippingAddressToOrder(
    @Args('orderId') orderId: ID,
    @Args('input') input: CreateAddressInput,
  ) {
    const order = await this.orderService.addShippingAddress(orderId, input);

    return order;
  }

  @Mutation('addPaymentToOrder')
  async addPaymentToOrder(
    @Args('orderId') orderId: ID,
    @Args('input') input: AddPaymentToOrderInput,
  ) {
    const order = await this.orderService.addPayment(orderId, input);

    return order;
  }

  @Mutation('addShipmentToOrder')
  async addShipmentToOrder(
    @Args('orderId') orderId: ID,
    @Args('input') input: AddShipmentToOrderInput,
  ) {
    const order = await this.orderService.addShipment(orderId, input);

    return order;
  }
}
