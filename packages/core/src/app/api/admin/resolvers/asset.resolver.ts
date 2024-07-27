import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AdminJwtAuthGuard } from '../../common';

import { ID } from '@/app/persistance';
import { AssetService, isErrorResult } from '@/app/business';

@UseGuards(AdminJwtAuthGuard)
@Resolver('Asset')
export class AssetResolver {
  constructor(private readonly assetService: AssetService) {}

  @Mutation('removeAssets')
  async removeAssets(@Args('ids') ids: ID[]) {
    const result = await this.assetService.remove(ids);

    return isErrorResult(result) ? { apiErrors: [result] } : { success: result, apiErrors: [] };
  }
}
