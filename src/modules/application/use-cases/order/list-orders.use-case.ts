// src/application/use-cases/order/list-orders.use-case.ts
import { Injectable } from '@nestjs/common';
import { IOrderRepository } from '../../../domain/repositories/order.repository';
import { Order } from '../../../domain/entities/order.entity';

@Injectable()
export class ListOrdersUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(filters?: {
    customerId?: string;
    shopId?: string;
  }): Promise<Order[]> {
    if (filters?.customerId) {
      return this.orderRepository.findByCustomerId(filters.customerId);
    }
    if (filters?.shopId) {
      return this.orderRepository.findByShopId(filters.shopId);
    }
    return this.orderRepository.findAll();
  }
}
