import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AdminJwtAuthGuard, CreateOptionInput } from '@/app/api/common';
import { OptionService, isErrorResult } from '@/app/service';

@UseGuards(AdminJwtAuthGuard)
@Resolver('Option')
export class OptionResolver {
  constructor(private readonly service: OptionService) {}

  @Mutation('createOption')
  async createOption(@Args('input') input: CreateOptionInput) {
    const result = await this.service.create(input.name, input.values);

    return isErrorResult(result) ? { apiErrors: [result] } : { option: result, apiErrors: [] };
  }
}
