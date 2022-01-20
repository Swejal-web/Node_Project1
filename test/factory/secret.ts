/* eslint-disable camelcase */
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
  await db('secrets').insert({
    id,
    body,
    password: password ? await bcryptService.hash(password) : null,
    expiresIn,
    expires_at: expiresAt,
    is_protected: (password && true) || false
  });
};

export const getSecret = async (id): Promise<Secret> => {
  const secrets = await db('secrets').where({ id }).first();

  return secrets;
};
