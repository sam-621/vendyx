import { UseGuards } from '@nestjs/common';
import { Args, Mutation } from '@nestjs/graphql';

import { UserJwtAuthGuard } from '@/api/shared/guards/user.guard';
import { CreateCheckoutSessionInput } from '@/api/shared/types/gql.types';
import { SubscriptionService } from '@/business/subscription/subscription.service';

@UseGuards(UserJwtAuthGuard)
export class SubscriptionResolver {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Mutation('createCheckoutSession')
  createCheckoutSession(@Args('input') input: CreateCheckoutSessionInput) {
    return this.subscriptionService.createCheckoutSession(input);
  }
}
