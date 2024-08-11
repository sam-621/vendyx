import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { ListInput, ProductFilters, ProductListInput } from '@/api/shared';
import { clean } from '@/business/shared';

import { PRISMA_FOR_SHOP, PrismaForShop } from '../prisma-clients';

@Injectable()
export class ProductRepository {
  constructor(@Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop) {}

  findMany(input?: ProductListInput) {
    return this.prisma.product.findMany({
      ...clean({ skip: input?.skip, take: input?.take }),
      where: {
        name: clean(input?.filters?.name ?? {}),
        archived: clean(input?.filters?.achived ?? {}),
        enabled: clean(input?.filters?.enabled ?? {})
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  findBySlug(slug: string, options?: FindOptions) {
    return this.prisma.product.findUnique({ where: { slug, ...options } });
  }

  findById(id: string, filters?: ProductFilters) {
    return this.prisma.product.findUnique({
      where: {
        id,
        name: clean(filters?.name ?? {}),
        archived: clean(filters?.achived ?? {}),
        enabled: clean(filters?.enabled ?? {})
      }
    });
  }

  count(input?: ProductListInput) {
    return this.prisma.product.count({
      ...clean({ skip: input?.skip, take: input?.take }),
      where: {
        name: clean(input?.filters?.name ?? {}),
        archived: clean(input?.filters?.achived ?? {}),
        enabled: clean(input?.filters?.enabled ?? {})
      }
    });
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

type FindOptions = ListInput & { filters?: ProductFilters };
