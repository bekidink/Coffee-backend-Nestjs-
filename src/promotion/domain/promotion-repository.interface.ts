import { Promotion } from './promotion.entity';

export interface PromotionRepository {
  findById(id: string): Promise<Promotion | null>;
  findByShopId(shopId: string): Promise<Promotion[]>;
  findByMenuItemId(menuItemId: string): Promise<Promotion[]>;
  save(promotion: Promotion): Promise<void>;
  update(promotion: Promotion): Promise<void>;
}
