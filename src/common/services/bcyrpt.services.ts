import * as bcrypt from 'bcrypt';

export class BcryptService {
  private readonly SALT_ROUNDS = 5;

  hash(value: string): Promise<string> {
    return bcrypt.hash(value, this.SALT_ROUNDS);
  }

  correctPassword(password: string, password2: string): Promise<boolean> {
    return bcrypt.compare(password, password2);
  }
}

// import { Knex } from 'knex';

// export async function up(knex: Knex): Promise<void> {
//   return knex.schema.createTable('secrets', (table) => {
//     table.uuid('id');
//     table.text('body');
//     table.string('password').nullable();
//     table.specificType('expiresIn', 'INTERVAL');
//     table.timestamp('created_at').defaultTo(knex.fn.now());
//     table.string('expires_at');
//   });
// }

// export async function down(knex: Knex): Promise<void> {
//   return knex.schema.dropTable('secrets');
// }
