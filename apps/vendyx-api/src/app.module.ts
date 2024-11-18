import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';

import { ApiModule } from './api';
import { AuthModule } from './auth';
import { EventBusModule } from './event-bus';
import { MailModule } from './mail';
import { PersistenceModule } from './persistence';

@Module({
  imports: [
    PersistenceModule,
    AuthModule,
    ApiModule,
    EventBusModule,
    MailModule,
    ClsModule.forRoot({ global: true, middleware: { mount: true } })
  ]
})
export class AppModule {}
