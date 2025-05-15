import { Delivery } from './delivery.entity';

export interface DeliveryRepository {
  findById(id: string): Promise<Delivery | null>;
  findByOrderId(orderId: string): Promise<Delivery | null>;
  findByShopId(shopId: string): Promise<Delivery[]>;
  save(delivery: Delivery): Promise<void>;
  update(delivery: Delivery): Promise<void>;
}
