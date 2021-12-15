import { resolve } from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

export default {
  client: 'postgresql',
  connection: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string, 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  },
  migrations: {
    directory: resolve(__dirname, '../../migrations'),
    tableName: 'knex_migrations'
  }
};
