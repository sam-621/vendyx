import { Module } from '@nestjs/common';

import { AdminApiModule } from './admin/admin-api.module';
import { ShopApiModule } from './shop/shop-api.module';
import { SubscriptionApiModule } from './subscription';
import { UploadModule } from './upload';

@Module({
  imports: [
    UploadModule,
    SubscriptionApiModule,
    AdminApiModule.register(),
    ShopApiModule.register()
  ]
})
export class ApiModule {}
