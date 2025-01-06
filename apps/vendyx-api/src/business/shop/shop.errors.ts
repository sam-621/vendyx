import { ShopErrorCode } from '@/api/shared/types/gql.types';

import { ErrorResult } from '../shared/utils/error-result.utils';

export class EmailNotVerified extends ErrorResult<ShopErrorCode> {
  constructor() {
    super(ShopErrorCode.EMAIL_NOT_VERIFIED, 'Email not verified');
  }
}

export class EmailAlreadyExists extends ErrorResult<ShopErrorCode> {
  constructor() {
    super(ShopErrorCode.EMAIL_ALREADY_EXISTS, 'Email already exists');
  }
}
