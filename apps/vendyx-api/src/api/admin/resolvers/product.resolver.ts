import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateProductInput, ListInput, UpdateProductInput } from '@/api/shared';
import { ProductService } from '@/business/product';

@Resolver('Product')
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query('products')
  async products(@Args('input') input: ListInput) {
    return this.productService.find(input);
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

  @Mutation('softRemove')
  async softRemove(@Args('id') id: string) {
    return this.productService.softRemove(id);
  }
}
