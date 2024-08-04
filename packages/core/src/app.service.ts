import { Inject, Injectable } from '@nestjs/common';

import { PRISMA_FOR_SHOP, PrismaForShop } from './persistance/prisma-tenancy.provider';

@Injectable()
export class AppService {
  constructor(@Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop) {}

  async getHello() {
    const result = await this.prisma.user.findMany({
      include: { shops: true }
    });
    return result;
  }
}
