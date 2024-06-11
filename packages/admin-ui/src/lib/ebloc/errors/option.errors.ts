import { OptionErrorCode, type OptionErrorResult } from '../codegen/graphql';
import { CommonErrorMessages } from './common.errors';

export const getOptionErrorMessages = (error?: OptionErrorResult) => {
  if (!error) {
    return '';
  }

  if (error.code === OptionErrorCode.DuplicatedOptionValues) {
    return OptionErrorMessage.DuplicatedOptionValues;
  }

  return CommonErrorMessages.GenericError;
};

const OptionErrorMessage = {
  DuplicatedOptionValues: 'You cannot have duplicated option values'
};
