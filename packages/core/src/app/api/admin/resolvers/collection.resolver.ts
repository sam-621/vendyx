import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateCollectionInput, ListInput, ListResponse } from '../../common';

import { ID } from '@/app/persistance';
import { CollectionService, isErrorResult } from '@/app/service';

@Resolver('Collection')
export class CollectionResolver {
  constructor(private readonly collectionService: CollectionService) {}

  @Query('collection')
  async collection(@Args('id') id: ID, @Args('slug') slug: string) {
    return this.collectionService.findByIdOrdSlug({ id, slug });
  }

  @Query('collections')
  async collections(@Args() input: ListInput) {
    const result = await this.collectionService.find(input);

    return new ListResponse(result, result.length);
  }

  @Mutation('createCollection')
  async createCollection(@Args('input') input: CreateCollectionInput) {
    const result = await this.collectionService.create(input);

    return isErrorResult(result) ? { apiErrors: [result] } : { apiErrors: [], collection: result };
  }

  @Mutation('updateCollection')
  async updateCollection(@Args('id') id: ID, @Args('input') input: CreateCollectionInput) {
    const result = await this.collectionService.update(id, input);

    return isErrorResult(result) ? { apiErrors: [result] } : { apiErrors: [], collection: result };
  }

  @Mutation('removeCollection')
  async removeCollection(@Args('id') id: ID) {
    const result = await this.collectionService.remove(id);

    return isErrorResult(result) ? { apiErrors: [result] } : { apiErrors: [], success: result };
  }

  @Mutation('setProductsInCollection')
  async setProductsInCollection(@Args('id') id: ID, @Args('productIds') productIds: ID[]) {
    const result = await this.collectionService.setProducts(id, productIds);

    return isErrorResult(result) ? { apiErrors: [result] } : { apiErrors: [], collection: result };
  }
}
