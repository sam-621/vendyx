import { ShopErrorCode, type ShopErrorResult } from '../types';

export const getShopError = (error?: ShopErrorResult) => {
  if (!error) return null;

  if (error.code === ShopErrorCode.EmailAlreadyExists) {
    return 'Email already exists for a shop';
  }

  if (error.code === ShopErrorCode.EmailNotVerified) {
    return 'You must verify your email before creating a shop';
  }
};
