import { Inject, Injectable } from '@nestjs/common';
import { clean } from '@vendyx/common';

import { PRISMA_FOR_ADMIN, PrismaForAdmin } from '../prisma-clients';
import { PRISMA_FOR_SHOP, PrismaForShop } from '../prisma-clients/prisma-for-shop.provider';

import { CreateUserInput, UpdateUserInput } from '@/api/shared';

@Injectable()
export class UserRepository {
  constructor(
    @Inject(PRISMA_FOR_ADMIN) private readonly prismaForAdmin: PrismaForAdmin,
    @Inject(PRISMA_FOR_SHOP) private readonly prismaForShop: PrismaForShop
  ) {}

  async findByEmail(email: string, forAdmin = false) {
    if (forAdmin) {
      return this.prismaForAdmin.user.findUnique({ where: { email } });
    }

    return this.prismaForShop.user.findUnique({ where: { email } });
  }

  async findById(id: string, forAdmin = false) {
    if (forAdmin) {
      return this.prismaForAdmin.user.findUnique({ where: { id } });
    }

    return this.prismaForShop.user.findUnique({ where: { id } });
  }

  async insert(input: CreateUserInput) {
    return this.prismaForAdmin.user.create({ data: clean(input) });
  }

  async update(id: string, input: UpdateUserInput) {
    return this.prismaForShop.user.update({ where: { id }, data: clean(input) });
  }
}
