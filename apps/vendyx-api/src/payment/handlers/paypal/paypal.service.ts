import { Injectable } from '@nestjs/common';

import { AuthorizePaymentResult, CreatePaymentResult, PaymentHandler } from '../payment-handler';

@Injectable()
export class PaypalService implements PaymentHandler {
  async createPayment(
    order: any,
    totalAmount: number,
    metadata?: Record<string, any>
  ): Promise<CreatePaymentResult> {
    return { amount: totalAmount, status: 'authorized', transactionId: '123' };
  }

  async authorizePayment(order: any): Promise<AuthorizePaymentResult> {
    return { success: true };
  }
}
