import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateUserInput, GenerateUserAccessTokenInput, UpdateUserInput } from '@/api/shared';
import { isErrorResult } from '@/business/shared';
import { UserService } from '@/business/user';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('user')
  async user(@Args('accessToken') accessToken: string) {
    return this.userService.findByAccessToken(accessToken);
  }

  @Mutation('createUser')
  async createUser(@Args('input') input: CreateUserInput) {
    const result = await this.userService.create(input);

    return isErrorResult(result) ? { apiErrors: [result] } : { user: result, apiErrors: [] };
  }

  @Mutation('updateUser')
  async updateUser(@Args('id') id: string, @Args('input') input: UpdateUserInput) {
    const result = await this.userService.update(id, input);

    return isErrorResult(result) ? { apiErrors: [result] } : { user: result, apiErrors: [] };
  }

  @Mutation('generateUserAccessToken')
  async generateUserAccessToken(@Args('input') input: GenerateUserAccessTokenInput) {
    const result = await this.userService.generateAccessToken(input.email, input.password);

    return isErrorResult(result) ? { apiErrors: [result] } : { accessToken: result, apiErrors: [] };
  }
}
