// src/application/use-cases/product/list-products.use-case.ts
import { Injectable } from '@nestjs/common';
import { IProductRepository } from '../../../domain/repositories/product.repository';
import { Product } from '../../../domain/entities/product.entity';

@Injectable()
export class ListProductsUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(filters?: {
    shopId?: string;
    vendorId?: string;
    categoryId?: string;
  }): Promise<Product[]> {
    if (filters?.shopId) {
      return this.productRepository.findByShopId(filters.shopId);
    }
    if (filters?.vendorId) {
      return this.productRepository.findByVendorId(filters.vendorId);
    }
    if (filters?.categoryId) {
      return this.productRepository.findByCategoryId(filters.categoryId);
    }
    return this.productRepository.findAll();
  }
}
