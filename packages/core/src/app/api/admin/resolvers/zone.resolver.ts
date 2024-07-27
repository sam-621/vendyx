import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import {
  AdminJwtAuthGuard,
  CreateZoneInput,
  ListInput,
  ListResponse,
  UpdateZoneInput
} from '../../common';

import { ID, ZoneEntity } from '@/app/persistance';
import { ShippingMethodService, ZoneService, isErrorResult } from '@/app/business';

@UseGuards(AdminJwtAuthGuard)
@Resolver('Zone')
export class ZoneResolver {
  constructor(
    private readonly zoneService: ZoneService,
    private readonly shippingMethodService: ShippingMethodService
  ) {}

  @Query('zone')
  zone(@Args('id') id: ID) {
    return this.zoneService.findUnique({ id });
  }

  @Query('zones')
  async zones(@Args('input') input: ListInput) {
    const result = await this.zoneService.find(input);

    return new ListResponse(result, result.length);
  }

  @Mutation('createZone')
  async createZone(@Args('input') input: CreateZoneInput) {
    const result = await this.zoneService.create(input);

    return isErrorResult(result) ? { apiErrors: [result] } : { apiErrors: [], zone: result };
  }

  @Mutation('updateZone')
  async updateZone(@Args('id') id: ID, @Args('input') input: UpdateZoneInput) {
    const result = await this.zoneService.update(id, input);

    return isErrorResult(result) ? { apiErrors: [result] } : { apiErrors: [], zone: result };
  }

  @Mutation('removeZone')
  async removeZone(@Args('id') id: ID) {
    const result = await this.zoneService.remove(id);

    return isErrorResult(result) ? { apiErrors: [result] } : { apiErrors: [], success: true };
  }

  @Mutation('setCountriesToZone')
  async setCountriesToZone(@Args('id') id: ID, @Args('countriesIds') countriesIds: ID[]) {
    const result = await this.zoneService.setCountries(id, countriesIds);

    return isErrorResult(result) ? { apiErrors: [result] } : { apiErrors: [], zone: result };
  }

  @ResolveField('countries')
  async countries(@Parent() zone: ZoneEntity, @Args('input') input: ListInput) {
    const result = await this.zoneService.findCountries(zone.id, input);

    return new ListResponse(result, result.length);
  }

  @ResolveField('shippingMethods')
  async shippingMethods(@Parent() zone: ZoneEntity, @Args('input') input: ListInput) {
    const result = await this.zoneService.findShippingMethods(zone.id, input);
    const shippingMethodsWithPricePreview = result.map(method => ({
      ...method,
      pricePreview: this.shippingMethodService.getPricePreview(method)
    }));

    return new ListResponse(shippingMethodsWithPricePreview, result.length);
  }
}
