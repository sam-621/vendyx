import { Module } from '@nestjs/common';

import { PaypalHandler } from './paypal.handler';

@Module({
  providers: [PaypalHandler],
  exports: [PaypalHandler]
})
export class PaypalModule {}
