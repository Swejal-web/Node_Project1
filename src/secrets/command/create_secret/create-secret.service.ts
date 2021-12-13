/* eslint-disable import/no-unresolved */
/* eslint-disable node/no-missing-import */
import { CreateSecret } from 'secrets/command/create_secret/create-secret';

// eslint-disable-next-line import/prefer-default-export
export class CreateSecretService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async execute(_data: CreateSecret): Promise<void> {
    return Promise.resolve();
  }
}
