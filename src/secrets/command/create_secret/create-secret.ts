export class CreateSecret {
  public readonly id: string;

  public readonly body: string;

  public readonly password: string | null;

  public readonly expiresIn: string;

  public readonly expiresAt: string;

  public readonly is_protected: boolean;

  constructor(props: CreateSecret) {
    Object.assign(this, props);
  }
}
