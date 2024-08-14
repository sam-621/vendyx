import { Injectable } from '@nestjs/common';

import { FlatPriceService } from './handlers';

@Injectable()
export class ShipmentService {
  constructor(private readonly flatPriceService: FlatPriceService) {}

  async calculatePrice(order: any, handlerCode: string) {
    const handler = this.getHandler(handlerCode);

    return handler.calculatePrice(order, {});
  }

  getPricePreview(handlerCode: string): number {
    const handler = this.getHandler(handlerCode);
    return handler.getPricePreview({});
  }

  private getHandler(handlerCode: string) {
    switch (handlerCode) {
      case 'flat-price':
        return this.flatPriceService;
      default:
        throw new Error(`Handler ${handlerCode} not found`);
    }
  }
}
