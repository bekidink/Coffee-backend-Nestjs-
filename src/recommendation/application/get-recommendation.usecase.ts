import { Recommendation } from '../domain/recommendation.entity';
import { RecommendationRepository } from '../domain/recommendation-repository.interface';

export interface GetRecommendationUseCase {
  execute(userId: string): Promise<Recommendation[]>;
}

export class GetRecommendationUseCaseImpl implements GetRecommendationUseCase {
  constructor(
    private readonly recommendationRepository: RecommendationRepository,
  ) {}

  async execute(userId: string): Promise<Recommendation[]> {
    const recommendations =
      await this.recommendationRepository.findRecommendationsByUserId(userId);
    if (!recommendations.length) {
      throw new Error('No recommendations found for this user');
    }
    return recommendations;
  }
}
