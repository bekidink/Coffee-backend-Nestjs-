// src/domain/entities/review.entity.ts
import { v4 as uuidv4 } from 'uuid';

export class Review {
  private constructor(
    public readonly id: string,
    public customerId: string,
    public productId: string,
    public rating: number,
    public comment: string | null,
    public createdAt: Date,
    public updatedAt: Date,
  ) {
    this.validateRating(rating);
  }

  private validateRating(rating: number): void {
    if (rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }
  }

  static create(data: {
    id?: string;
    customerId: string;
    productId: string;
    rating: number;
    comment?: string;
  }): Review {
    return new Review(
      data.id || uuidv4(),
      data.customerId,
      data.productId,
      data.rating,
      data.comment || null,
      new Date(),
      new Date(),
    );
  }

  update(
    data: Partial<{
      rating: number;
      comment: string;
    }>,
  ): void {
    if (data.rating !== undefined) {
      this.validateRating(data.rating);
      this.rating = data.rating;
    }
    if (data.comment !== undefined) this.comment = data.comment;
    this.updatedAt = new Date();
  }
}
