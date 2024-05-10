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
    console.log('created');

    return {
      status: 'authorized',
      amount: order.total,
      transactionId: 'stripe-transaction-id',
    };
  }

  async authorizePayment(order: OrderEntity): Promise<AuthorizePaymentResult> {
    console.log({ order });

    return {
      success: true,
    };
  }
}
