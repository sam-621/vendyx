import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';

import { ApiModule } from './api';
import { AuthModule } from './auth';
import { PersistanceModule } from './persistance';

@Module({
  imports: [
    PersistanceModule,
    AuthModule,
    ApiModule,
    ClsModule.forRoot({ global: true, middleware: { mount: true } })
  ]
})
export class AppModule {}
