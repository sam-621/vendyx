import { Injectable } from '@nestjs/common';

import { Args } from '@/persistence/types/args.type';
import { ConfigurableOperationUi } from '@/persistence/types/configurable-operation.type';

import { ShipmentHandler } from '../shipment-handler';

@Injectable()
export class FlatPriceService implements ShipmentHandler {
  name = 'Flat price';
  code = 'flat-price';

  ui: ConfigurableOperationUi;

  args: Args<ArgsKeys> = {
    price: {
      type: 'price',
      required: true,
      placeholder: '$0.00',
      label: 'Price',
      conditions: { min: 0 },
      defaultValue: 0
    }
  };

  calculatePrice(order: any, args: Record<ArgsKeys, string | number | boolean>): Promise<number> {
    return Promise.resolve(Number(args.price));
  }
  getPricePreview(args: Record<ArgsKeys, string | number | boolean>): number {
    return Number(args.price);
  }
}

type ArgsKeys = 'price';
