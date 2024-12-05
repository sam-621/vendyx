import { Injectable } from '@nestjs/common';

import { ConfigurableProperty } from '@/persistence/types';

import { FlatPriceService, ShipmentHandler, ShipmentHandlerOrder } from './handlers';

@Injectable()
export class ShipmentService {
  constructor(private readonly flatPriceService: FlatPriceService) {}

  async calculatePrice(order: ShipmentHandlerOrder, handler: ConfigurableProperty) {
    const shipmentHandler = this.getHandler(handler.code);

    return shipmentHandler.calculatePrice(order, handler.args);
  }

  getPricePreview(handler: ConfigurableProperty): number {
    const shipmentHandler = this.getHandler(handler.code);
    return shipmentHandler.getPricePreview(handler.args);
  }

  safeGetHandler(handlerCode: string) {
    return this._getHandler(handlerCode);
  }

  getHandler(handlerCode: string) {
    const handler = this._getHandler(handlerCode);

    if (!handler) {
      throw new Error(`Handler ${handlerCode} not found`);
    }

    return handler;
  }

  getHandlers(): ShipmentHandler[] {
    return [this.flatPriceService];
  }

  private _getHandler(code: string): ShipmentHandler | undefined {
    return this.getHandlers().find(handler => handler.code === code);
  }
}
