import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('secrets', (table) => {
    table.uuid('id');
    table.text('body');
    table.string('password').nullable();
    table.boolean('is_protected');
    table.specificType('expiresIn', 'INTERVAL');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.string('expires_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('secrets');
}
