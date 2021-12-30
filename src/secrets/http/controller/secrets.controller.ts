/* eslint-disable consistent-return */
/* eslint-disable import/no-unresolved */
/* eslint-disable node/no-missing-import */
import { Request, Response, NextFunction } from 'express';
import { v4 as uuid4 } from 'uuid';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { CreateSecret } from 'secrets/command/create_secret/create-secret';
import { createSecretService } from 'secrets/command/create_secret';
import { getSecret } from 'secrets/queries/get_secrets';
import { AppError } from 'common/exception/AppError';
import { bcryptService } from 'common/services';
import { nextTick } from 'process';
// eslint-disable-next-line import/prefer-default-export
dotenv.config({ path: './config.env' });

export const postSecret = async (req: Request, res: Response, next) => {
  const id = uuid4();
  const { body } = req; // imp {body"this is body}

  if (!body.body) {
    return next(new AppError('Body is required', 400));
  }

  const command = new CreateSecret({
    id,
    body: body.body,
    password: body.password,
    expiresIn: body.expiresIn
  });

  await createSecretService.execute(command);

  const payload = {
    secret: {
      id
    }
  };

  const token = jwt.sign(payload, process.env.jwt_Secret, {
    expiresIn: body.expiresIn
  });

  const secret = await getSecret.getId(id);
  res.status(201).json({ token, secret });
};

export const getSingleSecret = async (req: Request, res: Response) => {
  // const id: string = req.secretId?.id;
  // console.log(id);
  const tokenid = req.params.tokenId;
  try {
    const decoded = jwt.verify(tokenid, process.env.jwt_SECRET);
    const secret = await getSecret.getId(decoded.secret.id);
    if (!secret.password) {
      return res.status(200).json({ secret: secret.body });
    }
    res
      .status(200)
      .json({ secret: 'This message is encrypted with your password' });
  } catch (err) {
    res.status(200).json({ err: 'token is not valid' });
  }
};

export const getProtectedSingleSecret = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const id: string = req.secretId?.id;
  // console.log(id);
  const tokenid = req.params.tokenId;
  try {
    const decoded = jwt.verify(tokenid, process.env.jwt_SECRET);
    const secret = await getSecret.getId(decoded.secret.id);

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
