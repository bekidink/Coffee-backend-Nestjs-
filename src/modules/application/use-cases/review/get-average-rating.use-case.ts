// src/application/use-cases/review/get-average-rating.use-case.ts
import { Injectable } from '@nestjs/common';
import { IReviewRepository } from '../../../domain/repositories/review.repository';

@Injectable()
export class GetAverageRatingUseCase {
  constructor(private reviewRepository: IReviewRepository) {}

  async execute(productId: string): Promise<number> {
    return this.reviewRepository.getAverageRating(productId);
  }
}
