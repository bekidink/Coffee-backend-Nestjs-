// src/domain/entities/promotion.entity.ts
import { v4 as uuidv4 } from 'uuid';

export class Promotion {
  private constructor(
    public readonly id: string,
    public code: string,
    public type: 'PERCENTAGE' | 'FIXED' | 'BOGO',
    public value: number,
    public description: string,
    public startDate: Date,
    public endDate: Date,
    public minOrderAmount: number | null,
    public maxUses: number | null,
    public shopId: string | null,
    public productId: string | null,
    public isActive: boolean,
    public createdAt: Date,
    public updatedAt: Date,
  ) {
    this.validate();
  }

  private validate(): void {
    if (this.endDate <= this.startDate) {
      throw new Error('End date must be after start date');
    }
    if (this.type === 'PERCENTAGE' && (this.value <= 0 || this.value > 100)) {
      throw new Error('Percentage discount must be between 1 and 100');
    }
    if (this.type === 'FIXED' && this.value <= 0) {
      throw new Error('Fixed discount must be positive');
    }
    if (this.type === 'BOGO' && this.value !== 1) {
      throw new Error('BOGO discount value must be 1 (one free item)');
    }
  }

  static create(data: {
    id?: string;
    code: string;
    type: 'PERCENTAGE' | 'FIXED' | 'BOGO';
    value: number;
    description: string;
    startDate: Date;
    endDate: Date;
    minOrderAmount?: number;
    maxUses?: number;
    shopId?: string;
    productId?: string;
  }): Promotion {
    return new Promotion(
      data.id || uuidv4(),
      data.code.toUpperCase(),
      data.type,
      data.value,
      data.description,
      data.startDate,
      data.endDate,
      data.minOrderAmount || null,
      data.maxUses || null,
      data.shopId || null,
      data.productId || null,
      true,
      new Date(),
      new Date(),
    );
  }

  deactivate(): void {
    this.isActive = false;
    this.updatedAt = new Date();
  }
}
