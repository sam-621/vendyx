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
