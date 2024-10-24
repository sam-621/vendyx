import { Module } from '@nestjs/common';

import { FlatPriceService } from './flat-price.service';

@Module({
  providers: [FlatPriceService],
  exports: [FlatPriceService]
})
export class FlatPriceModule {}
