import { ShopErrorCode } from '@/api/shared';

import { ErrorResult } from '../shared';

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
