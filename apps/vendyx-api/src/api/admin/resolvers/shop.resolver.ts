import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateShopInput, ListInput } from '@/api/shared';
import { ShopService } from '@/business/shop';

@Resolver('Shop')
export class ShopResolver {
  constructor(private readonly shopService: ShopService) {}

  @Query('shop')
  async shop(@Args('slug') slug: string) {
    return this.shopService.findBySlug(slug);
  }

  @Query('shops')
  async shops(@Args('input') input: ListInput) {
    return this.shopService.find(input);
  }

  @Mutation('createShop')
  async createShop(@Args('ownerId') ownerId: string, @Args('input') input: CreateShopInput) {
    return this.shopService.create(ownerId, input);
  }
}
