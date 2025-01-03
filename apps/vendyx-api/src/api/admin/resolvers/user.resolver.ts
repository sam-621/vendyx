import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';

import {
  CreateUserInput,
  CurrentUser,
  GenerateUserAccessTokenInput,
  ListInput,
  ListResponse,
  TCurrentUser,
  UpdateUserInput,
  UserJwtAuthGuard,
  ValidateOtpInput
} from '@/api/shared';
import { clean, isErrorResult } from '@/business/shared';
import { UserService } from '@/business/user';
import { PRISMA_FOR_SHOP, PrismaForShop } from '@/persistence/prisma-clients';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    @Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop
  ) {}

  @UseGuards(UserJwtAuthGuard)
  @Query('whoami')
  async user(@CurrentUser() user: TCurrentUser) {
    return this.userService.findById(user.id);
  }

  @UseGuards(UserJwtAuthGuard)
  @Query('validateAccessToken')
  async validateAccessToken() {
    return true;
  }

  @Mutation('createUser')
  async createUser(@Args('input') input: CreateUserInput) {
    const result = await this.userService.create(input);

    return isErrorResult(result) ? { apiErrors: [result] } : { user: result, apiErrors: [] };
  }

  @UseGuards(UserJwtAuthGuard)
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

  @UseGuards(UserJwtAuthGuard)
  @ResolveField('shops')
  async owner(@Parent() user: User, @Args('input') input?: ListInput) {
    const query = {
      where: { ownerId: user.id }
    };

    const [result, total] = await Promise.all([
      this.prisma.shop.findMany({ ...query, ...clean(input ?? {}) }),
      this.prisma.shop.count(query)
    ]);

    return new ListResponse(result, result?.length, { total });
  }

  @UseGuards(UserJwtAuthGuard)
  @Mutation('validateOtp')
  async validateOtp(@CurrentUser() user: TCurrentUser, @Args('input') input: ValidateOtpInput) {
    const result = await this.userService.validateOtp(user.id, input);

    return isErrorResult(result) ? { apiErrors: [result] } : { apiErrors: [], user: result };
  }
}
