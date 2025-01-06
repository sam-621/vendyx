import { Inject, UseGuards } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { UserJwtAuthGuard } from '@/api/shared/guards/user.guard';
import { State } from '@/api/shared/types/gql.types';
import {
  PRISMA_FOR_ADMIN,
  PrismaForAdmin
} from '@/persistence/prisma-clients/prisma-for-admin.provider';

@UseGuards(UserJwtAuthGuard)
@Resolver('State')
export class StateResolver {
  constructor(@Inject(PRISMA_FOR_ADMIN) private readonly prismaForAdmin: PrismaForAdmin) {}

  @ResolveField('country')
  async states(@Parent() state: State) {
    const result = await this.prismaForAdmin.state.findUnique({
      where: { id: state.id },
      select: { country: true }
    });

    return result?.country;
  }
}
