/* eslint-disable import/no-unresolved */
/* eslint-disable node/no-missing-import */
import { CreateSecret } from 'secrets/command/create_secret/create-secret';
import { bcryptService } from 'common/services';

import { db } from 'database';

// eslint-disable-next-line import/prefer-default-export
export class CreateSecretService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async execute({
    id,
    body,
    password,
    expiresIn
  }: CreateSecret): Promise<void> {
    await db('secrets').insert({
      id,
      body,
      password: await bcryptService.hash(password),
      expiresIn
    });
  }
}
