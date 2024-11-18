import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SendGridClient } from './clients/sendgrid-client';
import { MailCustomerListener, MailCustomerService } from './listeners/customer';
import { MailOrderListener, MailOrderService } from './listeners/order';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    SendGridClient,
    MailOrderService,
    MailCustomerService,
    MailOrderListener,
    MailCustomerListener
  ]
})
export class MailModule {}
