import { Inject, Injectable } from '@nestjs/common';

import { PRISMA_FOR_ADMIN, PRISMA_FOR_SHOP, PrismaForAdmin, PrismaForShop } from './persistance';

@Injectable()
export class AppService {
  constructor(
    @Inject(PRISMA_FOR_SHOP) private readonly prismaForShop: PrismaForShop,
    @Inject(PRISMA_FOR_ADMIN) private readonly prismaForAdmin: PrismaForAdmin
  ) {}

  async getHello() {
    const result = await this.prismaForShop.user.findMany({
      include: { shops: true }
    });
    return result;
  }

  async getAdmin() {
    const result = await this.prismaForAdmin.user.findMany({
      include: { shops: true }
    });

    return result;
  }
}
