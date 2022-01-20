import { CreateSecret } from 'secrets/command/create_secret/create-secret';
import { bcryptService } from 'common/services';

import { db } from 'database';

export class CreateSecretService {
  public async execute(data: CreateSecret): Promise<void> {
    await db('secrets').insert({
      id: data.id,
      body: data.body,
      password: data.password,
      expiresIn: data.expiresIn,
      expires_at: data.expiresAt,
      is_protected: data.is_protected
    });
  }
}
