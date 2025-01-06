import { Inject, Injectable } from '@nestjs/common';

import { PRISMA_FOR_ADMIN, PrismaForAdmin } from '../prisma-clients/prisma-for-admin.provider';
import { PRISMA_FOR_SHOP, PrismaForShop } from '../prisma-clients/prisma-for-shop.provider';

@Injectable()
export class CountryRepository {
  constructor(
    @Inject(PRISMA_FOR_ADMIN) private readonly prisma: PrismaForAdmin,
    @Inject(PRISMA_FOR_SHOP) private readonly prismaForShop: PrismaForShop
  ) {}

  async find() {
    return this.prisma.country.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async findInStore() {
    const result = await this.prisma.stateZone.findMany({
      select: { state: { select: { country: true } } }
    });

    const countries = result.map(state => state.state.country);

    return [...new Map(countries.map(country => [country.id, country])).values()];
  }
}
