import { MenuItem } from '../domain/menu-item.entity';
import { MenuItemRepository } from '../domain/menu-item-repository.interface';

export interface CreateMenuItemUseCase {
  execute(dto: {
    shopId: string;
    name: string;
    description?: string;
    price: number;
    category?: string;
    isAvailable?: boolean;
  }): Promise<MenuItem>;
}

export class CreateMenuItemUseCaseImpl implements CreateMenuItemUseCase {
  constructor(private readonly menuItemRepository: MenuItemRepository) {}

  async execute(dto: {
    shopId: string;
    name: string;
    description?: string;
    price: number;
    category?: string;
    isAvailable?: boolean;
  }): Promise<MenuItem> {
    const existingItem = await this.menuItemRepository.findByNameAndShop(
      dto.name,
      dto.shopId,
    );
    if (existingItem) {
      throw new Error('Menu item with this name already exists for the shop');
    }

    const menuItem = new MenuItem(
      require('uuid').v4(),
      dto.shopId,
      dto.name,
      dto.description || null,
      dto.price,
      dto.category || null,
      dto.isAvailable !== undefined ? dto.isAvailable : true,
      new Date(),
      new Date(),
    );

    await this.menuItemRepository.save(menuItem);
    return menuItem;
  }
}
