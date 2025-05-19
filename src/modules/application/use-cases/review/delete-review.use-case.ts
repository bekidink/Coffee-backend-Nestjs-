// src/application/use-cases/review/delete-review.use-case.ts
import { Injectable } from '@nestjs/common';
import { IReviewRepository } from '../../../domain/repositories/review.repository';

@Injectable()
export class DeleteReviewUseCase {
  constructor(private reviewRepository: IReviewRepository) {}

  async execute(reviewId: string): Promise<void> {
    const review = await this.reviewRepository.findById(reviewId);
    if (!review) {
      throw new Error('Review not found');
    }

    await this.reviewRepository.delete(reviewId);
  }
}
