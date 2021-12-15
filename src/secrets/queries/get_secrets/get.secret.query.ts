/* eslint-disable import/no-unresolved */
/* eslint-disable node/no-missing-import */
import { Secret } from 'secrets/queries/get_secrets/secrets';
import { db } from 'database';
// eslint-disable-next-line import/prefer-default-export
export class GetSecretQuery {
  async getId(id: string): Promise<Secret> {
    const secrets = await db('secrets').where({ id }).first();

    return new Secret({
      id: secrets.id,
      body: secrets.body,
      expiresIn: secrets.expiresIn
    });
  }
}
