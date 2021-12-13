/* eslint-disable import/no-unresolved */
/* eslint-disable node/no-missing-import */
import express, { Application, Request, Response, NextFunction } from 'express';

import { secretRouter } from 'secrets/http/route';
import { globalErrorHandler } from 'common/http/middleware/globalErrorHandler';
import { AppError } from 'common/exception/AppError';

const app: Application = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(secretRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Cannot connect to ${req.originalUrl}.Try again`, 404));
});

app.use(globalErrorHandler);

export default app;
