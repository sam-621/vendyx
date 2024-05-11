import {
  AuthorizePaymentResult,
  CreatePaymentResult,
  PaymentIntegration,
} from '@/app/config';
import { OrderEntity } from '@/app/persistance';

export class MercadoPagoIntegration implements PaymentIntegration {
  name = 'Mercado Pago';
  code = 'mercado-pago';

  async createPayment(order: OrderEntity): Promise<CreatePaymentResult> {
    return {
      status: 'authorized',
      amount: order.total,
      transactionId: 'mercado-pago-transaction-id',
    };
  }

  async authorizePayment(): Promise<AuthorizePaymentResult> {
    return {
      success: true,
    };
  }
}
