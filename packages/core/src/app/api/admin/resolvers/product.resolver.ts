import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import {
  AdminJwtAuthGuard,
  CreateProductInput,
  ListInput,
  ListResponse,
  UpdateProductInput,
} from '@/app/api/common';
import { ID, ProductEntity, VariantEntity } from '@/app/persistance';
import { ProductService } from '@/app/service';

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
    const product = await this.productService.findUnique({ id, slug });

    return product;
  }

  @Mutation('createProduct')
  async createProduct(@Args('input') input: CreateProductInput) {
    const product = await this.productService.create(input);

    return product;
  }

  @Mutation('updateProduct')
  async updateProduct(
    @Args('id') id: ID,
    @Args('input') input: UpdateProductInput,
  ) {
    const product = await this.productService.update(id, input);

    return product;
  }

  @Mutation('removeProduct')
  async removeProduct(@Args('id') id: ID) {
    const result = await this.productService.remove(id);

    return result;
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
}
