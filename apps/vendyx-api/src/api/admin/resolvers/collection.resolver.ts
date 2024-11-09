import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  CreateCollectionInput,
  ListInput,
  ListResponse,
  UpdateCollectionInput,
  UserJwtAuthGuard
} from '@/api/shared';
import { CollectionService } from '@/business/collection';
import { ID } from '@/persistance/types';

@UseGuards(UserJwtAuthGuard)
@Resolver('Collection')
export class CollectionResolver {
  constructor(private readonly collectionService: CollectionService) {}

  @Query('collections')
  async collections(@Args('input') input?: ListInput) {
    const [collections, total] = await Promise.all([
      await this.collectionService.find(input),
      await this.collectionService.count(input)
    ]);

    return new ListResponse(collections, collections.length, { total });
  }

  @Query('collection')
  async collection(@Args('id') id: ID) {
    return this.collectionService.findById(id);
  }

  @Mutation('createCollection')
  async createCollection(@Args('input') input: CreateCollectionInput) {
    return this.collectionService.create(input);
  }

  @Mutation('updateCollection')
  async updateCollection(@Args('id') id: ID, @Args('input') input: UpdateCollectionInput) {
    return this.collectionService.update(id, input);
  }

  @Mutation('removeCollection')
  async removeCollection(@Args('id') id: ID) {
    return this.collectionService.remove(id);
  }
}
