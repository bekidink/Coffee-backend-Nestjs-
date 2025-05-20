// src/domain/repositories/delivery.repository.ts
import { Delivery } from '../entities/delivery.entity';

export interface IDeliveryRepository {
  save(delivery: Delivery): Promise<Delivery>;
  findById(id: string): Promise<Delivery | null>;
  findByOrderId(orderId: string): Promise<Delivery | null>;
  findByCustomerId(customerId: string): Promise<Delivery[]>;
  findByShopId(shopId: string): Promise<Delivery[]>;
  update(delivery: Delivery): Promise<Delivery>;
}
