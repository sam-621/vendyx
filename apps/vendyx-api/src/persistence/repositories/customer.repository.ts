import { Inject, Injectable } from '@nestjs/common';

import { PRISMA_FOR_SHOP, PrismaForShop } from '../prisma-clients';
import { ID } from '../types';

@Injectable()
export class CustomerRepository {
  constructor(@Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop) {}

  findById(id: ID) {
    return this.prisma.customer.findUnique({ where: { id } });
  }

  findByEmail(email: string) {
    return this.prisma.customer.findUniqueOrThrow({ where: { email } });
  }
}
