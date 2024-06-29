import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ListInput } from '../types';
import { ListResponse } from '../utils';

import { CustomerEntity } from '@/app/persistance';
import { CustomerService } from '@/app/service';

@Resolver('Customer')
export class CustomerCommonResolver {
  constructor(private readonly customerService: CustomerService) {}

  @ResolveField('orders')
  async orders(@Parent() customer: CustomerEntity, @Args('input') input: ListInput) {
    const result = await this.customerService.findOrders(customer.id, input);

    return new ListResponse(result, result.length);
  }

  @ResolveField('addresses')
  async addresses(@Parent() customer: CustomerEntity, @Args('input') input: ListInput) {
    const result = await this.customerService.findAddresses(customer.id, input);

    return new ListResponse(result, result.length);
  }
}
