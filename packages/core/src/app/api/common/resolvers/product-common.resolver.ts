import { UseGuards } from '@nestjs/common';
import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AdminJwtAuthGuard, ListInput, ListResponse } from '@/app/api/common';
import { AssetEntity, ProductEntity, VariantEntity } from '@/app/persistance';
import { ProductService } from '@/app/service';

@UseGuards(AdminJwtAuthGuard)
@Resolver('Product')
export class ProductCommonResolver {
  constructor(private readonly productService: ProductService) {}

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
