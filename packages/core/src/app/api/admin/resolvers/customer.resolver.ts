import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AdminJwtAuthGuard, ListInput, ListResponse, UpdateCustomerInput } from '../../common';

import { ID } from '@/app/persistance';
import { CustomerService, isErrorResult } from '@/app/service';

@UseGuards(AdminJwtAuthGuard)
@Resolver('Customer')
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query('customer')
  async customer(@Args('id') id: ID) {
    return await this.customerService.findUnique({ id, onlyEnabled: false });
  }

  @Query('customers')
  async customers(@Args('input') input: ListInput) {
    const result = await this.customerService.find(input);

    return new ListResponse(result, result.length);
  }

  @Mutation('updateCustomer')
  async updateCustomer(@Args('id') id: ID, @Args('input') input: UpdateCustomerInput) {
    const result = await this.customerService.updateById(id, input);

    return isErrorResult(result) ? { apiErrors: [result] } : { customer: result, apiErrors: [] };
  }
}
