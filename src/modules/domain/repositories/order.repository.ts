// src/domain/repositories/order.repository.ts
import { Order } from '../entities/order.entity';

export interface IOrderRepository {
  save(order: Order): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  findByCustomerId(customerId: string): Promise<Order[]>;
  findByShopId(shopId: string): Promise<Order[]>;
  findAll(): Promise<Order[]>;
  update(order: Order): Promise<Order>;
}
