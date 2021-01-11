import { Injectable, NotFoundException } from '@nestjs/common';
import { IOrder } from 'modules/database/interfaces/order';
import { Order } from 'modules/database/models/order';

import { OrderRepository } from '../repositories/order';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  public async save(model: IOrder): Promise<Order> {
    if (model.id) return this.update(model);

    return this.orderRepository.insert(model);
  }

  private async update(model: IOrder): Promise<Order> {
    const order = await this.orderRepository.findById(model.id);

    if (!order) throw new NotFoundException('not-found order');

    return this.orderRepository.update({ ...order, ...model });
  }
}
