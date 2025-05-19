// src/application/use-cases/review/update-review.use-case.ts
import { Injectable } from '@nestjs/common';
import { IReviewRepository } from '../../../domain/repositories/review.repository';
import { UpdateReviewDto } from '../../dtos/review.dto';
import { Review } from 'src/modules/domain/entities/review.entity';

@Injectable()
export class UpdateReviewUseCase {
  constructor(private reviewRepository: IReviewRepository) {}

  async execute(reviewId: string, dto: UpdateReviewDto): Promise<Review> {
    const review = await this.reviewRepository.findById(reviewId);
    if (!review) {
      throw new Error('Review not found');
    }

    review.update(dto);
    return this.reviewRepository.update(review);
  }
}
