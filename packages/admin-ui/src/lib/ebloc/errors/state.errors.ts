import { StateErrorCode, type StateErrorResult } from '../codegen/graphql';
import { CommonErrorMessages } from './common.errors';

export const getStateErrorMessage = (error?: StateErrorResult) => {
  if (!error) return '';

  if (error.code === StateErrorCode.DuplicatedStateNameInCountry) {
    return 'State name already exists in this country';
  }

  return CommonErrorMessages.GenericError;
};
