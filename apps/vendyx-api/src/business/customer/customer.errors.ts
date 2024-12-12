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

export class DisabledCustomer extends ErrorResult<CustomerErrorCode> {
  constructor() {
    super(CustomerErrorCode.DISABLED_CUSTOMER, 'Disabled customer');
  }
}
