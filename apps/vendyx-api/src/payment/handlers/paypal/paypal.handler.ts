import { Injectable } from '@nestjs/common';

import { Args } from '@/persistence/types/args.type';
import {
  ConfigurableOperationUi,
  ConfigurableProperty
} from '@/persistence/types/configurable-operation.type';

import {
  AuthorizePaymentResult,
  CreatePaymentResult,
  PaymentHandler,
  PaymentHandlerOrder
} from '../payment-handler';
import { PaypalConfig } from './paypal.types';

@Injectable()
export class PaypalHandler implements PaymentHandler {
  name = 'Paypal';
  code = 'paypal';

  ui: ConfigurableOperationUi;

  args: PaymentHandlerArgs = {
    clientId: {
      type: 'text',
      required: true,
      label: 'Client ID'
    },
    secret: {
      type: 'text',
      required: true,
      label: 'Secret'
    }
  };

  async createPayment(
    order: PaymentHandlerOrder,
    totalAmount: number,
    args: ConfigurableProperty['args']
  ): Promise<CreatePaymentResult> {
    return { amount: totalAmount, status: 'authorized', transactionId: '123' };
  }
  async authorizePayment(
    order: PaymentHandlerOrder,
    args: ConfigurableProperty['args']
  ): Promise<AuthorizePaymentResult> {
    return { success: true };
  }
}

export type PaymentHandlerArgs = Args<keyof PaypalConfig>;
