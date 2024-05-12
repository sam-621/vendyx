export class ApiError extends Error {
  constructor(
    message: string,
    readonly code: string
  ) {
    super(message);
  }
}

export class UnexpectedError extends Error {
  constructor() {
    super('Un error inesperado ocurrió. Porfavor recargue la página y vuelva a intentar..');
  }
}
