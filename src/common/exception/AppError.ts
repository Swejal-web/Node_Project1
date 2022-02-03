export class AppError extends Error {
  public statusCode: number;

  public status: string;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'Fail' : 'Error';

    Error.captureStackTrace(this, this.constructor);
  }
}

//  return knex.schema.createTable('secrets', (table) => {
//     table.uuid('id');
//     table.text('body');
//     table.string('password').nullable();
//     table.specificType('expiresIn', 'INTERVAL');
//     table.timestamp('created_at').defaultTo(knex.fn.now());
//     table.string('expires_at');

//     return knex.schema.dropTable('secrets');

//     import { Knex } from 'knex';

// export async function up(knex: Knex): Promise<void> {
//   return knex.schema.table('secrets', (table) => {
//     table.boolean('is_protected');
//   });
// }

// export async function down(knex: Knex): Promise<void> {
//   return knex.schema.table('secrets', (table) => {
//     table.dropColumn('is_protected');
//   });
// }
