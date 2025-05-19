import { Injectable } from '@nestjs/common';
import { IProductRepository } from '../../../domain/repositories/product.repository';

@Injectable()
export class DeleteProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(productId: string): Promise<void> {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    await this.productRepository.delete(productId);
  }
}