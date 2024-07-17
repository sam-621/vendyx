import { AuthorizePaymentResult, CreatePaymentResult, PaymentHandler } from '@/app/config';
import { OrderEntity } from '@/app/persistance';

export class MercadoPagoIntegration implements PaymentHandler {
  name = 'Mercado Pago';
  code = 'mercado-pago';

  async createPayment(order: OrderEntity): Promise<CreatePaymentResult> {
    return {
      status: 'authorized',
      amount: order.total,
      transactionId: 'mercado-pago-transaction-id'
    };
  }

  async authorizePayment(): Promise<AuthorizePaymentResult> {
    return {
      success: true
    };
  }
}
