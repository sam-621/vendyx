import { ProductErrorCode, type ProductErrorResult } from '../codegen/graphql';
import { CommonErrorMessages } from './common.errors';

export const getProductErrorMessages = (error?: ProductErrorResult) => {
  if (!error) {
    return '';
  }

  if (error.code === ProductErrorCode.DuplicatedSlug) {
    return ProductErrorMessages.DuplicatedSlug;
  }

  if (error.code === ProductErrorCode.ProductNotFound) {
    return ProductErrorMessages.ProductNotFound;
  }

  if (error.code === ProductErrorCode.NoIdOrSlugProvided) {
    return ProductErrorMessages.NoIdOrSlugProvided;
  }

  return CommonErrorMessages.GenericError;
};

export const ProductErrorMessages = {
  ProductNotFound: 'No product found',
  NoIdOrSlugProvided: 'No id or slug provided',
  DuplicatedSlug: 'Slug already exists'
};
