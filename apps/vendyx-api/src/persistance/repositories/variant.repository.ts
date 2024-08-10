import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PRISMA_FOR_SHOP, PrismaForShop } from '../prisma-clients';

@Injectable()
export class VariantRepository {
  constructor(@Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop) {}

  findById(id: string) {
    return this.prisma.variant.findUnique({ where: { id } });
  }

  insert(input: Prisma.VariantCreateInput) {
    return this.prisma.variant.create({ data: input });
  }

  async update(id: string, input: Prisma.VariantUpdateInput) {
    return this.prisma.variant.update({ where: { id }, data: input });
  }

  softDelete(id: string) {
    return this.prisma.variant.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}
