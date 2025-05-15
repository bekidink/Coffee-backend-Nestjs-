import { Inventory } from '../domain/inventory.entity';
import { InventoryRepository } from '../domain/inventory-repository.interface';

export interface GetInventoryUseCase {
  execute(id: string): Promise<Inventory>;
}

export class GetInventoryUseCaseImpl implements GetInventoryUseCase {
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  async execute(id: string): Promise<Inventory> {
    const inventory = await this.inventoryRepository.findById(id);
    if (!inventory) {
      throw new Error('Inventory not found');
    }
    return inventory;
  }
}
