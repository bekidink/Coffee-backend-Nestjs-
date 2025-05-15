import { MenuItem } from '../domain/menu-item.entity';
import { MenuItemRepository } from '../domain/menu-item-repository.interface';

export interface GetMenuItemUseCase {
  execute(id: string): Promise<MenuItem>;
}

export class GetMenuItemUseCaseImpl implements GetMenuItemUseCase {
  constructor(private readonly menuItemRepository: MenuItemRepository) {}

  async execute(id: string): Promise<MenuItem> {
    const menuItem = await this.menuItemRepository.findById(id);
    if (!menuItem) {
      throw new Error('Menu item not found');
    }
    return menuItem;
  }
}
