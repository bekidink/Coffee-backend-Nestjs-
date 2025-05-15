import { Promotion } from '../domain/promotion.entity';
import { PromotionRepository } from '../domain/promotion-repository.interface';

export interface UpdatePromotionUseCase {
  execute(
    id: string,
    dto: {
      title?: string;
      description?: string;
      discountType?: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'BOGO';
      discountValue?: number;
      validFrom?: Date;
      validUntil?: Date;
      isActive?: boolean;
    },
  ): Promise<Promotion>;
}

export class UpdatePromotionUseCaseImpl implements UpdatePromotionUseCase {
  constructor(private readonly promotionRepository: PromotionRepository) {}

  async execute(
    id: string,
    dto: {
      title?: string;
      description?: string;
      discountType?: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'BOGO';
      discountValue?: number;
      validFrom?: Date;
      validUntil?: Date;
      isActive?: boolean;
    },
  ): Promise<Promotion> {
    const promotion = await this.promotionRepository.findById(id);
    if (!promotion) {
      throw new Error('Promotion not found');
    }

    if (dto.discountValue !== undefined) {
      if (dto.discountValue <= 0) {
        throw new Error('Discount value must be positive');
      }
      if (
        (dto.discountType || promotion.discountType) === 'PERCENTAGE' &&
        dto.discountValue > 100
      ) {
        throw new Error('Percentage discount cannot exceed 100%');
      }
      promotion.discountValue = dto.discountValue;
    }

    if (dto.validFrom && dto.validUntil && dto.validUntil <= dto.validFrom) {
      throw new Error('Valid until date must be after valid from date');
    }

    promotion.title = dto.title || promotion.title;
    promotion.description =
      dto.description !== undefined ? dto.description : promotion.description;
    promotion.discountType = dto.discountType || promotion.discountType;
    promotion.validFrom = dto.validFrom || promotion.validFrom;
    promotion.validUntil = dto.validUntil || promotion.validUntil;
    promotion.isActive =
      dto.isActive !== undefined ? dto.isActive : promotion.isActive;
    promotion.updatedAt = new Date();

    await this.promotionRepository.update(promotion);
    return promotion;
  }
}
