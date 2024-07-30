import { ErrorResult } from '../common';

import { AdminErrorCode } from '@/api/common';

export class InvalidCredentialError extends ErrorResult<AdminErrorCode> {
  constructor() {
    super(AdminErrorCode.INVALID_CREDENTIALS, 'Invalid username or password');
  }
}
