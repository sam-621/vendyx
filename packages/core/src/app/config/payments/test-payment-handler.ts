import {
  AuthorizePaymentResult,
  CreatePaymentResult,
  PaymentHandler
} from './payment-handler.config';

import { OrderEntity } from '@/app/persistance';

export class TestPaymentHandler implements PaymentHandler {
  name = 'Test payment handler';
  code = 'test-payment-handler';

  async createPayment(order: OrderEntity, totalAmount: number): Promise<CreatePaymentResult> {
    return {
      amount: totalAmount,
      status: 'authorized',
      transactionId: `test-id-${generateTransactionId(8)}`
    };
  }

  async authorizePayment(): Promise<AuthorizePaymentResult> {
    return { success: true };
  }
}

/**
 * simulate transactionID.
 */
function generateTransactionId(length: number) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let transactionId = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    transactionId += charset[randomIndex];
  }

  return transactionId;
}
