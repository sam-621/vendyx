import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreateOptionInput, UpdateOptionInput, UserJwtAuthGuard } from '@/api/shared';
import { OptionService } from '@/business/option';
import { PRISMA_FOR_SHOP, PrismaForShop } from '@/persistance/prisma-clients';

@UseGuards(UserJwtAuthGuard)
@Resolver('Option')
export class OptionResolver {
  constructor(
    private readonly service: OptionService,
    @Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop
  ) {}

  @Mutation('createOption')
  async createOption(
    @Args('productId') productId: string,
    @Args('input') input: CreateOptionInput
  ) {
    return this.service.create(productId, input);
  }

  @Mutation('updateOption')
  async updateOption(@Args('id') id: string, @Args('input') input: UpdateOptionInput) {
    return this.service.update(id, input);
  }

  @Mutation('softRemoveOption')
  async softRemoveOption(@Args('id') id: string) {
    return this.service.softRemove(id);
  }

  @Mutation('softRemoveOptionValues')
  async softRemoveOptionValues(@Args('ids') ids: string[]) {
    return this.service.softRemoveValues(ids);
  }
}
