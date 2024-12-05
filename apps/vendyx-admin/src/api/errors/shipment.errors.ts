import { ShippingMethodErrorCode, type ShippingMethodErrorResult } from '../types';

export const getShippingMethodError = (error?: ShippingMethodErrorResult) => {
  if (!error) {
    return null;
  }

  if (error.code === ShippingMethodErrorCode.HandlerNotFound) {
    return 'Handler not found';
  }

  return 'An unexpected error occurred';
};
