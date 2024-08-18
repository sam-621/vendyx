import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PRISMA_FOR_SHOP, PrismaForShop } from '../prisma-clients';

@Injectable()
export class ZoneRepository {
  constructor(@Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop) {}

  find() {
    return this.prisma.zone.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  findById(id: string) {
    return this.prisma.zone.findUnique({
      where: { id }
    });
  }

  insert(input: Prisma.ZoneCreateInput) {
    return this.prisma.zone.create({ data: input });
  }

  update(id: string, input: Prisma.ZoneUpdateInput) {
    return this.prisma.zone.update({
      where: { id },
      data: input
    });
  }

  remove(id: string) {
    return this.prisma.zone.delete({
      where: { id }
    });
  }

  async removeAllStates(zoneId: string) {
    this.prisma.stateZone.deleteMany({
      where: { zoneId }
    });
  }
}
