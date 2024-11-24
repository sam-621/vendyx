import { UserErrorCode } from '@/api/shared';

import { ErrorResult } from '../shared';

export class EmailAlreadyExists extends ErrorResult<UserErrorCode> {
  constructor() {
    super(UserErrorCode.EMAIL_ALREADY_EXISTS, 'Email already exists');
  }
}

export class InvalidCredentials extends ErrorResult<UserErrorCode> {
  constructor() {
    super(UserErrorCode.INVALID_CREDENTIALS, 'Invalid credentials');
  }
}

export class PasswordInvalidLength extends ErrorResult<UserErrorCode> {
  constructor() {
    super(UserErrorCode.PASSWORD_INVALID_LENGTH, 'Password must be at least 8 characters long');
  }
}

export class InvalidEmail extends ErrorResult<UserErrorCode> {
  constructor() {
    super(UserErrorCode.INVALID_EMAIL, 'Invalid email');
  }
}

export class InvalidOtp extends ErrorResult<UserErrorCode> {
  constructor() {
    super(UserErrorCode.INVALID_OTP, `Invalid OTP`);
  }
}

export class OtpExpired extends ErrorResult<UserErrorCode> {
  constructor() {
    super(UserErrorCode.OTP_EXPIRED, 'OTP expired');
  }
}
