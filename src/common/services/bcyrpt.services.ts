import * as bcrypt from 'bcrypt';

// eslint-disable-next-line import/prefer-default-export
export class BcryptService {
  private readonly SALT_ROUNDS = 5;

  hash(value: string): Promise<string> {
    return bcrypt.hash(value, this.SALT_ROUNDS);
  }
}
