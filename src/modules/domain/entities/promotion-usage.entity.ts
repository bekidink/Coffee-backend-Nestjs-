import { v4 as uuidv4 } from 'uuid';

export class PromotionUsage {
  private constructor(
    public readonly id: string,
    public promotionId: string,
    public customerId: string,
    public orderId: string,
    public usedAt: Date,
  ) {}

  static create(data: {
    id?: string;
    promotionId: string;
    customerId: string;
    orderId: string;
  }): PromotionUsage {
    return new PromotionUsage(
      data.id || uuidv4(),
      data.promotionId,
      data.customerId,
      data.orderId,
      new Date(),
    );
  }
}
