/* eslint-disable node/no-missing-import */
/* eslint-disable import/no-unresolved */
import { Express } from 'express';
import { Knex } from 'knex';
import app from 'app';
import { db } from 'database';

// eslint-disable-next-line import/prefer-default-export
export class AppFactory {
  // eslint-disable-next-line no-useless-constructor
  private constructor(public instance: Express, public knex: Knex) {}

  static async new(): Promise<AppFactory> {
    return new AppFactory(app, db);
  }

  async refreshDatabase(): Promise<void> {
    await this.knex.migrate.rollback();
    await this.knex.migrate.latest();
  }

  async close(): Promise<void> {
    await this.knex.destroy();
  }
}
