// src/domain/repositories/review.repository.ts
import { Review } from '../entities/review.entity';

export interface IReviewRepository {
  save(review: Review): Promise<Review>;
  findById(id: string): Promise<Review | null>;
  findByCustomerId(customerId: string): Promise<Review[]>;
  findByProductId(productId: string): Promise<Review[]>;
  findAll(): Promise<Review[]>;
  update(review: Review): Promise<Review>;
  delete(id: string): Promise<void>;
  getAverageRating(productId: string): Promise<number>;
}
