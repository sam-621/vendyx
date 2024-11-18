import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { ListInput, ListResponse, ShopApiKeyGuard } from '@/api/shared';
import { CollectionService } from '@/business/collection';
import { ID } from '@/persistence/types';

@UseGuards(ShopApiKeyGuard)
@Resolver('Collection')
export class CollectionResolver {
  constructor(private readonly collectionService: CollectionService) {}

  @Query('collections')
  async collections(@Args('input') input?: ListInput) {
    const [collections, total] = await Promise.all([
      await this.collectionService.find({ ...input, filters: { enabled: { equals: true } } }),
      await this.collectionService.count({ ...input, filters: { enabled: { equals: true } } })
    ]);

    return new ListResponse(collections, collections.length, { total });
  }

  @Query('collection')
  async collection(@Args('id') id: ID, @Args('slug') slug: string) {
    return this.collectionService.findUnique(id, slug, { enabled: { equals: true } });
  }
}
