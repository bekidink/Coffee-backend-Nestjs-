import { Loyalty } from '../domain/loyalty.entity';
import { LoyaltyRepository } from '../domain/loyalty-repository.interface';

export interface CreateLoyaltyUseCase {
  execute(dto: { userId: string }): Promise<Loyalty>;
}

export class CreateLoyaltyUseCaseImpl implements CreateLoyaltyUseCase {
  constructor(private readonly loyaltyRepository: LoyaltyRepository) {}

  async execute(dto: { userId: string }): Promise<Loyalty> {
    const existingLoyalty = await this.loyaltyRepository.findByUserId(
      dto.userId,
    );
    if (existingLoyalty) {
      throw new Error('Loyalty account already exists for this user');
    }

    const loyalty = new Loyalty(
      require('uuid').v4(),
      dto.userId,
      0,
      new Date(),
      new Date(),
    );

    await this.loyaltyRepository.save(loyalty);
    return loyalty;
  }
}
