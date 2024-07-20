import { PaypalService } from './paypal.service';

import { AuthorizePaymentResult, CreatePaymentResult, PaymentHandler } from '@/app/config';
import { OrderEntity } from '@/app/persistance';

export class PaypalPaymentHandler implements PaymentHandler {
  name = 'Paypal';
  code = 'paypal';

  private paypalService: PaypalService;

  constructor(config: PaypalConfig) {
    this.paypalService = new PaypalService(config);
  }

  async createPayment(
    order: OrderEntity,
    totalAmount: number,
    metadata?: Record<string, any>
  ): Promise<CreatePaymentResult> {
    if (!metadata?.paypalOrderId) {
      return {
        status: 'declined',
        error: 'Paypal order id is required'
      };
    }

    const payment = await this.paypalService.capturePayment(metadata.paypalOrderId);
    const transaction = payment.purchase_units[0].payments.captures[0];

    return {
      status: 'authorized',
      amount: totalAmount,
      transactionId: transaction.id
    };
  }

  // No need to implement this method for Paypal
  async authorizePayment(): Promise<AuthorizePaymentResult> {
    return { success: true };
  }
}

type PaypalConfig = {
  clientId: string;
  secret: string;
  /**
   * Run in sandbox mode
   */
  devMode: boolean;
};
