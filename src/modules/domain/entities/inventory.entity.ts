// src/domain/entities/inventory.entity.ts
import { v4 as uuidv4 } from 'uuid';

export class Inventory {
  private constructor(
    public readonly id: string,
    public productId: string,
    public shopId: string,
    public stock: number,
    public lastUpdated: Date,
  ) {}

  static create(data: {
    id?: string;
    productId: string;
    shopId: string;
    stock: number;
  }): Inventory {
    return new Inventory(
      data.id || uuidv4(),
      data.productId,
      data.shopId,
      data.stock,
      new Date(),
    );
  }

  updateStock(stock: number): void {
    if (stock < 0) {
      throw new Error('Stock cannot be negative');
    }
    this.stock = stock;
    this.lastUpdated = new Date();
  }

  reduceStock(quantity: number): void {
    if (this.stock < quantity) {
      throw new Error('Insufficient stock');
    }
    this.stock -= quantity;
    this.lastUpdated = new Date();
  }
}
