import { resolve } from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

export default {
  client: 'postgresql',
  connection: {
    connectionString: process.env.DB_CONNECTION_STRING
  },
  migrations: {
    directory: resolve(__dirname, '../../migrations'),
    tableName: 'knex_migrations'
  }
};
