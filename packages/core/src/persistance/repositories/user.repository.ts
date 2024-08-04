import { Inject, Injectable } from '@nestjs/common';

import { PRISMA_FOR_SHOP, PrismaForShop } from '../prisma-clients/prisma-for-shop.provider';

@Injectable()
export class UserRepository {
  constructor(@Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop) {}

  async findUnique({ email, id }: FindUniqueInput) {
    if (email) return this.prisma.user.findUnique({ where: { email } });

    if (id) return this.prisma.user.findUnique({ where: { id } });

    throw new Error('UserRepository.findUnique: email or id must be provided');
  }
}

export type UserId = string;

type FindUniqueInput = {
  email?: string;
  id?: UserId;
};
