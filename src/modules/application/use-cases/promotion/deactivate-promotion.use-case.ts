// src/application/use-cases/promotion/deactivate-promotion.use-case.ts
import { Injectable } from '@nestjs/common';
import { IPromotionRepository } from '../../../domain/repositories/promotion.repository';
import { IShopRepository } from '../../../domain/repositories/shop.repository';
import { Promotion } from 'src/modules/domain/entities/promotion.entity';

@Injectable()
export class DeactivatePromotionUseCase {
  constructor(
    private promotionRepository: IPromotionRepository,
    private shopRepository: IShopRepository,
  ) {}

  async execute(
    promotionId: string,
    requesterId: string,
    requesterRole: 'VENDOR' | 'ADMIN',
  ): Promise<Promotion> {
    const promotion = await this.promotionRepository.findById(promotionId);
    if (!promotion) {
      throw new Error('Promotion not found');
    }

    if (promotion.shopId && requesterRole === 'VENDOR') {
      const shop = await this.shopRepository.findById(promotion.shopId);
      if (shop?.vendorId !== requesterId) {
        throw new Error(
          'Vendors can only deactivate promotions for their shops',
        );
      }
    }

    promotion.deactivate();
    return this.promotionRepository.update(promotion);
  }
}
