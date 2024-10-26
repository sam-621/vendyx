import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  CreateCustomerInput,
  ShopApiKeyGuard,
  UpdateCustomerInput,
  UpdateCustomerPasswordInput
} from '@/api/shared';
import { CustomerService } from '@/business/customer';
import { isErrorResult } from '@/business/shared';

@UseGuards(ShopApiKeyGuard)
@Resolver('Customer')
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query('customer')
  async customer(@Args('accessToken') accessToken: string) {
    return this.customerService.findByAccessToken(accessToken);
  }

  @Mutation('createCustomer')
  async createCustomer(@Args('input') input: CreateCustomerInput) {
    const result = await this.customerService.create(input);

    return isErrorResult(result) ? { apiErrors: [result] } : { customer: result, apiErrors: [] };
  }

  @Mutation('updateCustomer')
  async updateCustomer(
    @Args('accessToken') accessToken: string,
    @Args('input') input: UpdateCustomerInput
  ) {
    const result = await this.customerService.updateByAccessToken(accessToken, input);

    return isErrorResult(result) ? { apiErrors: [result] } : { customer: result, apiErrors: [] };
  }

  @Mutation('updateCustomerPassword')
  async updateCustomerPassword(
    @Args('accessToken') accessToken: string,
    @Args('input') input: UpdateCustomerPasswordInput
  ) {
    const result = await this.customerService.updatePassword(accessToken, input);

    return isErrorResult(result) ? { apiErrors: [result] } : { customer: result, apiErrors: [] };
  }

  @Mutation('generateCustomerAccessToken')
  async generateCustomerAccessToken(
    @Args('email') email: string,
    @Args('password') password: string
  ) {
    const result = await this.customerService.generateAccessToken(email, password);

    return isErrorResult(result) ? { apiErrors: [result] } : { accessToken: result, apiErrors: [] };
  }
}
