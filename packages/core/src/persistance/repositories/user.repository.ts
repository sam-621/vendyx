import { Inject, Injectable } from '@nestjs/common';

import { PRISMA_FOR_SHOP, PrismaForShop } from '../prisma-clients/prisma-for-shop.provider';

@Injectable()
export class UserRepository {
  constructor(@Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
