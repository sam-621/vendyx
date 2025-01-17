import { Module } from '@nestjs/common';

import { AdminApiModule } from './admin/admin-api.module';
import { ShopApiModule } from './shop/shop-api.module';
import { UploadApiModule } from './upload/upload-api.module';
import { WebhookApiModule } from './webhook/webhook-api.module';

@Module({
  imports: [UploadApiModule, WebhookApiModule, AdminApiModule.register(), ShopApiModule.register()]
})
export class ApiModule {}
