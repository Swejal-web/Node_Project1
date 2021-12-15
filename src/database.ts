/* eslint-disable node/no-missing-import */
import knex from 'knex';
// eslint-disable-next-line import/no-unresolved
import dbConfig from 'config/database';

// eslint-disable-next-line import/prefer-default-export
export const db = knex(dbConfig);
