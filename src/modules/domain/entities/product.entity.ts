// src/domain/entities/product.entity.ts
import { v4 as uuidv4 } from 'uuid';

export class Product {
  private constructor(
    public readonly id: string,
    public name: string,
    public shopId: string,
    public thumbnailUrl: string,
    public imageUrls: string[],
    public description: string | null,
    public price: number,
    public categoryId: string,
    public vendorId: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(data: {
    id?: string;
    name: string;
    shopId: string;
    thumbnailUrl: string;
    imageUrls: string[];
    description?: string;
    price: number;
    categoryId: string;
    vendorId: string;
  }): Product {
    return new Product(
      data.id || uuidv4(),
      data.name,
      data.shopId,
      data.thumbnailUrl,
      data.imageUrls,
      data.description || null,
      data.price,
      data.categoryId,
      data.vendorId,
      new Date(),
      new Date(),
    );
  }

  update(
    data: Partial<{
      name: string;
      shopId: string;
      description: string;
      price: number;
      categoryId: string;
    }>,
  ): void {
    if (data.name) this.name = data.name;
    if (data.shopId) this.shopId = data.shopId;
    if (data.description !== undefined) this.description = data.description;
    if (data.price !== undefined) this.price = data.price;
    if (data.categoryId) this.categoryId = data.categoryId;
    this.updatedAt = new Date();
  }
}
