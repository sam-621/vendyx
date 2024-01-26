import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AdminJwtAuthGuard, CreateOptionInput } from '@/app/api/common';
import { OptionService } from '@/app/service';

@UseGuards(AdminJwtAuthGuard)
@Resolver('Option')
export class OptionResolver {
  constructor(private readonly service: OptionService) {}

  @Mutation('createOption')
  async createOption(@Args('input') input: CreateOptionInput) {
    const option = await this.service.create(input.name, input.values);
    console.log({ option });

    return option;
  }
}
