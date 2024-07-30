import { ErrorResult } from '../utils';

import { ProductErrorCode } from '@/api/common';

export class ProductNotFoundError extends ErrorResult<ProductErrorCode> {
  constructor() {
    super(ProductErrorCode.PRODUCT_NOT_FOUND, 'Product not found');
  }
}
