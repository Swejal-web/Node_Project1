/* eslint-disable import/no-unresolved */
/* eslint-disable node/no-missing-import */
import { Secret } from 'secrets/queries/get_secrets/secrets';

// eslint-disable-next-line import/prefer-default-export
export class GetSecretQuery {
  async getId(id: string): Promise<Secret> {
    return new Secret({
      id,
      body: 'secret body goes here',
      expiresIn: { hours: 3, minutes: 2, seconds: 1 }
    });
  }
}
