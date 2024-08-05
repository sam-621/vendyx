import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';

import { AdminApiModule } from './api/admin/admin-api.module';
import { PersistanceModule } from './persistance/persistance.module';

@Module({
  imports: [
    PersistanceModule,
    AdminApiModule.register(),
    ClsModule.forRoot({ global: true, middleware: { mount: true } })
  ]
})
export class AppModule {}
