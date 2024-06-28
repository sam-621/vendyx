import { Args, Query, Resolver } from '@nestjs/graphql';

import { ListInput } from '../../common';

import { CustomerService } from '@/app/service/services/customer.service';

@Resolver('Customer')
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query('customers')
  async customers(@Args('input') input: ListInput) {
    return await this.customerService.find(input);
  }
}
