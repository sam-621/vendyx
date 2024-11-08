import { UseGuards } from '@nestjs/common';
import { Args, Mutation } from '@nestjs/graphql';

import { CreateCheckoutSessionInput, UserJwtAuthGuard } from '@/api/shared';
import { SubscriptionService } from '@/business/subscription';

@UseGuards(UserJwtAuthGuard)
export class SubscriptionResolver {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Mutation('createCheckoutSession')
  createCheckoutSession(@Args('input') input: CreateCheckoutSessionInput) {
    return this.subscriptionService.createCheckoutSession(input);
  }
}
