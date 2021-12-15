// eslint-disable-next-line import/prefer-default-export
export class Secret {
  public readonly id: string;

  public readonly body: string;

  public readonly expiresIn: string;

  constructor(props: Partial<Secret>) {
    Object.assign(this, props);
  }
}
