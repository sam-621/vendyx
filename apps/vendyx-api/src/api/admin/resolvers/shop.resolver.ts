import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Shop } from '@prisma/client';

import { CreateShopInput, ListInput, ListResponse, UserJwtAuthGuard } from '@/api/shared';
import { ShopService } from '@/business/shop';
import { PRISMA_FOR_SHOP, PrismaForShop } from '@/persistance/prisma-clients';

@Resolver('Shop')
export class ShopResolver {
  constructor(
    private readonly shopService: ShopService,
    @Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop
  ) {}

  @UseGuards(UserJwtAuthGuard)
  @Query('shop')
  async shop(@Args('slug') slug: string) {
    return this.shopService.findBySlug(slug);
  }

  @UseGuards(UserJwtAuthGuard)
  @Query('shops')
  async shops(@Args('input') input: ListInput) {
    const [result, total] = await Promise.all([
      this.shopService.find(input),
      this.shopService.count()
    ]);

    return new ListResponse(result, result.length, { total });
  }

  @UseGuards(UserJwtAuthGuard)
  @Mutation('createShop')
  async createShop(@Args('input') input: CreateShopInput) {
    return this.shopService.create(input);
  }

  @ResolveField('owner')
  async owner(@Parent() shop: Shop) {
    return this.prisma.shop.findUnique({ where: { id: shop.id } }).owner();
  }
}
