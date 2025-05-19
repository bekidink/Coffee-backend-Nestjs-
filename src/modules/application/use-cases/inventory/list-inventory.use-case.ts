// src/application/use-cases/inventory/list-inventory.use-case.ts
import { Injectable } from '@nestjs/common';
import { IInventoryRepository } from '../../../domain/repositories/inventory.repository';
import { Inventory } from '../../../domain/entities/inventory.entity';

@Injectable()
export class ListInventoryUseCase {
  constructor(private inventoryRepository: IInventoryRepository) {}

  async execute(shopId?: string): Promise<Inventory[]> {
    if (shopId) {
      return this.inventoryRepository.findByShopId(shopId);
    }
    return this.inventoryRepository.findAll();
  }
}
