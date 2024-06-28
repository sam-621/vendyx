import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UpdateCustomerInput } from '../types';

import { CustomerService } from '@/app/service/services/customer.service';

@Resolver('Customer')
export class CustomerCommonResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query('customer')
  async customer(@Args('accessToken') accessToken: string) {
    return await this.customerService.findByAccessToken(accessToken);
  }

  @Mutation('updateCustomer')
  async updateCustomer(
    @Args('accessToken') accessToken: string,
    @Args('input') input: UpdateCustomerInput
  ) {
    return await this.customerService.update(accessToken, input);
  }
}
