import { Review } from './review.entity';

export interface ReviewRepository {
  findById(id: string): Promise<Review | null>;
  findByShopId(shopId: string): Promise<Review[]>;
  findByMenuItemId(menuItemId: string): Promise<Review[]>;
  findByUserAndShop(userId: string, shopId: string): Promise<Review | null>;
  save(review: Review): Promise<void>;
  update(review: Review): Promise<void>;
}
