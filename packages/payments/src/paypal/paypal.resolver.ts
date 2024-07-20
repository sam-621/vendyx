import { ID } from '@ebloc/core';
import { Resolver, Mutation, Args } from '@nestjs/graphql';

@Resolver('Paypal')
export class PaypalResolver {
  constructor() {}

  @Mutation('createPaypalOrder')
  async createPaypalOrder(@Args('orderId') orderId: ID) {
    return orderId;
  }
}
