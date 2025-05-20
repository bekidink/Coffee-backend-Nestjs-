// src/application/use-cases/category/create-category.use-case.ts
import { Injectable } from '@nestjs/common';
import { ICategoryRepository } from '../../../domain/repositories/category.repository';
import { Category } from '../../../domain/entities/category.entity';
import { CreateCategoryDto } from '../../../application/dtos/category.dto';

@Injectable()
export class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(dto: CreateCategoryDto): Promise<Category> {
    // Check for duplicate name
    const existingCategory = await this.categoryRepository.findByName(dto.name);
    if (existingCategory) {
      throw new Error('Category name already exists');
    }

    // Validate parent category if provided
    if (dto.parentId) {
      const parentCategory = await this.categoryRepository.findById(
        dto.parentId,
      );
      if (!parentCategory) {
        throw new Error('Parent category not found');
      }
    }

    const category = Category.create({
      name: dto.name,
      description: dto.description,
      parentId: dto.parentId,
    });

    return this.categoryRepository.save(category);
  }
}
