// eslint-disable-next-line import/prefer-default-export
export class CreateSecret {
  public id: string;

  public body: string;

  public password: string | null;

  public expiresIn: string;

  constructor({ id, body, password, expiresIn }: CreateSecret) {
    this.id = id;
    this.body = body;
    this.password = password;
    this.expiresIn = expiresIn;
  }
}
