// src/domain/repositorie/category.repository.ts
import { Category } from '../entities/category.entity';

export interface ICategoryRepository {
  save(category: Category): Promise<Category>;
  findById(id: string): Promise<Category | null>;
  findByName(name: string): Promise<Category | null>;
  findAll(): Promise<Category[]>;
  update(category: Category): Promise<Category>;
  delete(id: string): Promise<void>;
  hasProducts(id: string): Promise<boolean>;
  findChildren(id: string): Promise<Category[]>;
}
