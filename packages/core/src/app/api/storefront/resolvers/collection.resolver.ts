import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { ListInput, ListResponse } from '../../common';

import { CollectionEntity, ID } from '@/app/persistance';
import { CollectionService } from '@/app/business';

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

  @ResolveField('products')
  async products(@Parent() collection: CollectionEntity, @Args('input') input: ListInput) {
    const result = await this.collectionService.findProducts(collection.id, {
      ...input,
      onlyEnabled: true
    });

    return new ListResponse(result, result.length);
  }
}
