import { bcryptService } from 'common/services';
import { db } from 'database';

import { CreateSecret } from 'secrets/command/create_secret/create-secret';
import { Secret } from 'secrets/queries/get_secrets/secrets';

export const createSecret = async ({
  id,
  body,
  password,
  expiresIn,
  expiresAt
}: CreateSecret) => {
  if (password) {
    await db('secrets').insert({
      id,
      body,
      password: await bcryptService.hash(password),
      expiresIn,
      expires_at: expiresAt
    });
  } else {
    await db('secrets').insert({
      id,
      body,
      expiresIn,
      expires_at: expiresAt
    });
  }
};

export const getSecret = async (id): Promise<Secret> => {
  const secrets = await db('secrets').where({ id }).first();
  return secrets;
};
