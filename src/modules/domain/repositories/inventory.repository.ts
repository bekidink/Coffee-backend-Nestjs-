// src/domain/repositories/inventory.repository.ts
import { Inventory } from '../entities/inventory.entity';

export interface IInventoryRepository {
  save(inventory: Inventory): Promise<Inventory>;
  findById(id: string): Promise<Inventory | null>;
  findByProductAndShop(
    productId: string,
    shopId: string,
  ): Promise<Inventory | null>;
  findByShopId(shopId: string): Promise<Inventory[]>;
  findAll(): Promise<Inventory[]>;
  update(inventory: Inventory): Promise<Inventory>;
}
