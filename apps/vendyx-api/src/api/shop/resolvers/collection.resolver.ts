import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { ShopApiKeyGuard } from '@/api/shared/guards/shop-api-key.guard';
import { ListInput } from '@/api/shared/types/gql.types';
import { ListResponse } from '@/api/shared/utils/list-response';
import { CollectionService } from '@/business/collection/collection.service';
import { ID } from '@/persistence/types/scalars.type';

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
