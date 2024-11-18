import { Inject, UseGuards } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { State, UserJwtAuthGuard } from '@/api/shared';
import { PRISMA_FOR_ADMIN, PrismaForAdmin } from '@/persistence/prisma-clients';

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
