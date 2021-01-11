import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequired, CurrentUser } from 'modules/common/guards/token';
import { enRoles } from 'modules/database/interfaces/user';
import { ICurrentUser } from 'modules/common/interfaces/currentUser';

import { Order } from '../../database/models/order';
import { OrderRepository } from '../repositories/order';
import { ListOrderValidator } from '../validators/order/list';
import { SaveOrderValidator } from '../validators/order/save';

import { OrderService } from '../services/order';

@ApiTags('Admin: Order')
@Controller('/order')
@AuthRequired([enRoles.admin])
export class OrderController {
  constructor(private orderRepository: OrderRepository, private orderService: OrderService) {}

  @Get()
  @ApiResponse({ status: 200, type: [Order] })
  public async list(@Query() model: ListOrderValidator, @CurrentUser() currentUser: ICurrentUser) {
    return this.orderRepository.list(model, currentUser.id);
  }

  @Post()
  @ApiResponse({ status: 200, type: Order })
  public async create(@Body() model: SaveOrderValidator): Promise<any> {
    return this.orderService.save(model);
  }

  @Delete(':orderId')
  @ApiResponse({ status: 200 })
  public async delete(@Param('orderId', ParseIntPipe) orderId: number): Promise<void> {
    return this.orderRepository.remove(orderId);
  }
}
