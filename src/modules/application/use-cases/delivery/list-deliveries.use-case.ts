// src/application/use-cases/delivery/list-deliveries.use-case.ts
import { Injectable } from '@nestjs/common';
import { IDeliveryRepository } from '../../../domain/repositories/delivery.repository';
import { Delivery } from '../../../domain/entities/delivery.entity';

@Injectable()
export class ListDeliveriesUseCase {
  constructor(private deliveryRepository: IDeliveryRepository) {}

  async execute(filters?: {
    orderId?: string;
    customerId?: string;
    shopId?: string;
  }): Promise<Delivery[]> {
    if (filters?.orderId) {
      const delivery = await this.deliveryRepository.findByOrderId(
        filters.orderId,
      );
      return delivery ? [delivery] : [];
    }
    if (filters?.customerId) {
      return this.deliveryRepository.findByCustomerId(filters.customerId);
    }
    if (filters?.shopId) {
      return this.deliveryRepository.findByShopId(filters.shopId);
    }
    return []; // Optionally, implement findAll if needed
  }
}
