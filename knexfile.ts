// eslint-disable-next-line import/no-import-module-exports
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

exports.development = {
  client: 'postgres',
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  },
  migrations: {
    directory: './migrations',
    tableName: 'knex_migrations'
  }
};
