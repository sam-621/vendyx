import { Inject } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Option } from '@prisma/client';

import { PRISMA_FOR_SHOP, PrismaForShop } from '@/persistance/prisma-clients';

@Resolver('Option')
export class OptionFieldResolver {
  constructor(@Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop) {}

  @ResolveField('values')
  values(@Parent() option: Option) {
    return this.prisma.optionValue.findMany({
      where: { optionId: option.id },
      orderBy: { order: 'asc' }
    });
  }
}
