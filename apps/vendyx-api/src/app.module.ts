import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';

import { AdminApiModule } from './api/admin/admin-api.module';
import { AuthModule } from './auth';
import { PersistanceModule } from './persistance';

@Module({
  imports: [
    PersistanceModule,
    AuthModule,
    AdminApiModule.register(),
    ClsModule.forRoot({ global: true, middleware: { mount: true } })
  ]
})
export class AppModule {}
