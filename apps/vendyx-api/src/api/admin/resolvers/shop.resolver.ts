import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateShopInput, ListInput, ListResponse, UserJwtAuthGuard } from '@/api/shared';
import { ShopService } from '@/business/shop';

@Resolver('Shop')
export class ShopResolver {
  constructor(private readonly shopService: ShopService) {}

  @UseGuards(UserJwtAuthGuard)
  @Query('shop')
  async shop(@Args('slug') slug: string) {
    return this.shopService.findBySlug(slug);
  }

  @UseGuards(UserJwtAuthGuard)
  @Query('shops')
  async shops(@Args('input') input: ListInput) {
    const result = await this.shopService.find(input);

    return new ListResponse(result, result.length);
  }

  @UseGuards(UserJwtAuthGuard)
  @Mutation('createShop')
  async createShop(@Args('ownerId') ownerId: string, @Args('input') input: CreateShopInput) {
    return this.shopService.create(ownerId, input);
  }
}
