import { ID } from '@ebloc/core';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { PaypalService } from './paypal.service';

@Resolver('Paypal')
export class PaypalResolver {
  constructor(private readonly paypalService: PaypalService) {}

  @Mutation('createPaypalOrder')
  async createPaypalOrder(@Args('orderId') orderId: ID) {
    await this.paypalService.createPaypalOrder();
    return orderId;
  }
}
