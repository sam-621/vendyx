import { Injectable } from '@nestjs/common';

import {
  ConfigurableProperty,
  ConfigurablePropertyArgs
} from '@/persistence/types/configurable-operation.type';

import { FlatPriceService } from './handlers/flat-price/flat-price.service';
import { ShipmentHandler, ShipmentHandlerOrder } from './handlers/shipment-handler';

@Injectable()
export class ShipmentService {
  constructor(private readonly flatPriceService: FlatPriceService) {}

  async calculatePrice(
    order: ShipmentHandlerOrder,
    handler: ConfigurableProperty<ConfigurablePropertyArgs>
  ) {
    const shipmentHandler = this.getHandler(handler.code);

    return shipmentHandler.calculatePrice(order, handler.args);
  }

  getPricePreview(handler: ConfigurableProperty<ConfigurablePropertyArgs>): number {
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
