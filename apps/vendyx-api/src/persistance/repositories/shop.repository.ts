import { Inject } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { ListInput } from '@/api/shared';
import { clean } from '@/business/shared';

import { PRISMA_FOR_SHOP, PrismaForShop } from '../prisma-clients';

export class ShopRepository {
  constructor(@Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop) {}

  async findMany(input?: ListInput) {
    return this.prisma.shop.findMany({ ...clean(input ?? {}) });
  }

  async findBySlug(slug: string) {
    return this.prisma.shop.findUnique({ where: { slug } });
  }

  async insert(input: Prisma.ShopCreateInput) {
    return this.prisma.shop.create({ data: input });
  }
}
