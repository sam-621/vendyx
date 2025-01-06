import { Inject, UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { ShopApiKeyGuard } from '@/api/shared/guards/shop-api-key.guard';
import { CountryService } from '@/business/country/country.service';
import {
  PRISMA_FOR_ADMIN,
  PrismaForAdmin
} from '@/persistence/prisma-clients/prisma-for-admin.provider';

@UseGuards(ShopApiKeyGuard)
@Resolver('Country')
export class CountryResolver {
  constructor(
    private readonly countryService: CountryService,
    @Inject(PRISMA_FOR_ADMIN) private readonly prisma: PrismaForAdmin
  ) {}

  @Query('countries')
  async countries() {
    return this.countryService.findInStore();
  }
}
