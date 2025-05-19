// src/domain/entities/category.entity.ts
import { v4 as uuidv4 } from 'uuid';

export class Category {
  private constructor(
    public readonly id: string,
    public name: string,
    public description: string | null,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(data: {
    id?: string;
    name: string;
    description?: string;
  }): Category {
    return new Category(
      data.id || uuidv4(),
      data.name,
      data.description || null,
      new Date(),
      new Date(),
    );
  }
}
