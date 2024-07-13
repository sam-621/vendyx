import { ZoneErrorCode, type ZoneErrorResult } from '../codegen/graphql';
import { CommonErrorMessages } from './common.errors';

export const getZoneErrorMessage = (error?: ZoneErrorResult) => {
  if (!error) {
    return '';
  }

  if (error.code === ZoneErrorCode.DuplicatedZoneName) {
    return 'Zone name already exists';
  }

  return CommonErrorMessages.GenericError;
};
