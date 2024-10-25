import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  AddCustomerToOrderInput,
  AddPaymentToOrderInput,
  AddShipmentToOrderInput,
  CreateAddressInput,
  CreateOrderInput,
  CreateOrderLineInput,
  ShopApiKeyGuard,
  UpdateOrderLineInput
} from '@/api/shared';
import { OrderService } from '@/business/order/order.service';
import { isErrorResult } from '@/business/shared';
import { ID } from '@/persistance/types';
import { ShipmentService } from '@/shipments';

@UseGuards(ShopApiKeyGuard)
@Resolver('Order')
export class OrderResolver {
  constructor(
    private readonly orderService: OrderService,
    private readonly shipmentService: ShipmentService
  ) {}

  @Query('order')
  async order(@Args('id') id: ID, @Args('code') code: string) {
    return this.orderService.findUnique(id, code);
  }

  @Mutation('createOrder')
  async createOrder(@Args('input') input: CreateOrderInput) {
    const result = await this.orderService.create(input);

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
    @Args('input') input: AddCustomerToOrderInput
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

  @Query('availableShippingMethods')
  async availableShippingMethods(@Args('orderId') orderId: ID) {
    const shippingMethods = await this.orderService.findAvailableShippingMethods(orderId);

    if (isErrorResult(shippingMethods)) {
      return [];
    }

    return shippingMethods.map(shippingMethod => ({
      ...shippingMethod,
      pricePreview: this.shipmentService.getPricePreview(
        shippingMethod.shippingHandler.handlerCode,
        shippingMethod.handlerMetadata as Record<string, string>
      )
    }));
  }

  @Query('availablePaymentMethods')
  async availablePaymentMethods() {
    const result = await this.orderService.findAvailablePaymentMethods();

    return result;
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
