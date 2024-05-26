import { ErrorCode, ErrorMetadata, ErrorResult } from './errors.type';

import { AdminErrorCode, ProductErrorCode } from '@/app/api/common';

/**
 * @deprecated
 * @description
 * This is the error base class.
 * All controlled errors should extend this class.
 */
export abstract class BusinessError implements ErrorResult {
  constructor(
    readonly code: ErrorCode,
    readonly message: string,
    readonly metadata?: ErrorMetadata
  ) {}
}

/**
 * @deprecated
 * @description
 * This error is thrown when a user is not authorized to perform an action.
 */
export class UnauthorizedError extends BusinessError {
  constructor(message: string, metadata?: ErrorMetadata) {
    super(ErrorCode.UNAUTHORIZED, message, metadata);
  }
}

/**
 * @deprecated
 * @description
 * This error is thrown when a user input is invalid.
 */
export class UserInputError extends BusinessError {
  constructor(message: string, metadata?: ErrorMetadata) {
    super(ErrorCode.USER_INPUT, message, metadata);
  }
}

/**
 * @deprecated
 * @description
 * This error is thrown when a payment error occurs.
 */
export class OrderError extends BusinessError {
  constructor(message: string, metadata?: ErrorMetadata) {
    super(ErrorCode.PAYMENT, message, metadata);
  }
}

export abstract class GraphqlError implements ErrorResult {
  constructor(
    readonly code: ErrorCode,
    readonly message: string,
    readonly metadata?: ErrorMetadata
  ) {}
}

/**
 * @description
 * This error is thrown when an unexpected error occurs.
 */
export class InternalServerError extends GraphqlError {
  constructor(metadata?: ErrorMetadata) {
    super(ErrorCode.INTERNAL_SERVER_ERROR, 'Un error inesperado ha ocurrido', metadata);
  }
}
