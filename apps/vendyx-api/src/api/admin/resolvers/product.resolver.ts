import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import {
  CreateProductInput,
  ListInput,
  ListResponse,
  Product,
  UpdateProductInput,
  UserJwtAuthGuard
} from '@/api/shared';
import { ProductService } from '@/business/product';
import { clean } from '@/business/shared';
import { PRISMA_FOR_SHOP, PrismaForShop } from '@/persistance/prisma-clients';

@UseGuards(UserJwtAuthGuard)
@Resolver('Product')
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    @Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop
  ) {}

  @Query('products')
  async products(@Args('input') input: ListInput) {
    const [result, total] = await Promise.all([
      this.productService.find(input),
      this.productService.count()
    ]);

    return new ListResponse(result, result.length, { total });
  }

  @Query('product')
  async product(@Args('id') id: string) {
    return this.productService.findById(id);
  }

  @Mutation('createProduct')
  async createProduct(@Args('input') input: CreateProductInput) {
    return this.productService.create(input);
  }

  @Mutation('updateProduct')
  async updateProduct(@Args('id') id: string, @Args('input') input: UpdateProductInput) {
    return this.productService.update(id, input);
  }

  @Mutation('softRemoveProduct')
  async softRemove(@Args('id') id: string) {
    return this.productService.softRemove(id);
  }

  @ResolveField('variants')
  async variants(@Parent() product: Product, @Args('input') input?: ListInput) {
    const query = {
      where: { productId: product.id }
    };

    const [result, total] = await Promise.all([
      this.prisma.variant.findMany({ ...query, ...clean(input ?? {}) }),
      this.prisma.variant.count(query)
    ]);

    return new ListResponse(result, result.length, { total });
  }

  @ResolveField('options')
  async options(@Parent() product: Product) {
    return this.prisma.productOption.findMany({ where: { productId: product.id } });
  }
}
