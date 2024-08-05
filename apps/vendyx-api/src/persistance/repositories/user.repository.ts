import { Inject, Injectable } from '@nestjs/common';

import { CreateUserInput, UpdateUserInput } from '@/api/shared';
import { clean } from '@/business/shared';

import { PRISMA_FOR_ADMIN, PrismaForAdmin } from '../prisma-clients';
import { PRISMA_FOR_SHOP, PrismaForShop } from '../prisma-clients/prisma-for-shop.provider';

@Injectable()
export class UserRepository {
  constructor(
    @Inject(PRISMA_FOR_ADMIN) private readonly prismaForAdmin: PrismaForAdmin,
    @Inject(PRISMA_FOR_SHOP) private readonly prismaForShop: PrismaForShop
  ) {}

  async findByEmail(email: string) {
    return this.prismaForShop.user.findUnique({ where: { email } });
  }

  async findByEmailForAdmin(email: string) {
    return this.prismaForAdmin.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return this.prismaForShop.user.findUnique({ where: { id } });
  }

  async findByIdForAdmin(id: string) {
    return this.prismaForAdmin.user.findUnique({ where: { id } });
  }

  async insert(input: CreateUserInput) {
    return this.prismaForAdmin.user.create({ data: clean(input) });
  }

  async update(id: string, input: UpdateUserInput) {
    return this.prismaForShop.user.update({ where: { id }, data: clean(input) });
  }
}
