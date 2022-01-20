import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('secrets', (table) => {
    table.boolean('is_protected');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('secrets', (table) => {
    table.dropColumn('is_protected');
  });
}
