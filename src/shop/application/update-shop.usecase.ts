import { Shop } from '../domain/shop.entity';
import { ShopRepository } from '../domain/shop-repository.interface';

export interface UpdateShopUseCase {
  execute(
    id: string,
    dto: {
      name?: string;
      description?: string;
      logoUrl?: string;
      contactPhone?: string;
      contactEmail?: string;
      location?: object;
      operatingHours?: object;
      isActive?: boolean;
    },
  ): Promise<Shop>;
}

export class UpdateShopUseCaseImpl implements UpdateShopUseCase {
  constructor(private readonly shopRepository: ShopRepository) {}

  async execute(
    id: string,
    dto: {
      name?: string;
      description?: string;
      logoUrl?: string;
      contactPhone?: string;
      contactEmail?: string;
      location?: object;
      operatingHours?: object;
      isActive?: boolean;
    },
  ): Promise<Shop> {
    const shop = await this.shopRepository.findById(id);
    if (!shop) {
      throw new Error('Shop not found');
    }

    if (dto.name && dto.name !== shop.name) {
      const existingShop = await this.shopRepository.findByNameAndVendor(
        dto.name,
        shop.vendorId,
      );
      if (existingShop && existingShop.id !== id) {
        throw new Error('Shop name already in use for this vendor');
      }
      shop.name = dto.name;
    }

    shop.description =
      dto.description !== undefined ? dto.description : shop.description;
    shop.logoUrl = dto.logoUrl !== undefined ? dto.logoUrl : shop.logoUrl;
    shop.contactPhone =
      dto.contactPhone !== undefined ? dto.contactPhone : shop.contactPhone;
    shop.contactEmail =
      dto.contactEmail !== undefined ? dto.contactEmail : shop.contactEmail;
    shop.location = dto.location !== undefined ? dto.location : shop.location;
    shop.operatingHours =
      dto.operatingHours !== undefined
        ? dto.operatingHours
        : shop.operatingHours;
    shop.isActive = dto.isActive !== undefined ? dto.isActive : shop.isActive;
    shop.updatedAt = new Date();

    await this.shopRepository.update(shop);
    return shop;
  }
}
