import { Args, Query, Resolver } from '@nestjs/graphql';

import { ListInput, ListResponse } from '../../common';

import { ProductService } from '@/business';
import { ID } from '@/persistance';

@Resolver('Product')
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query('products')
  async products(@Args('input') input: ListInput) {
    const product = await this.productService.find({
      ...input,
      enabled: true
    });

    return new ListResponse(product, product.length);
  }

  @Query('product')
  async product(@Args('id') id: ID, @Args('slug') slug: string) {
    const product = await this.productService.findUnique({
      id,
      slug,
      enabled: true
    });

    return product;
  }
}
