import { Module } from '@nestjs/common';

import { PaypalService } from './paypal.service';

@Module({
  providers: [PaypalService],
  exports: [PaypalService]
})
export class PaypalModule {}
