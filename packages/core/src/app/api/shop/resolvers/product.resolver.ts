import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { ListInput, ListResponse } from '../../common';

import {
  AssetEntity,
  ID,
  ProductEntity,
  VariantEntity,
} from '@/app/persistance';
import { ProductService } from '@/app/service';

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
    const product = await this.productService.findUnique({ id, slug });

    return product;
  }

  @ResolveField('variants')
  async variants(
    @Parent() product: ProductEntity,
    @Args('input') listInput: ListInput,
  ) {
    const variants = await this.productService.findVariants(
      product.id,
      listInput,
    );

    return new ListResponse<VariantEntity>(variants, variants.length);
  }

  @ResolveField('assets')
  async assets(
    @Parent() product: ProductEntity,
    @Args('input') listInput: ListInput,
  ) {
    const assets = await this.productService.findAssets(product.id, listInput);

    return new ListResponse<AssetEntity>(assets, assets.length);
  }
}
