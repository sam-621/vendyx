import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';

import { PaypalHandler, StripeService } from './handlers';
import { PaymentHandler } from './handlers/payment-handler';

@Injectable()
export class PaymentService {
  constructor(
    private readonly paypalService: PaypalHandler,
    private readonly stripeService: StripeService
  ) {}

  async create(order: Order, handlerCode: string, metadata: Record<string, string>) {
    const handler = this.getHandler(handlerCode);
    return handler.createPayment(order, order.total, metadata);
  }

  async authorize(order: any, handlerCode: string) {
    const handler = this.getHandler(handlerCode);
    return handler.authorizePayment(order, {});
  }

  private getHandler(paymentMethod: string): PaymentHandler {
    switch (paymentMethod) {
      case 'paypal':
        return this.paypalService;
      case 'stripe':
        return this.stripeService;
      default:
        throw new Error('Invalid payment method');
    }
  }
}
