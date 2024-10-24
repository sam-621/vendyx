import { Inject, Injectable } from '@nestjs/common';

import { PRISMA_FOR_ADMIN, PrismaForAdmin } from '../prisma-clients';

@Injectable()
export class CountryRepository {
  constructor(@Inject(PRISMA_FOR_ADMIN) private readonly prisma: PrismaForAdmin) {}

  async find() {
    return this.prisma.country.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }
}
