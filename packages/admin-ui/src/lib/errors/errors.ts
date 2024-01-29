export class ApiError extends Error {
  constructor(message: string, readonly code: string) {
    super(message)
  }
}

export class UnexpectedError extends Error {
  constructor(message: string) {
    super(message)
  }
}
