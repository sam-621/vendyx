import { Args, Query, Resolver } from '@nestjs/graphql';

import { ListInput } from '../types';
import { ListResponse } from '../utils';

import { CollectionService } from '@/app/service';

@Resolver('Collection')
export class CollectionCommonResolver {
  constructor(private readonly collectionService: CollectionService) {}

  @Query('collections')
  async collections(@Args() input: ListInput) {
    const result = await this.collectionService.find(input);

    return new ListResponse(result, result.length);
  }
}
