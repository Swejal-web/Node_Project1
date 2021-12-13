// eslint-disable-next-line import/prefer-default-export
export class AppError extends Error {
  public statusCode: number;

  public status: string;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'Fail' : 'Error';

    Error.captureStackTrace(this, this.constructor);
  }
}
