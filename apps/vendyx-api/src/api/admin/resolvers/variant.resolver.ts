import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { CreateVariantInput, UpdateVariantInput, UserJwtAuthGuard, Variant } from '@/api/shared';
import { VariantService } from '@/business/variant';
import { PRISMA_FOR_SHOP, PrismaForShop } from '@/persistance/prisma-clients';

@UseGuards(UserJwtAuthGuard)
@Resolver('Variant')
export class VariantResolver {
  constructor(
    private readonly variantService: VariantService,
    @Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop
  ) {}

  @Query('variant')
  async variant(@Args('id') id: string) {
    return await this.variantService.findById(id);
  }

  @Mutation('createVariant')
  async createVariant(@Args('productId') id: string, @Args('input') input: CreateVariantInput) {
    return await this.variantService.create(id, input);
  }

  @Mutation('updateVariant')
  async updateVariant(@Args('id') id: string, @Args('input') input: UpdateVariantInput) {
    return await this.variantService.update(id, input);
  }

  @Mutation('softRemoveVariant')
  async softRemoveVariant(@Args('id') id: string) {
    return await this.variantService.softRemove(id);
  }

  @ResolveField('product')
  async variants(@Parent() variant: Variant) {
    return await this.prisma.variant.findUnique({ where: { id: variant.id } }).product();
  }

  @ResolveField('optionValues')
  async optionValues(@Parent() variant: Variant) {
    const result = await this.prisma.variantOptionValue.findMany({
      where: { variantId: variant.id },
      select: { optionValue: true }
    });

    return result
      .map(({ optionValue }) => optionValue)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }
}
