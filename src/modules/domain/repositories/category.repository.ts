// src/domain/repositories/category.repository.ts
import { Category } from '../entities/category.entity';

export interface ICategoryRepository {
  findById(id: string): Promise<Category | null>;
}
