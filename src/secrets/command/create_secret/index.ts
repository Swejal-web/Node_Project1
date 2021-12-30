/* eslint-disable import/no-unresolved */
/* eslint-disable node/no-missing-import */
import { CreateSecretService } from 'secrets/command/create_secret/create-secret.service';

const createSecretService = new CreateSecretService();

// eslint-disable-next-line import/prefer-default-export
export { createSecretService };
