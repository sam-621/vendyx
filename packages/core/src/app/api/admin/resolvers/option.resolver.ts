import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import {
  AdminJwtAuthGuard,
  CreateOptionInput,
  UpdateOptionInput,
  UpdateOptionValueInput
} from '@/app/api/common';
import { ID } from '@/app/persistance';
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

  @Mutation('updateOption')
  async updateOption(@Args('id') id: ID, @Args('input') input: UpdateOptionInput) {
    const result = await this.service.update(id, input);

    return isErrorResult(result) ? { apiErrors: [result] } : { option: result, apiErrors: [] };
  }

  @Mutation('removeOption')
  async removeOption(@Args('id') id: ID) {
    const result = await this.service.remove(id);

    return { success: result };
  }

  @Mutation('addOptionValues')
  async addOptionValues(@Args('optionId') optionId: ID, @Args('values') values: ID[]) {
    const result = await this.service.addOptionValues(optionId, values);

    return isErrorResult(result) ? { apiErrors: [result] } : { option: result, apiErrors: [] };
  }

  @Mutation('removeOptionValues')
  async removeOptionValues(@Args('ids') ids: ID[]) {
    const result = await this.service.removeOptionValues(ids);

    return isErrorResult(result) ? { apiErrors: [result] } : { option: result, apiErrors: [] };
  }

  @Mutation('updateOptionValues')
  async updateOptionValues(@Args('input') input: UpdateOptionValueInput[]) {
    const result = await this.service.updateOptionValues(input);

    return isErrorResult(result) ? { apiErrors: [result] } : { success: result, apiErrors: [] };
  }
}
