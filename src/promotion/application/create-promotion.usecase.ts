import { Promotion } from '../domain/promotion.entity';
import { PromotionRepository } from '../domain/promotion-repository.interface';

export interface CreatePromotionUseCase {
  execute(dto: {
    shopId: string;
    menuItemId?: string;
    title: string;
    description?: string;
    discountType: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'BOGO';
    discountValue: number;
    validFrom: Date;
    validUntil: Date;
  }): Promise<Promotion>;
}

export class CreatePromotionUseCaseImpl implements CreatePromotionUseCase {
  constructor(private readonly promotionRepository: PromotionRepository) {}

  async execute(dto: {
    shopId: string;
    menuItemId?: string;
    title: string;
    description?: string;
    discountType: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'BOGO';
    discountValue: number;
    validFrom: Date;
    validUntil: Date;
  }): Promise<Promotion> {
    if (dto.discountValue <= 0) {
      throw new Error('Discount value must be positive');
    }
    if (dto.discountType === 'PERCENTAGE' && dto.discountValue > 100) {
      throw new Error('Percentage discount cannot exceed 100%');
    }
    if (dto.validUntil <= dto.validFrom) {
      throw new Error('Valid until date must be after valid from date');
    }

    const promotion = new Promotion(
      require('uuid').v4(),
      dto.shopId,
      dto.menuItemId || null,
      dto.title,
      dto.description || null,
      dto.discountType,
      dto.discountValue,
      dto.validFrom,
      dto.validUntil,
      true,
      new Date(),
      new Date(),
    );

    await this.promotionRepository.save(promotion);
    return promotion;
  }
}
