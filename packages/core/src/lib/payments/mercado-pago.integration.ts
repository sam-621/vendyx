import {
  AuthorizePaymentResult,
  CreatePaymentResult,
  PaymentIntegration,
  PaymentStatus,
} from '@/app/config';
import { OrderEntity } from '@/app/persistance';

export class MercadoPagoIntegration implements PaymentIntegration {
  name = 'Mercado Pago';
  code = 'mercado-pago';

  async createPayment(order: OrderEntity): Promise<CreatePaymentResult> {
    return {
      status: PaymentStatus.AUTHORIZED,
      amount: order.total,
      transactionId: 'mercado-pago-transaction-id',
    };
  }

  async authorizePayment(order: OrderEntity): Promise<AuthorizePaymentResult> {
    console.log({ order });

    return {
      success: true,
    };
  }
}
