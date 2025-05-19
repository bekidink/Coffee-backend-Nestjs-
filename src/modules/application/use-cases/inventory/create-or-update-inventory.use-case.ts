// src/application/use-cases/inventory/create-or-update-inventory.use-case.ts
import { Injectable } from '@nestjs/common';
import { IInventoryRepository } from '../../../domain/repositories/inventory.repository';
import { IProductRepository } from '../../../domain/repositories/product.repository';
import { IShopRepository } from '../../../domain/repositories/shop.repository';
import { Inventory } from '../../../domain/entities/inventory.entity';
import { CreateOrUpdateInventoryDto } from '../../dtos/inventory.dto';

@Injectable()
export class CreateOrUpdateInventoryUseCase {
  constructor(
    private inventoryRepository: IInventoryRepository,
    private productRepository: IProductRepository,
    private shopRepository: IShopRepository,
  ) {}

  async execute(dto: CreateOrUpdateInventoryDto): Promise<Inventory> {
    const product = await this.productRepository.findById(dto.productId);
    if (!product) {
      throw new Error('Product not found');
    }

    const shop = await this.shopRepository.findById(dto.shopId);
    if (
      !shop ||
      shop.status !== 'ACTIVE' ||
      shop.vendorId !== product.vendorId
    ) {
      throw new Error('Valid shop required');
    }

    let inventory = await this.inventoryRepository.findByProductAndShop(
      dto.productId,
      dto.shopId,
    );
    if (inventory) {
      inventory.updateStock(dto.stock);
      return this.inventoryRepository.update(inventory);
    } else {
      inventory = Inventory.create(dto);
      return this.inventoryRepository.save(inventory);
    }
  }
}
