import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PRISMA_FOR_SHOP, PrismaForShop } from '../prisma-clients/prisma-for-shop.provider';

@Injectable()
export class OptionRepository {
  constructor(@Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop) {}

  findById(id: string) {
    return this.prisma.option.findUnique({ where: { id } });
  }

  findValues(optionId: string) {
    return this.prisma.optionValue.findMany({ where: { optionId } });
  }

  insert(input: Prisma.OptionCreateInput) {
    return this.prisma.option.create({ data: input });
  }

  update(id: string, input: Prisma.OptionUpdateInput) {
    return this.prisma.option.update({ where: { id }, data: input });
  }

  updateValues(values: { id: string; name: string }[]) {
    return this.prisma.$transaction(
      values.map(v =>
        this.prisma.optionValue.update({ where: { id: v.id }, data: { name: v.name } })
      )
    );
  }

  softRemove(id: string) {
    return this.prisma.option.update({
      where: { id },
      data: { order: -1, deletedAt: new Date() }
    });
  }

  softRemoveValues(ids: string[]) {
    return this.prisma.$transaction(
      ids.map(id =>
        this.prisma.optionValue.update({
          where: { id },
          data: { order: -1, deletedAt: new Date() }
        })
      )
    );
  }
}
