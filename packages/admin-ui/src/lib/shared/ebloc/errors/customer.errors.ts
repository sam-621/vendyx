import { CustomerErrorCode, type CustomerErrorResult } from '../codegen/graphql';
import { CommonErrorMessages } from './common.errors';

export const getCustomerErrorMessage = (error?: CustomerErrorResult) => {
  if (!error) {
    return '';
  }

  if (error.code === CustomerErrorCode.CustomerNotFound) {
    return CustomerErrorMessage.CustomerNotFound;
  }

  if (error.code === CustomerErrorCode.InvalidEmail) {
    return CustomerErrorMessage.invalidEmail;
  }

  if (error.code === CustomerErrorCode.EmailAlreadyExists) {
    return CustomerErrorMessage.EmailAlreadyExists;
  }

  return CommonErrorMessages.GenericError;
};

const CustomerErrorMessage = {
  CustomerNotFound: 'Customer not found',
  invalidEmail: 'Invalid email',
  EmailAlreadyExists: 'Customer with that email already exists'
};
