import { CollectionErrorCode, type CollectionErrorResult } from '../codegen/graphql';
import { CommonErrorMessages } from './common.errors';

export const getCollectionErrorMessage = (error?: CollectionErrorResult) => {
  if (!error) {
    return '';
  }

  if (error.code === CollectionErrorCode.CollectionNotFound) {
    return CollectionErrorMessage.CollectionNotFound;
  }

  if (error.code === CollectionErrorCode.DuplicatedSlug) {
    return CollectionErrorMessage.DuplicatedSlug;
  }

  return CommonErrorMessages.GenericError;
};

const CollectionErrorMessage = {
  CollectionNotFound: 'Collection not found',
  DuplicatedSlug: 'Collection with that slug already exists'
};
