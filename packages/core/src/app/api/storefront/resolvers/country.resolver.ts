import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { ListInput, ListResponse } from '../../common';

import { CountryEntity, ID } from '@/app/persistance';
import { CountryService } from '@/app/service';

@Resolver()
export class CountryResolver {
  constructor(private readonly countryService: CountryService) {}

  @Query('countries')
  async countries(@Args('input') input: ListInput) {
    const result = await this.countryService.find({ ...input, onlyEnabled: true });

    return new ListResponse(result, result.length);
  }

  @Query('country')
  async country(@Args('id') id: ID) {
    return await this.countryService.findUnique({ id, onlyEnabled: true });
  }

  @ResolveField('states')
  async products(@Parent() country: CountryEntity, @Args('input') input: ListInput) {
    const result = await this.countryService.findStates(country.id, {
      ...input,
      onlyEnabled: true
    });

    return new ListResponse(result, result.length);
  }
}
