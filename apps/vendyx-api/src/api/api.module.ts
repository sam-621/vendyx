import { Module } from '@nestjs/common';

import { AdminApiModule } from './admin/admin-api.module';
import { ShopApiModule } from './shop/shop-api.module';
import { SubscriptionApiModule } from './subscription';
import { UploadApiModule } from './upload';

@Module({
  imports: [
    UploadApiModule,
    SubscriptionApiModule,
    AdminApiModule.register(),
    ShopApiModule.register()
  ]
})
export class ApiModule {}
