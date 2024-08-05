import { ErrorResult } from '../shared';

import { UserErrorCode } from '@/api/shared';

export class EmailAlreadyExists extends ErrorResult<UserErrorCode> {
  constructor() {
    super(UserErrorCode.EMAIL_ALREADY_EXISTS, 'Email already exists');
  }
}
