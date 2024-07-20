import { ID, isErrorResult } from '@ebloc/core';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { PaypalService } from './paypal.service';

@Resolver('Paypal')
export class PaypalResolver {
  constructor(private readonly paypalService: PaypalService) {}

  @Mutation('createPaypalOrder')
  async createPaypalOrder(@Args('orderId') orderId: ID) {
    const result = await this.paypalService.createOrder(orderId);

    return isErrorResult(result) ? { apiErrors: [result] } : { apiErrors: [], orderId: result };
  }
}
