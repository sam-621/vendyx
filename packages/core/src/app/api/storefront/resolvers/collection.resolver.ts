import { Args, Query, Resolver } from '@nestjs/graphql';

import { ID } from '@/app/persistance';
import { CollectionService } from '@/app/service';

@Resolver('Collection')
export class CollectionResolver {
  constructor(private readonly collectionService: CollectionService) {}

  @Query('collection')
  async collections(@Args('id') id: ID, @Args('slug') slug: string) {
    return this.collectionService.findByIdOrdSlug({ id, slug, onlyEnabled: true });
  }
}
