import {
  AuthorizePaymentResult,
  CreatePaymentResult,
  PaymentIntegration,
} from '@/app/config';
import { OrderEntity } from '@/app/persistance';

export class StripeIntegration implements PaymentIntegration {
  name = 'Stripe';
  code = 'stripe';

  async createPayment(order: OrderEntity): Promise<CreatePaymentResult> {
    return {
      status: 'authorized',
      amount: order.total,
      transactionId: 'stripe-transaction-id',
    };
  }

  async authorizePayment(): Promise<AuthorizePaymentResult> {
    return {
      success: true,
    };
  }
}
