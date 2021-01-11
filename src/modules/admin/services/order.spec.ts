import { IOrder } from 'modules/database/interfaces/order';

import { OrderRepository } from '../repositories/order';
import { OrderService } from './order';

/* eslint-disable max-len */
describe('Admin/OrderService', () => {
  let orderRepository: OrderRepository;
  let orderService: OrderService;

  const newOrder: IOrder = {
    userId: 1,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean finibus velit eget leo scelerisque, efficitur dapibus turpis sodales.',
    amount: 14,
    value: 9.99
  };

  beforeEach(async () => {
    orderRepository = new OrderRepository();
    orderService = new OrderService(orderRepository);
  });

  it('should create a new order', async () => {
    jest.spyOn(orderRepository, 'insert').mockImplementationOnce(newOrder => Promise.resolve({ ...newOrder } as any));

    const result = await orderService.save(newOrder);

    expect(result).not.toBeFalsy();
    expect(result).toEqual(newOrder);
  });

  it('should update a order', async () => {
    jest.spyOn(orderRepository, 'update').mockImplementationOnce(newOrder => Promise.resolve({ ...newOrder } as any));
    jest.spyOn(orderRepository, 'findById').mockResolvedValueOnce({ id: () => 1 } as any);

    const result = await orderService.save({ id: 1, ...newOrder });

    expect(result).not.toBeFalsy();
    expect(result).toEqual({ id: 1, ...newOrder });
  });

  it('should remove a order', async () => {
    jest.spyOn(orderRepository, 'remove').mockResolvedValueOnce({ id: 2 } as any);

    await orderRepository.remove(2, { id: 1 } as any);
  });
});
