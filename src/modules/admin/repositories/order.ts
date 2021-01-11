import { Injectable } from '@nestjs/common';
import { IPaginationParams } from 'modules/common/interfaces/pagination';
import { Page, Transaction } from 'objection';

import { IOrder } from '../../database/interfaces/order';
import { Order } from '../../database/models/order';

@Injectable()
export class OrderRepository {
  public async list(params: IPaginationParams, id: number, transaction?: Transaction): Promise<Page<Order>> {
    let query = Order.query(transaction)
      .select('*')
      .where({ userId: id })
      .page(params.page, params.pageSize);

    switch (params.orderBy) {
      case 'amount': {
        query = query.orderBy(params.orderBy, params.orderDirection);
        break;
      }
      case 'value': {
        query = query.orderBy(params.orderBy, params.orderDirection);
        break;
      }
      default: {
        query = query.orderBy(params.orderBy, params.orderDirection);
        break;
      }
    }

    if (params.term) {
      query = query.where(query => {
        return query.where('description', 'ilike', `%${params.term}%`);
      });
    }

    return query;
  }

  public async insert(model: IOrder, transaction?: Transaction): Promise<Order> {
    return Order.query(transaction).insert(model);
  }

  public async update(model: IOrder, transaction?: Transaction): Promise<Order> {
    return Order.query(transaction).updateAndFetchById(model.id, <Order>model);
  }

  public async remove(id: number, transaction?: Transaction): Promise<void> {
    await Order.query(transaction)
      .del()
      .where({ id });
  }

  public async findById(id: number, transaction?: Transaction): Promise<Order> {
    return Order.query(transaction)
      .where({ id })
      .first();
  }
}
