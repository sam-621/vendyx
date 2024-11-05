import { Module } from '@nestjs/common';

import { SubscriptionController } from './subscription.controller';

@Module({
  controllers: [SubscriptionController]
})
export class SubscriptionApiModule {}
