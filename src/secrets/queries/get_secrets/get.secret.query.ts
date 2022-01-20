import { Secret } from 'secrets/queries/get_secrets/secrets';
import { db } from 'database';

export class GetSecretQuery {
  async getId(id: string): Promise<Secret> {
    const secrets = await db('secrets').where({ id }).first();

    return new Secret({
      id: secrets.id,
      body: secrets.body,
      password: secrets.password,
      expiresIn: secrets.expiresIn,
      expiresAt: secrets.expires_at,
      is_protected: secrets.is_protected
    });
  }
}
