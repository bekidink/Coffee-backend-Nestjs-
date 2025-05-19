// src/application/use-cases/product/update-product.use-case.ts
import { Injectable } from '@nestjs/common';
import { IProductRepository } from '../../../domain/repositories/product.repository';
import { ICategoryRepository } from '../../../domain/repositories/category.repository';
import { UpdateProductDto } from '../../dtos/product.dto';
import { Product } from 'src/modules/domain/entities/product.entity';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    private productRepository: IProductRepository,
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute(productId: string, dto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    if (dto.categoryId) {
      const category = await this.categoryRepository.findById(dto.categoryId);
      if (!category) {
        throw new Error('Category not found');
      }
    }

    product.update(dto);
    return this.productRepository.update(product);
  }
}
