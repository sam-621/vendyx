import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { CreateZoneInput, ListInput, UpdateZoneInput } from '../../common';

import { ID, ZoneEntity } from '@/app/persistance';
import { ZoneService, isErrorResult } from '@/app/service';

@Resolver('Zone')
export class ZoneResolver {
  constructor(private readonly zoneService: ZoneService) {}

  @Query('zone')
  zone(@Args('id') id: ID) {
    return this.zoneService.findUnique({ id });
  }

  @Query('zones')
  zones(@Args('input') input: ListInput) {
    return this.zoneService.find(input);
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

    return isErrorResult(result) ? { apiErrors: [result] } : { apiErrors: [], success: true };
  }

  @ResolveField('countries')
  countries(@Parent() zone: ZoneEntity, @Args('input') input: ListInput) {
    return this.zoneService.findCountries(zone.id, input);
  }
}
