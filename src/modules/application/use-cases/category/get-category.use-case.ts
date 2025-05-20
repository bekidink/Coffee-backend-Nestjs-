// src/application/use-cases/category/get-category.use-case.ts
import { Injectable } from '@nestjs/common';
import { ICategoryRepository } from '../../../domain/repositories/category.repository';
import { Category } from '../../../domain/entities/category.entity';

@Injectable()
export class GetCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(categoryId: string): Promise<Category> {
    const category = await this.categoryRepository.findById(categoryId);
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  }
}
