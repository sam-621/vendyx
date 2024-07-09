import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { CreateCountryInput, ListInput, ListResponse } from '../../common';

import { CountryEntity, ID } from '@/app/persistance';
import { CountryService, isErrorResult } from '@/app/service';

@Resolver()
export class CountryResolver {
  constructor(private readonly countryService: CountryService) {}

  @Query('countries')
  async countries(@Args('input') input: ListInput) {
    const result = await this.countryService.find(input);

    return new ListResponse(result, result.length);
  }

  @Query('country')
  async country(@Args('id') id: ID) {
    return await this.countryService.findUnique({ id });
  }

  @Mutation('createCountry')
  async createCountry(@Args('input') input: CreateCountryInput) {
    const result = await this.countryService.create(input);

    return isErrorResult(result) ? { apiErrors: [result] } : { apiErrors: [], country: result };
  }

  @Mutation('updateCountry')
  async updateCountry(@Args('id') id: ID, @Args('input') input: CreateCountryInput) {
    const result = await this.countryService.update(id, input);

    return isErrorResult(result) ? { apiErrors: [result] } : { apiErrors: [], country: result };
  }

  @Mutation('removeCountry')
  async removeCountry(@Args('id') id: ID) {
    const result = await this.countryService.remove(id);

    return isErrorResult(result) ? { apiErrors: [result] } : { apiErrors: [], country: result };
  }

  @ResolveField('states')
  async products(@Parent() country: CountryEntity, @Args('input') input: ListInput) {
    const result = await this.countryService.findStates(country.id, input);

    return new ListResponse(result, result.length);
  }
}
