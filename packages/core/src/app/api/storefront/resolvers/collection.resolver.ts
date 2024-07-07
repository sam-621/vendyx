import { Args, Query, Resolver } from '@nestjs/graphql';

import { ListInput, ListResponse } from '../../common';

import { ID } from '@/app/persistance';
import { CollectionService } from '@/app/service';

@Resolver('Collection')
export class CollectionResolver {
  constructor(private readonly collectionService: CollectionService) {}

  @Query('collections')
  async collections(@Args('input') input: ListInput) {
    const result = await this.collectionService.find({ ...input, onlyPublished: true });

    return new ListResponse(result, result.length);
  }

  @Query('collection')
  async collection(@Args('id') id: ID, @Args('slug') slug: string) {
    return this.collectionService.findByIdOrdSlug({ id, slug, onlyPublished: true });
  }
}
