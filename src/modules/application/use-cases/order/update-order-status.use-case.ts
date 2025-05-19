// src/application/use-cases/order/update-order-status.use-case.ts
import { Injectable } from '@nestjs/common';
import { IOrderRepository } from '../../../domain/repositories/order.repository';
import { UpdateOrderStatusDto } from '../../dtos/order.dto';
import { Order } from 'src/modules/domain/entities/order.entity';

@Injectable()
export class UpdateOrderStatusUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(dto: UpdateOrderStatusDto): Promise<Order> {
    const order = await this.orderRepository.findById(dto.orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    order.updateStatus(dto.status);
    return this.orderRepository.update(order);
  }
}
