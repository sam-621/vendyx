import { Injectable } from '@nestjs/common';

import { PaypalService, StripeService } from './handlers';
import { PaymentHandler } from './handlers/payment-handler';

@Injectable()
export class PaymentService {
  constructor(
    private readonly paypalService: PaypalService,
    private readonly stripeService: StripeService
  ) {}

  async create(order: any, handlerCode: string) {
    const handler = this.getHandler(handlerCode);
    return handler.createPayment(order, order.totalAmount);
  }

  async authorize(order: any, handlerCode: string) {
    const handler = this.getHandler(handlerCode);
    return handler.authorizePayment(order);
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
