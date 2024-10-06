import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { ListInput } from '@/api/shared';
import { clean } from '@/business/shared';

import { PRISMA_FOR_SHOP, PrismaForShop } from '../prisma-clients';

@Injectable()
export class OrderRepository {
  constructor(@Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop) {}

  findMany(input?: FindOptions) {
    return this.prisma.order.findMany({
      ...clean({ skip: input?.skip, take: input?.take }),
      orderBy: { createdAt: 'desc' },
      where: { state: input?.notInModifyinState ? { not: 'MODIFYING' } : undefined }
    });
  }

  findById(id: string) {
    return this.prisma.order.findUnique({ where: { id } });
  }

  findByIdOrThrow(id: string, options?: FindUniqueOptions) {
    return this.prisma.order.findUniqueOrThrow({ where: { id }, ...options });
  }

  findByCode(code: number) {
    return this.prisma.order.findUnique({ where: { code } });
  }

  insert(input: Prisma.OrderCreateInput) {
    return this.prisma.order.create({ data: input });
  }

  update(id: string, input: Prisma.OrderUpdateInput) {
    return this.prisma.order.update({ where: { id }, data: input });
  }

  softDelete(id: string) {
    return this.prisma.order.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}

type FindOptions = ListInput & { notInModifyinState?: boolean };
type FindUniqueOptions = { include: Prisma.OrderInclude };
