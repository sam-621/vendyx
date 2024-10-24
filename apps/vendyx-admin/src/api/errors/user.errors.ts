import { UserErrorCode, type UserErrorResult } from '../codegen/graphql';

export const getUserError = (error?: UserErrorResult) => {
  if (!error) return '';

  if (error.code === UserErrorCode.EmailAlreadyExists) {
    return 'Email already exists';
  }

  if (error.code === UserErrorCode.InvalidCredentials) {
    return 'Invalid credentials';
  }
};
