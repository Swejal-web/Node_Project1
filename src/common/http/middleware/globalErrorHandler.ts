/* eslint-disable import/no-unresolved */
/* eslint-disable node/no-missing-import */
import { NextFunction, Request, Response } from 'express';

import { AppError } from 'common/exception/AppError';

// eslint-disable-next-line import/prefer-default-export
export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.statusCode).json({
    status: err.status,

    message: err.message,
    error: err,
    stack: err.stack
  });
};
