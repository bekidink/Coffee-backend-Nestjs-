// src/domain/entities/shop.entity.ts
import { v4 as uuidv4 } from 'uuid';

export class Shop {
  addresses: any;
  private constructor(
    public readonly id: string,
    public name: string,
    public vendorId: string,
    public description: string | null,
    public imageUrl: string | null,
    public readonly createdAt: Date,
    public updatedAt: Date,
    public averageRating: number,
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.name || this.name.trim().length === 0) {
      throw new Error('Shop name is required');
    }
    if (!this.vendorId) {
      throw new Error('Vendor ID is required');
    }
    if (this.averageRating < 0) {
      throw new Error('Average rating cannot be negative');
    }
  }

  static create(data: {
    id?: string;
    name: string;
    vendorId: string;
    description?: string;
    imageUrl?: string;
    averageRating?: number;
  }): Shop {
    return new Shop(
      data.id || uuidv4(),
      data.name,
      data.vendorId,
      data.description || null,
      data.imageUrl || null,
      new Date(),
      new Date(),
      data.averageRating || 0,
    );
  }

  update(
    data: Partial<{
      name: string;
      description: string | null;
      imageUrl: string | null;
      averageRating: number;
    }>,
  ): void {
    if (data.name) this.name = data.name;
    if (data.description !== undefined) this.description = data.description;
    if (data.imageUrl !== undefined) this.imageUrl = data.imageUrl;
    if (data.averageRating !== undefined)
      this.averageRating = data.averageRating;
    this.updatedAt = new Date();
    this.validate();
  }
}
