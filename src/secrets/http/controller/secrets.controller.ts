/* eslint-disable consistent-return */

import { Request, Response, NextFunction } from 'express';
import { v4 as uuid4 } from 'uuid';
import dotenv from 'dotenv';

import { CreateSecret } from 'secrets/command/create_secret/create-secret';
import { createSecretService } from 'secrets/command/create_secret';
import { createExpiration } from 'secrets/exceptions';
import { getSecret } from 'secrets/queries/get_secrets';
import { AppError } from 'common/exception/AppError';
import { bcryptService } from 'common/services';

dotenv.config({ path: './config.env' });

export const postSecret = async (req: Request, res: Response, next) => {
  const id = uuid4();
  const { body } = req; // imp {body"this is body}

  if (!body.body) {
    return next(new AppError('Secret is required', 400));
  }

  const command = new CreateSecret({
    id,
    body: body.body,
    password: body.password,
    expiresIn: body.expiresIn,
    expiresAt: createExpiration.makeExpiration(body.expiresIn)
  });

  await createSecretService.execute(command);

  const secret = await getSecret.getId(id);
  res.status(201).json({ secret });
};

export const getSingleSecret = async (req: Request, res: Response, next) => {
  try {
    const secret = await getSecret.getId(req.params.id);

    const expireDate = new Date(secret.expiresAt);

    if (new Date().getTime() > expireDate.getTime()) {
      return next(new AppError('The secret is expired', 401));
    }

    if (!secret.password) {
      return res.status(200).json({
        secId: secret.id,
        secretBody: secret.body,
        secretPassword: secret.password
      });
    }
    res.status(200).json({
      secId: secret.id,
      secretBody: 'This message is encrypted with your password',
      secretPassword: secret.password
    });
  } catch (err) {
    res.status(400).json({ err: 'token is not valid' });
  }
};

export const getProtectedSingleSecret = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const secret = await getSecret.getId(req.params.id);

    if (!secret.password) {
      return res.status(200).json({ secret: secret.body });
    }

    const { password } = req.body;
    if (!password) {
      return next(new AppError('Please enter  password', 400));
    }
    if (
      !secret ||
      !(await bcryptService.correctPassword(password, secret.password))
    ) {
      return next(new AppError(' password not matched', 401));
    }
    res.status(201).json({ secret: secret.body });
  } catch (err) {
    res.status(200).json({ message: err.message });
  }
};
