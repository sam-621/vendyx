import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { BusinessModule } from '@/business';

import { SendGridClient } from './clients/sendgrid-client';
import { MailCustomerListener, MailCustomerService } from './listeners/customer';
import { MailOrderListener, MailOrderService } from './listeners/order';
import { MailUserListener, MailUserService } from './listeners/user';

@Module({
  imports: [ConfigModule.forRoot(), BusinessModule],
  providers: [
    SendGridClient,
    MailOrderService,
    MailCustomerService,
    MailUserService,
    MailOrderListener,
    MailCustomerListener,
    MailUserListener
  ]
})
export class MailModule {}
