import * as Knex from 'knex';
import * as faker from 'faker/locale/pt_BR';
import { IOrder } from 'modules/database/interfaces/order';
import { IS_DEV } from 'settings';

export async function seed(knex: Knex): Promise<any> {
  if (!IS_DEV) return;

  const orders = await knex
    .count()
    .from('Order')
    .first();

  if (Number(orders.count) !== 0) return;

  for (let i = 0; i < 500; i++) {
    const description = faker.lorem.lines();
    const amount = faker.random.number(10000);
    const value = Number(faker.finance.amount(10, 99999.99));

    const order: IOrder = {
      userId: faker.random.number(9) + 1,
      description,
      amount,
      value,
      createdDate: new Date(),
      updatedDate: new Date()
    };

    await knex.insert(order).into('Order');
  }
}
