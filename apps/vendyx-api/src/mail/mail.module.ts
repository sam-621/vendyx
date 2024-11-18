import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SendGridClient } from './clients/sendgrid-client';
import { MailEventListener } from './mail-event-listener';
import { MailService } from './mail.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [MailService, SendGridClient, MailEventListener],
  exports: [MailService]
})
export class MailModule {}
