import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  AddPaymentToOrderInput,
  AddShipmentToOrderInput,
  CreateAddressInput,
  CreateCustomerInput,
  CreateOrderInput,
  CreateOrderLineInput,
  UpdateOrderLineInput
} from '@/app/api/common';
import { ID } from '@/app/persistance';
import { OrderService, isErrorResult } from '@/app/service';

@Resolver('Order')
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query('availableShippingMethods')
  async availableShippingMethods(@Args('orderId') orderId: ID) {
    const shippingMethods = await this.orderService.findAvailableShippingMethods(orderId);

    return shippingMethods;
  }

  @Mutation('createOrder')
  async createOrder(@Args('input') input: CreateOrderInput) {
    const newOrder = await this.orderService.create();

    const result = input.line ? await this.orderService.addLine(newOrder.id, input.line) : newOrder;

    return isErrorResult(result) ? { apiErrors: [result] } : { order: result, apiErrors: [] };
  }

  @Mutation('addLineToOrder')
  async addLineToOrder(@Args('orderId') orderId: ID, @Args('input') input: CreateOrderLineInput) {
    const result = await this.orderService.addLine(orderId, input);

    return isErrorResult(result) ? { apiErrors: [result] } : { order: result, apiErrors: [] };
  }

  @Mutation('updateOrderLine')
  async updateOrderLine(@Args('lineId') lineId: ID, @Args('input') input: UpdateOrderLineInput) {
    const result = await this.orderService.updateLine(lineId, input);

    return isErrorResult(result) ? { apiErrors: [result] } : { order: result, apiErrors: [] };
  }

  @Mutation('removeOrderLine')
  async removeOrderLine(@Args('lineId') lineId: ID) {
    const result = await this.orderService.removeLine(lineId);

    return isErrorResult(result) ? { apiErrors: [result] } : { order: result, apiErrors: [] };
  }

  @Mutation('addCustomerToOrder')
  async addCustomerToOrder(
    @Args('orderId') orderId: ID,
    @Args('input') input: CreateCustomerInput
  ) {
    const result = await this.orderService.addCustomer(orderId, input);

    return isErrorResult(result) ? { apiErrors: [result] } : { order: result, apiErrors: [] };
  }

  @Mutation('addShippingAddressToOrder')
  async addShippingAddressToOrder(
    @Args('orderId') orderId: ID,
    @Args('input') input: CreateAddressInput
  ) {
    const result = await this.orderService.addShippingAddress(orderId, input);

    return isErrorResult(result) ? { apiErrors: [result] } : { order: result, apiErrors: [] };
  }

  @Mutation('addShipmentToOrder')
  async addShipmentToOrder(
    @Args('orderId') orderId: ID,
    @Args('input') input: AddShipmentToOrderInput
  ) {
    const result = await this.orderService.addShipment(orderId, input);

    return isErrorResult(result) ? { apiErrors: [result] } : { order: result, apiErrors: [] };
  }

  @Mutation('addPaymentToOrder')
  async addPaymentToOrder(
    @Args('orderId') orderId: ID,
    @Args('input') input: AddPaymentToOrderInput
  ) {
    const result = await this.orderService.addPayment(orderId, input);

    return isErrorResult(result) ? { apiErrors: [result] } : { order: result, apiErrors: [] };
  }
}
