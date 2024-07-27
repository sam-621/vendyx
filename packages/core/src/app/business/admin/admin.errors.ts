import { ErrorResult } from '../utils';

import { AdminErrorCode } from '@/app/api/common';

export class InvalidCredentialError extends ErrorResult<AdminErrorCode> {
  constructor() {
    super(AdminErrorCode.INVALID_CREDENTIALS, 'Invalid username or password');
  }
}
