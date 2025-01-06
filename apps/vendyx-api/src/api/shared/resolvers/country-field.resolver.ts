import { Inject } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Country } from '@prisma/client';

import {
  PRISMA_FOR_ADMIN,
  PrismaForAdmin
} from '@/persistence/prisma-clients/prisma-for-admin.provider';

@Resolver('Country')
export class CountryFieldResolver {
  constructor(@Inject(PRISMA_FOR_ADMIN) private readonly prisma: PrismaForAdmin) {}

  @ResolveField('states')
  async states(@Parent() country: Country) {
    return this.prisma.state.findMany({
      where: { countryId: country.id }
    });
  }
}
