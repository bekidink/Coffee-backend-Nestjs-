// src/application/use-cases/review/list-reviews.use-case.ts
import { Injectable } from '@nestjs/common';
import { IReviewRepository } from '../../../domain/repositories/review.repository';
import { Review } from '../../../domain/entities/review.entity';

@Injectable()
export class ListReviewsUseCase {
  constructor(private reviewRepository: IReviewRepository) {}

  async execute(filters?: {
    customerId?: string;
    productId?: string;
  }): Promise<Review[]> {
    if (filters?.customerId) {
      return this.reviewRepository.findByCustomerId(filters.customerId);
    }
    if (filters?.productId) {
      return this.reviewRepository.findByProductId(filters.productId);
    }
    return this.reviewRepository.findAll();
  }
}
