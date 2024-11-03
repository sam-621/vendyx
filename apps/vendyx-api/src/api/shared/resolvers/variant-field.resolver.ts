import { Inject } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Variant } from '@prisma/client';

import { PRISMA_FOR_SHOP, PrismaForShop } from '@/persistance/prisma-clients';

import { FromOrders } from '../types';

@Resolver('Variant')
export class VariantFieldResolver {
  constructor(@Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop) {}

  @ResolveField('product')
  async variants(@Parent() variant: Variant) {
    return await this.prisma.variant
      .findUnique({
        where: {
          id: variant.id,
          // For this query we don`t need to check if the record has been deleted
          deletedAt: undefined
        }
      })
      .product();
  }

  @ResolveField('optionValues')
  async optionValues(@Parent() variant: Variant & FromOrders) {
    const result = await this.prisma.variantOptionValue.findMany({
      where: {
        variantId: variant.id,
        optionValue: { deletedAt: variant.fromOrders ? undefined : null }
      },
      select: { optionValue: true }
    });

    return result
      .map(({ optionValue }) => optionValue)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  @ResolveField('asset')
  async asset(@Parent() variant: Variant) {
    return await this.prisma.variant
      .findUnique({
        where: {
          id: variant.id,
          // For this query we don`t need to check if the record has been deleted
          deletedAt: undefined
        }
      })
      .asset();
  }
}
