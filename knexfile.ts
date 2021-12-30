// eslint-disable-next-line import/no-import-module-exports
import dotenv, { config } from 'dotenv';

dotenv.config({ path: './config.env' });

exports.development = {
  client: 'postgres',
  connection: {
    connectionString: process.env.DB_CONNECTION_STRING
  },
  migrations: {
    directory: './migrations',
    tableName: 'knex_migrations'
  }
};
