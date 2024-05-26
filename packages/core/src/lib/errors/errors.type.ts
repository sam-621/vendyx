export type ErrorResult = {
  code: ErrorCode;
  message: string;
};

export enum ErrorCode {
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
  USER_INPUT = 'USER_INPUT'
}

export type ErrorMetadata = Record<string, unknown>;
