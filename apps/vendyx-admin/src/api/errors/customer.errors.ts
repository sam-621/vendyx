import { CustomerErrorCode, type CustomerErrorResult } from '../types';

export const getCustomerError = (error?: CustomerErrorResult) => {
  if (!error) return null;

  if (error.code === CustomerErrorCode.EmailAlreadyExists) {
    return 'Email already exists';
  }

  if (error.code === CustomerErrorCode.InvalidEmail) {
    return 'Email is invalid';
  }
};
