import { Inject, Injectable } from '@nestjs/common';

import { PRISMA_FOR_SHOP, PrismaForShop } from '../prisma-clients';

@Injectable()
export class CountryRepository {
  constructor(@Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop) {}

  find() {
    return this.prisma.country.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }
}
