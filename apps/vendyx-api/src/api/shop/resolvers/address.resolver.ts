import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import {
  CreateAddressInput,
  CurrentCustomer,
  CustomerJwtAuthGuard,
  ShopApiKeyGuard,
  TCurrentCustomer,
  UpdateAddressInput
} from '@/api/shared';
import { AddressService } from '@/business/address';
import { ID } from '@/persistence/types';

@UseGuards(ShopApiKeyGuard, CustomerJwtAuthGuard)
@Resolver('Address')
export class AddressResolver {
  constructor(private readonly addressService: AddressService) {}

  @Mutation('createCustomerAddress')
  async createCustomerAddress(
    @CurrentCustomer() customer: TCurrentCustomer,
    @Args('input') input: CreateAddressInput
  ) {
    const r = await this.addressService.create(customer.id, input);
    console.log(r);
    return r;
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
