import { Loyalty } from '../domain/loyalty.entity';
import { LoyaltyRepository } from '../domain/loyalty-repository.interface';

export interface GetLoyaltyUseCase {
  execute(id: string): Promise<Loyalty>;
}

export class GetLoyaltyUseCaseImpl implements GetLoyaltyUseCase {
  constructor(private readonly loyaltyRepository: LoyaltyRepository) {}

  async execute(id: string): Promise<Loyalty> {
    const loyalty = await this.loyaltyRepository.findById(id);
    if (!loyalty) {
      throw new Error('Loyalty account not found');
    }
    return loyalty;
  }
}
