import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('secrets', (table) => {
    table.uuid('id');
    table.string('body').notNullable();
    table.string('password');
    table.specificType('expiresIn', 'INTERVAL');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable('secrets');
}
