import { Args, Query, Resolver } from '@nestjs/graphql';

import { ListInput, ListResponse } from '../../common';

import { ID } from '@/app/persistance';
import { CountryService } from '@/app/service';

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
}
