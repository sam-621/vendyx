import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  AdminJwtAuthGuard,
  CreatePaymentMethodInput,
  ListInput,
  ListResponse,
  UpdatePaymentMethodInput
} from '../../common';

import { ID } from '@/app/persistance';
import { PaymentMethodService, isErrorResult } from '@/app/business';

@UseGuards(AdminJwtAuthGuard)
@Resolver('PaymentMethod')
export class PaymentMethodResolver {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @Query('paymentMethods')
  async paymentMethods(@Args('input') input: ListInput) {
    const paymentMethods = await this.paymentMethodService.find(input);
    console.log({
      paymentMethods
    });

    return new ListResponse(paymentMethods, paymentMethods.length);
  }

  @Query('paymentMethod')
  async paymentMethod(@Args('id') id: ID) {
    const paymentMethod = await this.paymentMethodService.findUnique({ id });

    return paymentMethod;
  }

  @Mutation('createPaymentMethod')
  async createPaymentMethod(@Args('input') input: CreatePaymentMethodInput) {
    const result = await this.paymentMethodService.create(input);

    return isErrorResult(result)
      ? { apiErrors: [result] }
      : { apiErrors: [], paymentMethod: result };
  }

  @Mutation('updatePaymentMethod')
  async updatePaymentMethod(@Args('id') id: ID, @Args('input') input: UpdatePaymentMethodInput) {
    const result = await this.paymentMethodService.update(id, input);

    return isErrorResult(result)
      ? { apiErrors: [result] }
      : { apiErrors: [], paymentMethod: result };
  }

  @Mutation('removePaymentMethod')
  async removePaymentMethod(@Args('id') id: ID) {
    const result = await this.paymentMethodService.remove(id);

    return isErrorResult(result) ? { apiErrors: [result] } : { apiErrors: [], success: true };
  }
}
