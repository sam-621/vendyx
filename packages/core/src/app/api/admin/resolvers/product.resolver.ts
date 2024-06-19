import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  AdminJwtAuthGuard,
  CreateProductInput,
  ListInput,
  ListResponse,
  UpdateProductInput
} from '@/app/api/common';
import { ID } from '@/app/persistance';
import { ProductService, isErrorResult } from '@/app/service';

@UseGuards(AdminJwtAuthGuard)
@Resolver('Product')
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query('products')
  async products(@Args('input') input: ListInput) {
    const product = await this.productService.find(input);

    return new ListResponse(product, product.length);
  }

  @Query('product')
  async product(@Args('id') id: ID, @Args('slug') slug: string) {
    console.log('get');

    const product = await this.productService.findUnique({ id, slug });

    return product;
  }

  @Mutation('createProduct')
  async createProduct(@Args('input') input: CreateProductInput) {
    const result = await this.productService.create(input);

    return isErrorResult(result) ? { apiErrors: [result] } : { product: result, apiErrors: [] };
  }

  @Mutation('updateProduct')
  async updateProduct(@Args('id') id: ID, @Args('input') input: UpdateProductInput) {
    const result = await this.productService.update(id, input);

    return isErrorResult(result) ? { apiErrors: [result] } : { product: result, apiErrors: [] };
  }

  @Mutation('removeProduct')
  async removeProduct(@Args('id') id: ID) {
    const result = await this.productService.remove(id);

    return isErrorResult(result) ? { apiErrors: [result] } : { success: result, apiErrors: [] };
  }
}
