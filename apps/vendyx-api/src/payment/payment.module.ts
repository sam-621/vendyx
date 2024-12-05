import { Module } from '@nestjs/common';

import { StorageModule } from '@/storage';

import { PaypalModule } from './handlers';
import { PaymentService } from './payment.service';

@Module({
  imports: [StorageModule, PaypalModule],
  providers: [PaymentService],
  exports: [PaymentService]
})
export class PaymentModule {}
