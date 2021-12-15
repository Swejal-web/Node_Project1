// eslint-disable-next-line import/no-import-module-exports
import dotenv, { config } from 'dotenv';

dotenv.config({ path: './config.env' });

exports.development = {
  client: 'postgres',
  connection: {
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  },
  migrations: {
    directory: './migrations',
    tableName: 'knex_migrations'
  }
};
