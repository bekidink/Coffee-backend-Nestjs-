// src/application/dtos/review.dto.ts
export class CreateReviewDto {
  customerId: string;
  productId: string;
  rating: number;
  comment?: string;
}

export class UpdateReviewDto {
  rating?: number;
  comment?: string;
}
