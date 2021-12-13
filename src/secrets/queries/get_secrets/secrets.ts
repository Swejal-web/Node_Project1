// eslint-disable-next-line import/prefer-default-export
export class Secret {
  public id: string;

  public body: string;

  public password: string;

  public expiresIn: object;

  constructor({ id, body, expiresIn, password }: Secret) {
    this.id = id;
    this.body = body;
    this.password = password;
    this.expiresIn = expiresIn;
  }
}
