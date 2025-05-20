// src/domain/entities/category.entity.ts
import { v4 as uuidv4 } from 'uuid';

export class Category {
  private constructor(
    public readonly id: string,
    public name: string,
    public description: string | null,
    public imageUrl: string | null,
    public parentId: string | null,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.name || this.name.trim().length === 0) {
      throw new Error('Category name is required');
    }
  }

  static create(data: {
    id?: string;
    name: string;
    description?: string;
    imageUrl?: string;
    parentId?: string;
  }): Category {
    return new Category(
      data.id || uuidv4(),
      data.name,
      data.description || null,
      data.imageUrl || null,
      data.parentId || null,
      new Date(),
      new Date(),
    );
  }

  update(
    data: Partial<{
      name: string;
      description: string | null;
      imageUrl: string | null;
      parentId: string | null;
    }>,
  ): void {
    if (data.name) this.name = data.name;
    if (data.description !== undefined) this.description = data.description;
    if (data.imageUrl !== undefined) this.imageUrl = data.imageUrl;
    if (data.parentId !== undefined) this.parentId = data.parentId;
    this.updatedAt = new Date();
    this.validate();
  }
}
