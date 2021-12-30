/* eslint-disable node/no-missing-import */
// eslint-disable-next-line import/no-unresolved
import { db } from 'database';
// eslint-disable-next-line import/no-unresolved
import { CreateSecret } from 'secrets/command/create_secret/create-secret';

// eslint-disable-next-line import/prefer-default-export
export const createSecret = async ({
  id,
  body,
  password,
  expiresIn
}: CreateSecret) => {
  await db('secrets').insert({
    id,
    body,
    password,
    expiresIn
  });
};
