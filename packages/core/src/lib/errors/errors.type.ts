export type ErrorResult = {
  code: ErrorCode;
  message: string;
};

export enum ErrorCode {
  /**
   * Unexpected error.
   *
   * @description
   * This error should be throw when the origin of the error is not clear.
   * The only way to know the origin of the error is to check the logs.
   */
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  /**
   * User is not authorized to perform an action.
   *
   * @description
   * This error should be thrown when a user is not authorized to perform an action or access a resource.
   */
  UNAUTHORIZED = 'UNAUTHORIZED',
  /**
   * User input is invalid.
   *
   * @description
   * This error should be thrown when a user input that comes from the client is invalid.
   */
  USER_INPUT = 'USER_INPUT',

  /**
   * Payment error.
   *
   * @description
   * This error should be thrown when a payment error occurs.
   */
  PAYMENT = 'PAYMENT',
}

export type ErrorMetadata = Record<string, unknown>;
