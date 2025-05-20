// src/application/dtos/promotion.dto.ts
export class CreatePromotionDto {
  code: string;
  type: 'PERCENTAGE' | 'FIXED' | 'BOGO';
  value: number;
  description: string;
  startDate: Date; // ISO date string
  endDate: string; // ISO date string
  minOrderAmount?: number;
  maxUses?: number;
  shopId?: string;
  productId?: string;
}

export class ApplyPromotionDto {
  code: string;
  orderId: string;
  customerId: string;
}
