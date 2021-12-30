/* eslint-disable import/no-unresolved */
/* eslint-disable node/no-missing-import */
import { BcryptService } from 'common/services/bcyrpt.services';

const bcryptService = new BcryptService();

// eslint-disable-next-line import/prefer-default-export
export { bcryptService };
