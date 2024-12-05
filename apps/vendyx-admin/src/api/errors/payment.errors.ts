import { PaymentMethodErrorCode, type PaymentMethodErrorResult } from '../types';

export const getPaymentMethodError = (error?: PaymentMethodErrorResult) => {
  if (!error) {
    return null;
  }

  if (error.code === PaymentMethodErrorCode.HandlerAlreadySelected) {
    return 'This handler is already selected in another payment method';
  }

  if (error.code === PaymentMethodErrorCode.HandlerNotFound) {
    return 'Handler not found';
  }

  return 'An unexpected error occurred';
};
