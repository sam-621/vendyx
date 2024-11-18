import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';

import { ApiModule } from './api';
import { AuthModule } from './auth';
import { EventBusModule } from './event-bus';
import { PersistanceModule } from './persistance';

@Module({
  imports: [
    PersistanceModule,
    AuthModule,
    ApiModule,
    EventBusModule,
    ClsModule.forRoot({ global: true, middleware: { mount: true } })
  ]
})
export class AppModule {}
