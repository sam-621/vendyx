import { Module } from '@nestjs/common';

import { PaypalModule, StripeModule } from './handlers';
import { PaymentService } from './payment.service';

@Module({
  imports: [PaypalModule, StripeModule],
  providers: [PaymentService],
  exports: [PaymentService]
})
export class PaymentModule {}
