import { Inventory } from '../domain/inventory.entity';
import { InventoryRepository } from '../domain/inventory-repository.interface';

export interface UpdateInventoryUseCase {
  execute(
    id: string,
    dto: {
      quantity?: number;
      lowStockThreshold?: number;
    },
  ): Promise<Inventory>;
}

export class UpdateInventoryUseCaseImpl implements UpdateInventoryUseCase {
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  async execute(
    id: string,
    dto: {
      quantity?: number;
      lowStockThreshold?: number;
    },
  ): Promise<Inventory> {
    const inventory = await this.inventoryRepository.findById(id);
    if (!inventory) {
      throw new Error('Inventory not found');
    }

    if (dto.quantity !== undefined) {
      inventory.quantity = dto.quantity;
    }
    if (dto.lowStockThreshold !== undefined) {
      inventory.lowStockThreshold = dto.lowStockThreshold;
    }

    inventory.updatedAt = new Date();
    await this.inventoryRepository.update(inventory);
    return inventory;
  }
}
