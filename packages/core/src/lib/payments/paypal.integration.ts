import { AuthorizePaymentResult, CreatePaymentResult, PaymentHandler } from '@/app/config';
import { OrderEntity } from '@/app/persistance';

export class PaypalIntegration implements PaymentHandler {
  name = 'Paypal';
  code = 'paypal';

  async createPayment(order: OrderEntity): Promise<CreatePaymentResult> {
    return {
      status: 'authorized',
      amount: order.total,
      transactionId: generateTransactionId(16)
    };
  }

  async authorizePayment(): Promise<AuthorizePaymentResult> {
    return {
      success: true
    };
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
