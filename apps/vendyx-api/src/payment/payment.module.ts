import { Module } from '@nestjs/common';

import { StorageModule } from '@/storage/storage.module';

import { PaypalModule } from './handlers/paypal/paypal.module';
import { PaymentService } from './payment.service';

@Module({
  imports: [StorageModule, PaypalModule],
  providers: [PaymentService],
  exports: [PaymentService]
})
export class PaymentModule {}
