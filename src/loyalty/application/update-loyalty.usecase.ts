import { Loyalty } from '../domain/loyalty.entity';
import { LoyaltyRepository } from '../domain/loyalty-repository.interface';

export interface UpdateLoyaltyUseCase {
  execute(
    id: string,
    dto: { pointsToAdd?: number; pointsToRedeem?: number },
  ): Promise<Loyalty>;
}

export class UpdateLoyaltyUseCaseImpl implements UpdateLoyaltyUseCase {
  constructor(private readonly loyaltyRepository: LoyaltyRepository) {}

  async execute(
    id: string,
    dto: { pointsToAdd?: number; pointsToRedeem?: number },
  ): Promise<Loyalty> {
    const loyalty = await this.loyaltyRepository.findById(id);
    if (!loyalty) {
      throw new Error('Loyalty account not found');
    }

    if (dto.pointsToAdd !== undefined) {
      if (dto.pointsToAdd < 0) {
        throw new Error('Points to add must be non-negative');
      }
      loyalty.points += dto.pointsToAdd;
    }

    if (dto.pointsToRedeem !== undefined) {
      if (dto.pointsToRedeem < 0) {
        throw new Error('Points to redeem must be non-negative');
      }
      if (dto.pointsToRedeem > loyalty.points) {
        throw new Error('Insufficient points for redemption');
      }
      loyalty.points -= dto.pointsToRedeem;
    }

    loyalty.updatedAt = new Date();
    await this.loyaltyRepository.update(loyalty);
    return loyalty;
  }
}
