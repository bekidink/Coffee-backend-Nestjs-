import { MenuItem } from './menu-item.entity';

export interface MenuItemRepository {
  findById(id: string): Promise<MenuItem | null>;
  findByShopId(shopId: string): Promise<MenuItem[]>;
  findByNameAndShop(name: string, shopId: string): Promise<MenuItem | null>;
  save(menuItem: MenuItem): Promise<void>;
  update(menuItem: MenuItem): Promise<void>;
}
