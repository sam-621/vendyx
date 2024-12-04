import { Module } from '@nestjs/common';

import { StorageModule } from '@/storage';

import { PaypalModule, StripeModule } from './handlers';
import { PaymentService } from './payment.service';

@Module({
  imports: [PaypalModule, StripeModule, StorageModule],
  providers: [PaymentService],
  exports: [PaymentService]
})
export class PaymentModule {}
