import { Injectable } from '@nestjs/common';

import { ShipmentHandler } from '../shipment-handler';

@Injectable()
export class FlatPriceService implements ShipmentHandler {
  calculatePrice(order: any, args: Record<string, string>): Promise<number> {
    return Promise.resolve(Number(args.price));
  }
  getPricePreview(args: Record<string, string>): number {
    return Number(args.price);
  }
}
