import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from '../domain/inventory.entity';
import { InventoryRepository } from '../domain/inventory-repository.interface';
import { InventoryTypeOrmEntity } from './inventory-typeorm.entity';

@Injectable()
export class InventoryTypeOrmRepository implements InventoryRepository {
  constructor(
    @InjectRepository(InventoryTypeOrmEntity)
    private readonly repository: Repository<InventoryTypeOrmEntity>,
  ) {}

  async findById(id: string): Promise<Inventory | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;
    return new Inventory(
      entity.id,
      entity.shopId,
      entity.menuItemId,
      entity.name,
      entity.quantity,
      entity.unit,
      entity.lowStockThreshold,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  async findByShopId(shopId: string): Promise<Inventory[]> {
    const entities = await this.repository.find({ where: { shopId } });
    return entities.map(
      (entity) =>
        new Inventory(
          entity.id,
          entity.shopId,
          entity.menuItemId,
          entity.name,
          entity.quantity,
          entity.unit,
          entity.lowStockThreshold,
          entity.createdAt,
          entity.updatedAt,
        ),
    );
  }

  async findByMenuItemId(menuItemId: string): Promise<Inventory | null> {
    const entity = await this.repository.findOne({ where: { menuItemId } });
    if (!entity) return null;
    return new Inventory(
      entity.id,
      entity.shopId,
      entity.menuItemId,
      entity.name,
      entity.quantity,
      entity.unit,
      entity.lowStockThreshold,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  async save(inventory: Inventory): Promise<void> {
    await this.repository.save({
      id: inventory.id,
      shopId: inventory.shopId,
      menuItemId: inventory.menuItemId,
      name: inventory.name,
      quantity: inventory.quantity,
      unit: inventory.unit,
      lowStockThreshold: inventory.lowStockThreshold,
      createdAt: inventory.createdAt,
      updatedAt: inventory.updatedAt,
    });
  }

  async update(inventory: Inventory): Promise<void> {
    await this.repository.update(inventory.id, {
      quantity: inventory.quantity,
      lowStockThreshold: inventory.lowStockThreshold!,
      updatedAt: inventory.updatedAt,
    });
  }
}
