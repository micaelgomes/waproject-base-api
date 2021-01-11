import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Order', table => {
    table
      .increments()
      .notNullable()
      .primary()
      .unique();

    table.integer('userId').unsigned();

    table
      .foreign('userId')
      .references('id')
      .inTable('User')
      .onDelete('CASCADE');

    table.string('description', 1020).notNullable();
    table.integer('amount').notNullable();
    table.decimal('value').notNullable();
    table.dateTime('createdDate').notNullable();
    table.dateTime('updatedDate').notNullable();
    // table.timestamps(); to use its needed change model
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('Order');
}
