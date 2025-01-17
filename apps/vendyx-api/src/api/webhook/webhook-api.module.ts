import { Module } from '@nestjs/common';

import { BusinessModule } from '@/business/business.module';

import { WebhookController } from './webhook.controller';

@Module({
  imports: [BusinessModule],
  controllers: [WebhookController]
})
export class WebhookApiModule {}
