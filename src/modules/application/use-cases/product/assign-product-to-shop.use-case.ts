// src/application/use-cases/product/assign-product-to-shop.use-case.ts
import { Injectable } from '@nestjs/common';
import { IProductRepository } from '../../../domain/repositories/product.repository';
import { IShopRepository } from '../../../domain/repositories/shop.repository';
import { AssignProductToShopDto } from '../../dtos/product.dto';

@Injectable()
export class AssignProductToShopUseCase {
  constructor(
    private productRepository: IProductRepository,
    private shopRepository: IShopRepository,
  ) {}

  async execute(dto: AssignProductToShopDto): Promise<void> {
    const product = await this.productRepository.findById(dto.productId);
    if (!product) {
      throw new Error('Product not found');
    }

    const shop = await this.shopRepository.findById(dto.shopId);
    if (!shop || shop.vendorId !== product.vendorId) {
      throw new Error('Valid shop required');
    }

    await this.productRepository.assignToShop(dto.productId, dto.shopId);
  }
}
