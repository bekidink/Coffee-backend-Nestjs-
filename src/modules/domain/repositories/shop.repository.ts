// src/domain/repositories/shop.repository.ts
import { Shop } from '../entities/shop.entity';

export interface IShopRepository {
  save(shop: Shop): Promise<Shop>;
  findById(id: string): Promise<Shop | null>;
  findByVendorId(vendorId: string): Promise<Shop[]>;
  findAll(): Promise<Shop[]>;
  update(shop: Shop): Promise<Shop>;
}
