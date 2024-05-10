import { ErrorCode, ErrorMetadata, ErrorResult } from './errors.type';

/**
 * @description
 * This is the error base class.
 * All controlled errors should extend this class.
 */
export abstract class BusinessError implements ErrorResult {
  constructor(
    readonly code: ErrorCode,
    readonly message: string,
    readonly metadata?: ErrorMetadata,
  ) {}
}

/**
 * @description
 * This error is thrown when an unexpected error occurs.
 */
export class InternalServerError extends BusinessError {
  constructor(message: string, metadata?: ErrorMetadata) {
    super(ErrorCode.INTERNAL_SERVER_ERROR, message, metadata);
  }
}

/**
 * @description
 * This error is thrown when a user is not authorized to perform an action.
 */
export class UnauthorizedError extends BusinessError {
  constructor(message: string, metadata?: ErrorMetadata) {
    super(ErrorCode.UNAUTHORIZED, message, metadata);
  }
}

/**
 * @description
 * This error is thrown when a user input is invalid.
 */
export class UserInputError extends BusinessError {
  constructor(message: string, metadata?: ErrorMetadata) {
    super(ErrorCode.USER_INPUT, message, metadata);
  }
}

/**
 * @description
 * This error is thrown when a payment error occurs.
 */
export class OrderError extends BusinessError {
  constructor(message: string, metadata?: ErrorMetadata) {
    super(ErrorCode.PAYMENT, message, metadata);
  }
}
