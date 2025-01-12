import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import {
  CurrentCustomer,
  TCurrentCustomer
} from '@/api/shared/decorator/current-customer.decorator';
import { CustomerJwtAuthGuard } from '@/api/shared/guards/customer.guard';
import { ShopApiKeyGuard } from '@/api/shared/guards/shop-api-key.guard';
import { CreateAddressInput, UpdateAddressInput } from '@/api/shared/types/gql.types';
import { AddressService } from '@/business/address/address.service';
import { ID } from '@/persistence/types/scalars.type';

@UseGuards(ShopApiKeyGuard, CustomerJwtAuthGuard)
@Resolver('Address')
export class AddressResolver {
  constructor(private readonly addressService: AddressService) {}

  @Mutation('createCustomerAddress')
  async createCustomerAddress(
    @CurrentCustomer() customer: TCurrentCustomer,
    @Args('input') input: CreateAddressInput
  ) {
    return await this.addressService.create(customer.id, input);
  }

  @Mutation('updateCustomerAddress')
  async updateCustomerAddress(
    @CurrentCustomer() customer: TCurrentCustomer,
    @Args('addressId') addressId: ID,
    @Args('input') input: UpdateAddressInput
  ) {
    return await this.addressService.update(customer.id, addressId, input);
  }

  @Mutation('removeCustomerAddress')
  async removeCustomerAddress(@Args('addressId') addressId: ID) {
    return await this.addressService.remove(addressId);
  }
}
