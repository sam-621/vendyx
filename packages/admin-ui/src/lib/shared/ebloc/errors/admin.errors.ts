import { AdminErrorCode, type AdminErrorResult } from '../codegen/graphql';
import { CommonErrorMessages } from './common.errors';

export const getAdminErrorMessages = (error?: AdminErrorResult) => {
  if (!error) {
    return '';
  }

  if (error.code === AdminErrorCode.InvalidCredentials) {
    return 'Invalid credentials';
  }

  return CommonErrorMessages.GenericError;
};
