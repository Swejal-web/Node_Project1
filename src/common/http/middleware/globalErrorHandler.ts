/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';

import { AppError } from 'common/exception/AppError';

export const globalErrorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(err.statusCode).json({
    status: err.status,

    message: err.message,
    error: err,
    stack: err.stack
  });
};
