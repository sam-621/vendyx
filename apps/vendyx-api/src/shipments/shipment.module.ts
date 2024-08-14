import { Module } from '@nestjs/common';

import { FlatPriceModule } from './handlers';
import { ShipmentService } from './shipment.service';

@Module({
  imports: [FlatPriceModule],
  providers: [ShipmentService],
  exports: [ShipmentService]
})
export class ShipmentModule {}
