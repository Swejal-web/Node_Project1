/* eslint-disable import/no-unresolved */
/* eslint-disable node/no-missing-import */
import { CreateSecret } from 'secrets/command/create_secret/create-secret';
import { bcryptService } from 'common/services';

import { db } from 'database';

// eslint-disable-next-line import/prefer-default-export
export class CreateSecretService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async execute(data: CreateSecret): Promise<void> {
    if (data.password) {
      await db('secrets').insert({
        id: data.id,
        body: data.body,
        password: await bcryptService.hash(data.password),
        expiresIn: data.expiresIn
      });
    } else {
      await db('secrets').insert({
        id: data.id,
        body: data.body,
        expiresIn: data.expiresIn
      });
    }
  }
}
