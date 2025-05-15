import { Inventory } from '../domain/inventory.entity';
import { InventoryRepository } from '../domain/inventory-repository.interface';

export interface CreateInventoryUseCase {
  execute(dto: {
    shopId: string;
    menuItemId?: string;
    name: string;
    quantity: number;
    unit: string;
    lowStockThreshold?: number;
  }): Promise<Inventory>;
}

export class CreateInventoryUseCaseImpl implements CreateInventoryUseCase {
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  async execute(dto: {
    shopId: string;
    menuItemId?: string;
    name: string;
    quantity: number;
    unit: string;
    lowStockThreshold?: number;
  }): Promise<Inventory> {
    const existingInventory = await this.inventoryRepository.findByMenuItemId(
      dto.menuItemId || '',
    );
    if (dto.menuItemId && existingInventory) {
      throw new Error('Inventory for this menu item already exists');
    }

    const inventory = new Inventory(
      require('uuid').v4(),
      dto.shopId,
      dto.menuItemId || null,
      dto.name,
      dto.quantity,
      dto.unit,
      dto.lowStockThreshold || null,
      new Date(),
      new Date(),
    );

    await this.inventoryRepository.save(inventory);
    return inventory;
  }
}
