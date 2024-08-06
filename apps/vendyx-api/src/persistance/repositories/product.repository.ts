import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { ListInput } from '@/api/shared';
import { clean } from '@/business/shared';

import { PRISMA_FOR_SHOP, PrismaForShop } from '../prisma-clients';

@Injectable()
export class ProductRepository {
  constructor(@Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop) {}

  findMany(input?: ListInput) {
    return this.prisma.product.findMany({ ...clean(input ?? {}) });
  }

  findBySlug(slug: string) {
    return this.prisma.product.findUnique({ where: { slug } });
  }

  findById(id: string) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  insert(input: Prisma.ProductCreateInput) {
    return this.prisma.product.create({ data: input });
  }

  update(id: string, input: Prisma.ProductUpdateInput) {
    return this.prisma.product.update({ where: { id }, data: input });
  }

  softDelete(id: string) {
    return this.prisma.product.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}
