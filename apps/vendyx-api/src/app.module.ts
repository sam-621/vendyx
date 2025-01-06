import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';

import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import { EventBusModule } from './event-bus/event-bus.module';
import { MailModule } from './mail/mail.module';
import { PersistenceModule } from './persistence/persistence.module';

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
