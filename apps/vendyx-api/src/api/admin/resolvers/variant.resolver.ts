import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserJwtAuthGuard } from '@/api/shared/guards/user.guard';
import { CreateVariantInput, UpdateVariantInput } from '@/api/shared/types/gql.types';
import { VariantService } from '@/business/variant/variant.service';
import {
  PRISMA_FOR_SHOP,
  PrismaForShop
} from '@/persistence/prisma-clients/prisma-for-shop.provider';

@UseGuards(UserJwtAuthGuard)
@Resolver('Variant')
export class VariantResolver {
  constructor(
    private readonly variantService: VariantService,
    @Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop
  ) {}

  @Query('variant')
  async variant(@Args('id') id: string) {
    return await this.variantService.findById(id);
  }

  @Mutation('createVariant')
  async createVariant(@Args('productId') id: string, @Args('input') input: CreateVariantInput) {
    return await this.variantService.create(id, input);
  }

  @Mutation('updateVariant')
  async updateVariant(@Args('id') id: string, @Args('input') input: UpdateVariantInput) {
    return await this.variantService.update(id, input);
  }

  @Mutation('softRemoveVariant')
  async softRemoveVariant(@Args('id') id: string) {
    return await this.variantService.softRemove(id);
  }
}
