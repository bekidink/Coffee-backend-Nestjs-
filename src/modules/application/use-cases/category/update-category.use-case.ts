// src/application/use-cases/category/update-category.use-case.ts
import { Injectable } from '@nestjs/common';
import { ICategoryRepository } from '../../../domain/repositories/category.repository';
import { UpdateCategoryDto } from '../../dtos/category.dto';
import { Category } from 'src/modules/domain/entities/category.entity';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(categoryId: string, dto: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoryRepository.findById(categoryId);
    if (!category) {
      throw new Error('Category not found');
    }

    // Check for duplicate name if updated
    if (dto.name && dto.name !== category.name) {
      const existingCategory = await this.categoryRepository.findByName(
        dto.name,
      );
      if (existingCategory) {
        throw new Error('Category name already exists');
      }
    }

    // Validate parent category if provided
    if (dto.parentId && dto.parentId !== category.parentId) {
      const parentCategory = await this.categoryRepository.findById(
        dto.parentId,
      );
      if (!parentCategory) {
        throw new Error('Parent category not found');
      }
      // Prevent circular references
      if (dto.parentId === categoryId) {
        throw new Error('Category cannot be its own parent');
      }
      const children = await this.categoryRepository.findChildren(categoryId);
      if (children.some((child) => child.id === dto.parentId)) {
        throw new Error('Parent category cannot be a child of this category');
      }
    }

    category.update(dto);
    return this.categoryRepository.update(category);
  }
}
