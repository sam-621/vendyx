import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Customer, OrderState } from '@prisma/client';

import { UserJwtAuthGuard } from '@/api/shared/guards/user.guard';
import { CustomerListInput, UpdateCustomerInput } from '@/api/shared/types/gql.types';
import { ListResponse } from '@/api/shared/utils/list-response';
import { CustomerService } from '@/business/customer/customer.service';
import { isErrorResult } from '@/business/shared/utils/error-result.utils';
import {
  PRISMA_FOR_SHOP,
  PrismaForShop
} from '@/persistence/prisma-clients/prisma-for-shop.provider';
import { ID } from '@/persistence/types/scalars.type';

@UseGuards(UserJwtAuthGuard)
@Resolver('Customer')
export class CustomerResolver {
  constructor(
    @Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop,
    private readonly customerService: CustomerService
  ) {}

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
    const result = await this.customerService.update(id, input);

    return isErrorResult(result) ? { apiErrors: [result] } : { customer: result, apiErrors: [] };
  }

  @ResolveField('totalSpent')
  async totalSpent(@Parent() customer: Customer) {
    const aggregation = await this.prisma.order.groupBy({
      by: ['customerId'],
      where: {
        customerId: customer.id,
        state: { notIn: [OrderState.MODIFYING, OrderState.CANCELED] }
      },
      _sum: { total: true }
    });

    const result = aggregation.find(agg => agg.customerId === customer.id);

    return result?._sum.total ?? 0;
  }
}
