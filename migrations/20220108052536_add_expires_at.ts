import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('secrets', (table) => {
    table.string('expires_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('secrets', (table) => {
    table.dropColumn('expires_at');
  });
}
