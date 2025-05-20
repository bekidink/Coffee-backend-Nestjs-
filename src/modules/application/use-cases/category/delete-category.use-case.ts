// src/application/use-cases/category/delete-category.use-case.ts
import { Injectable } from '@nestjs/common';
import { ICategoryRepository } from '../../../domain/repositories/category.repository';
import { IProductRepository } from '../../../domain/repositories/product.repository';

@Injectable()
export class DeleteCategoryUseCase {
  constructor(
    private categoryRepository: ICategoryRepository,
    private productRepository: IProductRepository,
  ) {}

  async execute(categoryId: string): Promise<void> {
    const category = await this.categoryRepository.findById(categoryId);
    if (!category) {
      throw new Error('Category not found');
    }

    // Check if category has associated products
    const hasProducts = await this.categoryRepository.hasProducts(categoryId);
    if (hasProducts) {
      throw new Error('Cannot delete category with associated products');
    }

    // Check if category has children
    const children = await this.categoryRepository.findChildren(categoryId);
    if (children.length > 0) {
      throw new Error('Cannot delete category with subcategories');
    }

    await this.categoryRepository.delete(categoryId);
  }
}
