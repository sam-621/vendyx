import { Inject, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { ShopApiKeyGuard } from '@/api/shared/guards/shop-api-key.guard';
import { ProductListInput } from '@/api/shared/types/gql.types';
import { ListResponse } from '@/api/shared/utils/list-response';
import { ProductService } from '@/business/product/product.service';
import {
  PRISMA_FOR_SHOP,
  PrismaForShop
} from '@/persistence/prisma-clients/prisma-for-shop.provider';
import { ID } from '@/persistence/types/scalars.type';

@UseGuards(ShopApiKeyGuard)
@Resolver('Product')
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    @Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop
  ) {}

  @Query('products')
  async products(@Args('input') input?: ProductListInput) {
    const [result, total] = await Promise.all([
      this.productService.find({
        ...input,
        filters: { ...input?.filters, enabled: { equals: true } }
      }),
      this.productService.count({
        ...input,
        filters: { ...input?.filters, enabled: { equals: true } }
      })
    ]);

    return new ListResponse(result, result.length, { total });
  }

  @Query('product')
  async product(@Args('id') id: ID, @Args('slug') slug: string) {
    return this.productService.findUnique(id, slug, { enabled: { equals: true } });
  }
}
