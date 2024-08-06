import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { ListInput } from '@/api/shared';
import { clean } from '@/business/shared';

import { PRISMA_FOR_SHOP, PrismaForShop } from '../prisma-clients';

@Injectable()
export class ProductRepository {
  constructor(@Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop) {}

  findMany(input?: ListInput & FindOptions) {
    return this.prisma.product.findMany({
      ...clean({ skip: input?.skip, take: input?.take }),
      where: {
        archived: input?.archived ?? undefined,
        enabled: input?.enabled ?? undefined
      }
    });
  }

  findBySlug(slug: string, options?: FindOptions) {
    return this.prisma.product.findUnique({ where: { slug, ...options } });
  }

  findById(id: string, options?: FindOptions) {
    return this.prisma.product.findUnique({ where: { id, ...options } });
  }

  count() {
    return this.prisma.product.count();
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

type FindOptions = { archived?: boolean; enabled?: boolean };
