import { Review } from '../domain/review.entity';
import { ReviewRepository } from '../domain/review-repository.interface';

export interface CreateReviewUseCase {
  execute(dto: {
    userId: string;
    shopId: string;
    menuItemId?: string;
    rating: number;
    comment?: string;
  }): Promise<Review>;
}

export class CreateReviewUseCaseImpl implements CreateReviewUseCase {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async execute(dto: {
    userId: string;
    shopId: string;
    menuItemId?: string;
    rating: number;
    comment?: string;
  }): Promise<Review> {
    if (dto.rating < 1 || dto.rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }

    const existingReview = await this.reviewRepository.findByUserAndShop(
      dto.userId,
      dto.shopId,
    );
    if (existingReview && !dto.menuItemId) {
      throw new Error('User has already reviewed this shop');
    }

    const review = new Review(
      require('uuid').v4(),
      dto.userId,
      dto.shopId,
      dto.menuItemId || null,
      dto.rating,
      dto.comment || null,
      new Date(),
      new Date(),
    );

    await this.reviewRepository.save(review);
    return review;
  }
}
