import { Review } from '../domain/review.entity';
import { ReviewRepository } from '../domain/review-repository.interface';

export interface UpdateReviewUseCase {
  execute(
    id: string,
    dto: {
      rating?: number;
      comment?: string;
    },
  ): Promise<Review>;
}

export class UpdateReviewUseCaseImpl implements UpdateReviewUseCase {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async execute(
    id: string,
    dto: {
      rating?: number;
      comment?: string;
    },
  ): Promise<Review> {
    const review = await this.reviewRepository.findById(id);
    if (!review) {
      throw new Error('Review not found');
    }

    if (dto.rating !== undefined) {
      if (dto.rating < 1 || dto.rating > 5) {
        throw new Error('Rating must be between 1 and 5');
      }
      review.rating = dto.rating;
    }

    review.comment = dto.comment !== undefined ? dto.comment : review.comment;
    review.updatedAt = new Date();

    await this.reviewRepository.update(review);
    return review;
  }
}
