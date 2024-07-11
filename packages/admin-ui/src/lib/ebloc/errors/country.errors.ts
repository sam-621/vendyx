import { CountryErrorCode, type CountryErrorResult } from '../codegen/graphql';
import { CommonErrorMessages } from './common.errors';

export const getCountryErrorMessage = (error?: CountryErrorResult) => {
  if (!error) return '';

  if (error.code === CountryErrorCode.DuplicatedCountryName) {
    return 'Country name already exists';
  }

  return CommonErrorMessages.GenericError;
};
