import { Promotion } from '../domain/promotion.entity';
import { PromotionRepository } from '../domain/promotion-repository.interface';

export interface GetPromotionUseCase {
  execute(id: string): Promise<Promotion>;
}

export class GetPromotionUseCaseImpl implements GetPromotionUseCase {
  constructor(private readonly promotionRepository: PromotionRepository) {}

  async execute(id: string): Promise<Promotion> {
    const promotion = await this.promotionRepository.findById(id);
    if (!promotion) {
      throw new Error('Promotion not found');
    }
    return promotion;
  }
}
