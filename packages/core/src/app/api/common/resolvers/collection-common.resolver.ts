import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ListInput } from '../types';
import { ListResponse } from '../utils';

import { CollectionEntity } from '@/app/persistance';
import { CollectionService } from '@/app/service';

@Resolver('Collection')
export class CollectionCommonResolver {
  constructor(private readonly collectionService: CollectionService) {}

  @ResolveField('products')
  async products(@Parent() collection: CollectionEntity, @Args('input') input: ListInput) {
    const result = await this.collectionService.findProducts(collection.id, input);

    return new ListResponse(result, result.length);
  }
}
