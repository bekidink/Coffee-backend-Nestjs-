import { Order } from './order.entity';

export interface OrderRepository {
  findById(id: string): Promise<Order | null>;
  findByUserId(userId: string): Promise<Order[]>;
  findByShopId(shopId: string): Promise<Order[]>;
  save(order: Order): Promise<void>;
  update(order: Order): Promise<void>;
}
