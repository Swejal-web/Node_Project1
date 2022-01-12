import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import xss from 'xss-clean';

import { secretRouter } from 'secrets/http/route';
import { globalErrorHandler } from 'common/http/middleware/globalErrorHandler';
import { AppError } from 'common/exception/AppError';

dotenv.config({ path: './config.env' });

const app = express();

app.use(helmet()); // Security HTTP headers

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(xss()); // prevents attack in the form of malacious html code

app.use('/api', secretRouter);

app.all('*', (req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(`Cannot connect to ${req.originalUrl}.Try again`, 404));
});

app.use(globalErrorHandler);

export default app;
