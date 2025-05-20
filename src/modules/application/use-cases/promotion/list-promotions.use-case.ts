// src/application/use-cases/promotion/list-promotions.use-case.ts
import { Injectable } from '@nestjs/common';
import { IPromotionRepository } from '../../../domain/repositories/promotion.repository';
import { Promotion } from '../../../domain/entities/promotion.entity';

@Injectable()
export class ListPromotionsUseCase {
  constructor(private promotionRepository: IPromotionRepository) {}

  async execute(filters?: {
    shopId?: string;
    activeOnly?: boolean;
  }): Promise<Promotion[]> {
    if (filters?.shopId) {
      return this.promotionRepository.findByShopId(filters.shopId);
    }
    // Note: Implement findAll with filters if needed
    return this.promotionRepository.findByShopId(''); // Placeholder for platform-wide promotions
  }
}
