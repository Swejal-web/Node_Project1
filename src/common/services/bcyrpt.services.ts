import * as bcrypt from 'bcrypt';

export class BcryptService {
  private readonly SALT_ROUNDS = 5;

  hash(value: string): Promise<string> {
    return bcrypt.hash(value, this.SALT_ROUNDS);
  }

  correctPassword(password: string, password2: string): Promise<boolean> {
    return bcrypt.compare(password, password2);
  }
}
