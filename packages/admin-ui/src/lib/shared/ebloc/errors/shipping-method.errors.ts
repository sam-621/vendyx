import { ShippingMethodErrorCode, type ShippingMethodErrorResult } from '../codegen/graphql';
import { CommonErrorMessages } from './common.errors';

export const getShippingMethodErrorMessage = (error?: ShippingMethodErrorResult) => {
  if (!error) {
    return '';
  }

  if (error.code === ShippingMethodErrorCode.ShippingPriceCalculatorNotFound) {
    return 'Shipping price calculator not found';
  }

  return CommonErrorMessages.GenericError;
};
