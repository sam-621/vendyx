import { Inject } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Variant } from '@prisma/client';

import { PRISMA_FOR_SHOP, PrismaForShop } from '@/persistance/prisma-clients';

@Resolver('Variant')
export class VariantFieldResolver {
  constructor(@Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop) {}

  @ResolveField('product')
  async variants(@Parent() variant: Variant) {
    return await this.prisma.variant.findUnique({ where: { id: variant.id } }).product();
  }

  @ResolveField('optionValues')
  async optionValues(@Parent() variant: Variant) {
    const result = await this.prisma.variantOptionValue.findMany({
      where: { variantId: variant.id, optionValue: { deletedAt: null } },
      select: { optionValue: true }
    });

    return result
      .map(({ optionValue }) => optionValue)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }
}
