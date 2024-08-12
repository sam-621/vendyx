import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreatePaymentMethodInput, UpdatePaymentMethodInput, UserJwtAuthGuard } from '@/api/shared';
import { PaymentMethodService } from '@/business/payment-method';

@UseGuards(UserJwtAuthGuard)
@Resolver('PaymentMethod')
export class PaymentMethodResolver {
  constructor(private readonly service: PaymentMethodService) {}

  @Query('paymentMethod')
  paymentMethod(@Args('id') id: string) {
    return this.service.findById(id);
  }

  @Query('paymentMethods')
  paymentMethods() {
    return this.service.find();
  }

  @Query('paymentIntegrations')
  paymentIntegrations() {
    return this.service.findIntegrations();
  }

  @Mutation('createPaymentMethod')
  createPaymentMethod(@Args('input') input: CreatePaymentMethodInput) {
    return this.service.create(input);
  }

  @Mutation('updatePaymentMethod')
  updatePaymentMethod(@Args('id') id: string, @Args('input') input: UpdatePaymentMethodInput) {
    return this.service.update(id, input);
  }

  @Mutation('removePaymentMethod')
  removePaymentMethod(@Args('id') id: string) {
    return this.service.remove(id);
  }
}
