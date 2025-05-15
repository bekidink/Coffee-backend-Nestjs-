import { Inventory } from './inventory.entity';

export interface InventoryRepository {
  findById(id: string): Promise<Inventory | null>;
  findByShopId(shopId: string): Promise<Inventory[]>;
  findByMenuItemId(menuItemId: string): Promise<Inventory | null>;
  save(inventory: Inventory): Promise<void>;
  update(inventory: Inventory): Promise<void>;
}
