import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  CustomerListInput,
  ListResponse,
  UpdateCustomerInput,
  UserJwtAuthGuard
} from '@/api/shared';
import { CustomerService } from '@/business/customer';
import { isErrorResult } from '@/business/shared';
import { ID } from '@/persistance/types';

@UseGuards(UserJwtAuthGuard)
@Resolver('Customer')
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query('customer')
  async customer(@Args('id') id: ID) {
    return this.customerService.findById(id);
  }

  @Query('customers')
  async customers(@Args('input') input: CustomerListInput) {
    const [result, total] = await Promise.all([
      this.customerService.find(input),
      this.customerService.count(input)
    ]);

    return new ListResponse(result, result.length, { total });
  }

  @Mutation('updateCustomer')
  async updateCustomer(@Args('id') id: ID, @Args('input') input: UpdateCustomerInput) {
    const result = await this.customerService.updateById(id, input);

    return isErrorResult(result) ? { apiErrors: [result] } : { customer: result, apiErrors: [] };
  }
}
