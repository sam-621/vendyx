import {
  AuthorizePaymentResult,
  CreatePaymentResult,
  PaymentHandler
} from './payment-handler.config';

import { OrderEntity } from '@/app/persistance';
import { generateReadableId } from '@/app/business';

export class TestPaymentHandler implements PaymentHandler {
  name = 'Test payment handler';
  code = 'test-payment-handler';

  async createPayment(order: OrderEntity, totalAmount: number): Promise<CreatePaymentResult> {
    return {
      amount: totalAmount,
      status: 'authorized',
      transactionId: `TEST-${generateReadableId()}`
    };
  }

  async authorizePayment(): Promise<AuthorizePaymentResult> {
    return { success: true };
  }
}
