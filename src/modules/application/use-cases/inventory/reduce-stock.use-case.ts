// src/application/use-cases/inventory/reduce-stock.use-case.ts
import { Injectable } from '@nestjs/common';
import { IInventoryRepository } from '../../../domain/repositories/inventory.repository';
import { ReduceStockDto } from '../../dtos/inventory.dto';
import { Inventory } from 'src/modules/domain/entities/inventory.entity';

@Injectable()
export class ReduceStockUseCase {
  constructor(private inventoryRepository: IInventoryRepository) {}

  async execute(dto: ReduceStockDto): Promise<Inventory> {
    const inventory = await this.inventoryRepository.findByProductAndShop(
      dto.productId,
      dto.shopId,
    );
    if (!inventory) {
      throw new Error('Inventory not found');
    }

    inventory.reduceStock(dto.quantity);
    return this.inventoryRepository.update(inventory);
  }
}
