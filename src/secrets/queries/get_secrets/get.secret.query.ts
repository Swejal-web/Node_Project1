/* eslint-disable import/no-unresolved */
/* eslint-disable node/no-missing-import */
import { Secret } from 'secrets/queries/get_secrets/secrets';
import { bcryptService } from 'common/services/index';

// eslint-disable-next-line import/prefer-default-export
export class GetSecretQuery {
  async getId(
    id: string,
    body: string,
    password: string,
    expiresIn: object
  ): Promise<Secret> {
    return new Secret({
      id,
      body: body,
      password: await bcryptService.hash(password),
      expiresIn: expiresIn
    });
  }
}
