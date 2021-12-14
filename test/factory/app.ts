/* eslint-disable node/no-missing-import */
import { Express } from 'express';
// eslint-disable-next-line import/no-unresolved
import app from 'app';

// eslint-disable-next-line import/prefer-default-export
export class AppFactory {
  // eslint-disable-next-line no-useless-constructor
  private constructor(public instance: Express) {}

  static async new(): Promise<AppFactory> {
    return new AppFactory(app);
  }

  async refreshDatabase(): Promise<void> {
    return Promise.resolve();
  }

  close(): Promise<void> {
    return Promise.resolve();
  }
}
