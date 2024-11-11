import { Inject, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { ListResponse, ProductListInput, ShopApiKeyGuard } from '@/api/shared';
import { ProductService } from '@/business/product';
import { PRISMA_FOR_SHOP, PrismaForShop } from '@/persistance/prisma-clients';

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
  async product(@Args('id') id: string) {
    return this.productService.findById(id);
  }
}
