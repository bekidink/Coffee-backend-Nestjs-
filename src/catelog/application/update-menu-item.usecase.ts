import { MenuItem } from '../domain/menu-item.entity';
import { MenuItemRepository } from '../domain/menu-item-repository.interface';

export interface UpdateMenuItemUseCase {
  execute(
    id: string,
    dto: {
      name?: string;
      description?: string;
      price?: number;
      category?: string;
      isAvailable?: boolean;
    },
  ): Promise<MenuItem>;
}

export class UpdateMenuItemUseCaseImpl implements UpdateMenuItemUseCase {
  constructor(private readonly menuItemRepository: MenuItemRepository) {}

  async execute(
    id: string,
    dto: {
      name?: string;
      description?: string;
      price?: number;
      category?: string;
      isAvailable?: boolean;
    },
  ): Promise<MenuItem> {
    const menuItem = await this.menuItemRepository.findById(id);
    if (!menuItem) {
      throw new Error('Menu item not found');
    }

    if (dto.name && dto.name !== menuItem.name) {
      const existingItem = await this.menuItemRepository.findByNameAndShop(
        dto.name,
        menuItem.shopId,
      );
      if (existingItem && existingItem.id !== id) {
        throw new Error('Menu item name already in use for this shop');
      }
      menuItem.name = dto.name;
    }

    menuItem.description =
      dto.description !== undefined ? dto.description : menuItem.description;
    menuItem.price = dto.price !== undefined ? dto.price : menuItem.price;
    menuItem.category =
      dto.category !== undefined ? dto.category : menuItem.category;
    menuItem.isAvailable =
      dto.isAvailable !== undefined ? dto.isAvailable : menuItem.isAvailable;
    menuItem.updatedAt = new Date();

    await this.menuItemRepository.update(menuItem);
    return menuItem;
  }
}
