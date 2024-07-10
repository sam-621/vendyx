import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { UpdateStateInput } from '../../common';

import { ID } from '@/app/persistance';
import { StateService, isErrorResult } from '@/app/service';

@Resolver('State')
export class StateResolver {
  constructor(private stateService: StateService) {}

  @Mutation()
  async updateState(@Args('id') id: ID, @Args('input') input: UpdateStateInput) {
    const result = await this.stateService.update(id, input);

    return isErrorResult(result) ? { apiErrors: [result] } : { apiErrors: [], state: result };
  }
}
