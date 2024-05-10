import {
  AuthorizePaymentResult,
  CreatePaymentResult,
  PaymentIntegration,
  PaymentStatus,
} from '@/app/config';
import { OrderEntity } from '@/app/persistance';

export class PaypalIntegration implements PaymentIntegration {
  name = 'Paypal';
  code = 'paypal';

  async createPayment(order: OrderEntity): Promise<CreatePaymentResult> {
    return {
      status: PaymentStatus.AUTHORIZED,
      amount: order.total,
      transactionId: 'paypal-transaction-id',
    };
  }

  async authorizePayment(order: OrderEntity): Promise<AuthorizePaymentResult> {
    console.log({ order });

    return {
      success: true,
    };
  }
}
