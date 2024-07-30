import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AdminJwtAuthGuard, AuthenticateInput, AuthenticateResult } from '../../common';

import { AdminService } from '@/business';
import { isErrorResult } from '@/business/common';

@Resolver()
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}

  @Mutation('authenticate')
  async authenticate(@Args('input') input: AuthenticateInput): Promise<AuthenticateResult> {
    const result = await this.adminService.authenticate(input.username, input.password);

    return isErrorResult(result) ? { apiErrors: [result] } : { authToken: result, apiErrors: [] };
  }

  @UseGuards(AdminJwtAuthGuard)
  @Query('validateToken')
  async validateAdmin() {
    return true;
  }
}
