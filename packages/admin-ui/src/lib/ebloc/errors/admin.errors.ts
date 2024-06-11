import { AdminErrorCode, type AdminErrorResult } from '../codegen/graphql';
import { CommonErrorMessages } from './common.errors';

export const getAdminErrorMessages = (error?: AdminErrorResult) => {
  if (!error) {
    return '';
  }

  if (error.code === AdminErrorCode.InvalidCredentials) {
    return AdminErrorMessages.InvalidCredentials;
  }

  return CommonErrorMessages.GenericError;
};

const AdminErrorMessages = {
  InvalidCredentials: 'Invalid credentials'
};
