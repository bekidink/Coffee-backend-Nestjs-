// src/application/use-cases/category/list-categories.use-case.ts
import { Injectable } from '@nestjs/common';
import { ICategoryRepository } from '../../../domain/repositories/category.repository';
import { Category } from '../../../domain/entities/category.entity';

@Injectable()
export class ListCategoriesUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }
}
