import { Inject, UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { Country, UserJwtAuthGuard } from '@/api/shared';
import { CountryService } from '@/business/country';
import { PRISMA_FOR_ADMIN, PrismaForAdmin } from '@/persistance/prisma-clients';

@UseGuards(UserJwtAuthGuard)
@Resolver('Country')
export class CountryResolver {
  constructor(
    private readonly countryService: CountryService,
    @Inject(PRISMA_FOR_ADMIN) private readonly prisma: PrismaForAdmin
  ) {}

  @Query('countries')
  async countries() {
    return this.countryService.find();
  }

  @ResolveField('states')
  async states(@Parent() country: Country) {
    return this.prisma.state.findMany({
      where: { countryId: country.id }
    });
  }
}
