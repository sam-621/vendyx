import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { ListInput } from '@/api/shared';
import { clean } from '@/business/shared';

import {
  PRISMA_FOR_ADMIN,
  PRISMA_FOR_SHOP,
  PrismaForAdmin,
  PrismaForShop
} from '../prisma-clients';

@Injectable()
export class ShopRepository {
  constructor(
    @Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop,
    @Inject(PRISMA_FOR_ADMIN) private readonly prismaForAdmin: PrismaForAdmin
  ) {}

  async findMany(input?: ListInput) {
    return this.prisma.shop.findMany({ ...clean(input ?? {}), orderBy: { createdAt: 'desc' } });
  }

  async findById(id: string) {
    return this.prisma.shop.findUnique({ where: { id } });
  }

  async count(input?: ListInput) {
    return this.prisma.shop.count({ ...clean(input ?? {}) });
  }

  async findBySlug(slug: string) {
    return this.prisma.shop.findUnique({ where: { slug } });
  }

  async getTotalByName(name: string) {
    return this.prismaForAdmin.shop.count({ where: { name } });
  }

  async insert(input: Prisma.ShopCreateInput) {
    return this.prisma.shop.create({ data: input });
  }

  async update(slug: string, input: Prisma.ShopUpdateInput) {
    return this.prisma.shop.update({ where: { slug }, data: input });
  }
}
