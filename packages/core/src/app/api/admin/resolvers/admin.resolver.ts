import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AdminJwtAuthGuard, AuthenticateInput } from '../../common';

import { AdminService } from '@/app/service';

@Resolver()
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}

  @Mutation('authenticate')
  async authenticate(@Args('input') input: AuthenticateInput) {
    return this.adminService.authenticate(input.username, input.password);
  }

  @UseGuards(AdminJwtAuthGuard)
  @Query('validateToken')
  async validateAdmin() {
    return true;
  }
}
