import { CustomerErrorCode } from '@/api/shared';

import { ErrorResult } from '../shared';

export class InvalidEmail extends ErrorResult<CustomerErrorCode> {
  constructor() {
    super(CustomerErrorCode.INVALID_EMAIL, 'Invalid email');
  }
}

export class EmailAlreadyExists extends ErrorResult<CustomerErrorCode> {
  constructor() {
    super(CustomerErrorCode.EMAIL_ALREADY_EXISTS, 'Email already exists');
  }
}

export class InvalidAccessToken extends ErrorResult<CustomerErrorCode> {
  constructor() {
    super(CustomerErrorCode.INVALID_ACCESS_TOKEN, 'Invalid access token');
  }
}

export class InvalidCredentials extends ErrorResult<CustomerErrorCode> {
  constructor() {
    super(CustomerErrorCode.INVALID_CREDENTIALS, 'Invalid credentials');
  }
}

export class PasswordsDoNotMatch extends ErrorResult<CustomerErrorCode> {
  constructor() {
    super(CustomerErrorCode.PASSWORDS_DO_NOT_MATCH, 'Passwords do not match');
  }
}
