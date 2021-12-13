/* eslint-disable import/no-unresolved */
/* eslint-disable node/no-missing-import */
import { Request, Response } from 'express';
import { v4 as uuid4 } from 'uuid';
import { CreateSecret } from 'secrets/command/create_secret/create-secret';
import { createSecretService } from 'secrets/command/create_secret';
import { getSecret } from 'secrets/queries/get_secrets';
// eslint-disable-next-line import/prefer-default-export
export const postSecret = async (req: Request, res: Response) => {
  const id = uuid4();
  const { body } = req;
  const command = new CreateSecret({
    id,
    body: body.body,
    password: body.password,
    expiresIn: body.expiresIn
  });
  await createSecretService.execute(command);
  //   res.status(201).json({
  //     data
  //   });
  console.log(command);
  const secret = await getSecret.getId(
    id,
    body.body,
    body.password,
    body.expiresIn
  );
  res.status(201).json({
    status: 'success',
    secret
  });
};
