/* eslint-disable import/no-unresolved */
/* eslint-disable node/no-missing-import */
import { CreateSecret } from 'secrets/command/create_secret/create-secret';

// eslint-disable-next-line import/prefer-default-export
export class CreateSecretService {
  public async execute(_data: CreateSecret): Promise<void> {
    return Promise.resolve();
  }
}
