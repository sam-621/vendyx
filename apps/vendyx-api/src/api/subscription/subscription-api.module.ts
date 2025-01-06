import { Module } from '@nestjs/common';

import { BusinessModule } from '@/business/business.module';

import { SubscriptionController } from './subscription.controller';

@Module({
  imports: [BusinessModule],
  controllers: [SubscriptionController]
})
export class SubscriptionApiModule {}
