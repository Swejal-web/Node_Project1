import { CreateSecret } from 'secrets/command/create_secret/create-secret';
import { bcryptService } from 'common/services';

import { db } from 'database';

export class CreateSecretService {
  public async execute(data: CreateSecret): Promise<void> {
    if (data.password) {
      await db('secrets').insert({
        id: data.id,
        body: data.body,
        password: await bcryptService.hash(data.password),
        expiresIn: data.expiresIn,
        expires_at: data.expiresAt
      });
    } else {
      await db('secrets').insert({
        id: data.id,
        body: data.body,
        expiresIn: data.expiresIn,
        expires_at: data.expiresAt
      });
    }
  }
}
