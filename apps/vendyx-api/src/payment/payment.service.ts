import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';

import { ConfigurableProperty } from '@/persistence/types/configurable-operation.type';

import { PaymentHandler } from './handlers/payment-handler';
import { PaypalHandler } from './handlers/paypal/paypal.handler';

@Injectable()
export class PaymentService {
  constructor(private readonly paypalHandler: PaypalHandler) {}

  async create(order: Order, handler: ConfigurableProperty) {
    const paymentHandler = this.getHandler(handler.code);
    return paymentHandler.createPayment(order, order.total, handler.args);
  }

  async authorize(order: Order, handler: ConfigurableProperty) {
    const paymentHandler = this.getHandler(handler.code);
    return paymentHandler.authorizePayment(order, handler.args);
  }

  safeGetHandler(code: string) {
    return this._getHandler(code);
  }

  getHandler(code: string): PaymentHandler {
    const handler = this._getHandler(code);

    if (!handler) {
      throw new Error(`Handler with code ${code} not found`);
    }

    return handler;
  }

  getHandlers() {
    return [this.paypalHandler];
  }

  private _getHandler(code: string): PaymentHandler | undefined {
    return this.getHandlers().find(handler => handler.code === code);
  }
}
