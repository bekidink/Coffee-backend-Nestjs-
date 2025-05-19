// src/application/use-cases/order/cancel-order.use-case.ts
import { Injectable } from '@nestjs/common';
import { IOrderRepository } from '../../../domain/repositories/order.repository';
import { CancelOrderDto } from '../../dtos/order.dto';
import { Order } from 'src/modules/domain/entities/order.entity';

@Injectable()
export class CancelOrderUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(dto: CancelOrderDto): Promise<Order> {
    const order = await this.orderRepository.findById(dto.orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    if (order.status === 'SHIPPED' || order.status === 'DELIVERED') {
      throw new Error('Cannot cancel shipped or delivered order');
    }

    order.updateStatus('CANCELLED');
    return this.orderRepository.update(order);
  }
}
