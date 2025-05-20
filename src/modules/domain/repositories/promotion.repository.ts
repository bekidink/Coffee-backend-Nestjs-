// src/domain/repositories/promotion.repository.ts
import { Promotion } from '../entities/promotion.entity';
import { PromotionUsage } from '../entities/promotion-usage.entity';

export interface IPromotionRepository {
  save(promotion: Promotion): Promise<Promotion>;
  findById(id: string): Promise<Promotion | null>;
  findByCode(code: string): Promise<Promotion | null>;
  findByShopId(shopId: string): Promise<Promotion[]>;
  update(promotion: Promotion): Promise<Promotion>;
  saveUsage(usage: PromotionUsage): Promise<PromotionUsage>;
  countUsages(promotionId: string): Promise<number>;
  hasCustomerUsedPromotion(
    promotionId: string,
    customerId: string,
  ): Promise<boolean>;
}
