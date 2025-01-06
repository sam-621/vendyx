import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PRISMA_FOR_SHOP, PrismaForShop } from '../prisma-clients/prisma-for-shop.provider';

@Injectable()
export class VariantRepository {
  constructor(@Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop) {}

  findById(id: string) {
    return this.prisma.variant.findUnique({ where: { id } });
  }

  findByIdOrThrow(id: string) {
    return this.prisma.variant.findUniqueOrThrow({ where: { id } });
  }

  insert(input: Prisma.VariantCreateInput) {
    return this.prisma.variant.create({ data: input });
  }

  async update(id: string, input: Prisma.VariantUpdateInput) {
    return this.prisma.variant.update({ where: { id }, data: input });
  }

  async removeOptionValuesNotIn(variantId: string, ids: string[]) {
    return this.prisma.variantOptionValue.deleteMany({
      where: { optionValueId: { notIn: ids }, variantId }
    });
  }

  softDelete(id: string) {
    return this.prisma.variant.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}
