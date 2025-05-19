// src/application/use-cases/inventory/check-stock.use-case.ts
import { Injectable } from '@nestjs/common';
import { IInventoryRepository } from '../../../domain/repositories/inventory.repository';
import { CheckStockDto } from '../../dtos/inventory.dto';

@Injectable()
export class CheckStockUseCase {
  constructor(private inventoryRepository: IInventoryRepository) {}

  async execute(dto: CheckStockDto): Promise<boolean> {
    const inventory = await this.inventoryRepository.findByProductAndShop(
      dto.productId,
      dto.shopId,
    );
    if (!inventory) {
      return false;
    }
    return inventory.stock >= dto.quantity;
  }
}
