import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem } from '../domain/menu-item.entity';
import { MenuItemRepository } from '../domain/menu-item-repository.interface';
import { MenuItemTypeOrmEntity } from './menu-item-typeorm.entity';

@Injectable()
export class MenuItemTypeOrmRepository implements MenuItemRepository {
  constructor(
    @InjectRepository(MenuItemTypeOrmEntity)
    private readonly repository: Repository<MenuItemTypeOrmEntity>,
  ) {}

  async findById(id: string): Promise<MenuItem | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;
    return new MenuItem(
      entity.id,
      entity.shopId,
      entity.name,
      entity.description,
      entity.price,
      entity.category,
      entity.isAvailable,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  async findByShopId(shopId: string): Promise<MenuItem[]> {
    const entities = await this.repository.find({ where: { shopId } });
    return entities.map(
      (entity) =>
        new MenuItem(
          entity.id,
          entity.shopId,
          entity.name,
          entity.description,
          entity.price,
          entity.category,
          entity.isAvailable,
          entity.createdAt,
          entity.updatedAt,
        ),
    );
  }

  async findByNameAndShop(
    name: string,
    shopId: string,
  ): Promise<MenuItem | null> {
    const entity = await this.repository.findOne({ where: { name, shopId } });
    if (!entity) return null;
    return new MenuItem(
      entity.id,
      entity.shopId,
      entity.name,
      entity.description,
      entity.price,
      entity.category,
      entity.isAvailable,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  async save(menuItem: MenuItem): Promise<void> {
    await this.repository.save({
      id: menuItem.id,
      shopId: menuItem.shopId,
      name: menuItem.name,
      description: menuItem.description,
      price: menuItem.price,
      category: menuItem.category,
      isAvailable: menuItem.isAvailable,
      createdAt: menuItem.createdAt,
      updatedAt: menuItem.updatedAt,
    });
  }

  async update(menuItem: MenuItem): Promise<void> {
    await this.repository.update(menuItem.id, {
      name: menuItem.name,
      description: menuItem.description,
      price: menuItem.price,
      category: menuItem.category,
      isAvailable: menuItem.isAvailable,
      updatedAt: menuItem.updatedAt,
    });
  }
}
