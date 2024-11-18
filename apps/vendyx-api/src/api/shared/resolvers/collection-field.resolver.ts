import { Inject } from '@nestjs/common';
import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Collection } from '@prisma/client';

import { ProductService } from '@/business/product';
import { PRISMA_FOR_SHOP, PrismaForShop } from '@/persistence/prisma-clients';

import { ProductListInput } from '../types';
import { ListResponse } from '../utils';

@Resolver('Collection')
export class CollectionFieldResolver {
  constructor(
    @Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop,
    private readonly productService: ProductService
  ) {}

  @ResolveField('products')
  async products(@Parent() collection: Collection, @Args('input') input: ProductListInput) {
    const [result, total] = await Promise.all([
      this.productService.find(input, collection.id),
      this.productService.count(input, collection.id)
    ]);

    return new ListResponse(result, result.length, { total });
  }

  @ResolveField('assets')
  async assets(@Parent() collection: Collection) {
    const [result, total] = await Promise.all([
      this.prisma.asset.findMany({
        where: { collections: { some: { collectionId: collection.id } } }
      }),
      this.prisma.asset.count({
        where: { collections: { some: { collectionId: collection.id } } }
      })
    ]);

    return new ListResponse(result, result.length, { total });
  }
}
