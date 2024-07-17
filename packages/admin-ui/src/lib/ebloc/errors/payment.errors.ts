import { type PaymentMethodErrorResult } from '../codegen/graphql';
import { CommonErrorMessages } from './common.errors';

export const getPaymentMethodErrorMessage = (error?: PaymentMethodErrorResult) => {
  if (!error) return '';

  return CommonErrorMessages.GenericError;
};
