// src/application/use-cases/product/create-product.use-case.ts
import { Injectable } from '@nestjs/common';
import { IProductRepository } from '../../../domain/repositories/product.repository';
import { ICategoryRepository } from '../../../domain/repositories/category.repository';
import { IVendorRepository } from '../../../domain/repositories/vendor.repository';
import { IShopRepository } from '../../../domain/repositories/shop.repository';
import { Product } from '../../../domain/entities/product.entity';
import { CreateProductDto } from '../../dtos/product.dto';

@Injectable()
export class CreateProductUseCase {
  constructor(
    private productRepository: IProductRepository,
    private categoryRepository: ICategoryRepository,
    private vendorRepository: IVendorRepository,
    private shopRepository: IShopRepository,
  ) {}

  async execute(dto: CreateProductDto): Promise<Product> {
    const vendor = await this.vendorRepository.findById(dto.vendorId);
    if (!vendor || vendor.status !== 'ACTIVE') {
      throw new Error('Valid vendor required');
    }

    const category = await this.categoryRepository.findById(dto.categoryId);
    if (!category) {
      throw new Error('Category not found');
    }

    const shop = await this.shopRepository.findById(dto.shopId);
    if (!shop || shop.vendorId !== dto.vendorId || shop.status !== 'ACTIVE') {
      throw new Error('Valid shop required');
    }

    const product = Product.create(dto);
    const savedProduct = await this.productRepository.save(product);
    await this.productRepository.assignToShop(savedProduct.id, dto.shopId);
    return savedProduct;
  }
}
