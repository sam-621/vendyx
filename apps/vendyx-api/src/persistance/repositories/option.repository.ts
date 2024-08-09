import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PRISMA_FOR_SHOP, PrismaForShop } from '../prisma-clients';

@Injectable()
export class OptionRepository {
  constructor(@Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop) {}

  findById(id: string) {
    return this.prisma.option.findUnique({ where: { id } });
  }

  insert(input: Prisma.OptionCreateInput) {
    return this.prisma.option.create({ data: input });
  }

  insertValues(optionId: string, values: string[]) {
    return this.prisma.$transaction(
      values.map(v => this.prisma.optionValue.create({ data: { name: v, optionId } }))
    );
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
    return this.prisma.option.update({ where: { id }, data: { deletedAt: new Date() } });
  }

  softRemoveValues(ids: string[]) {
    return this.prisma.$transaction(
      ids.map(id =>
        this.prisma.optionValue.update({ where: { id }, data: { deletedAt: new Date() } })
      )
    );
  }
}
