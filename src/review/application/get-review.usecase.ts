import { Review } from '../domain/review.entity';
import { ReviewRepository } from '../domain/review-repository.interface';

export interface GetReviewUseCase {
  execute(id: string): Promise<Review>;
}

export class GetReviewUseCaseImpl implements GetReviewUseCase {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async execute(id: string): Promise<Review> {
    const review = await this.reviewRepository.findById(id);
    if (!review) {
      throw new Error('Review not found');
    }
    return review;
  }
}
