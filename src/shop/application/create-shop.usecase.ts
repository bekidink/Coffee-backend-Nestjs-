import { Shop } from '../domain/shop.entity';
import { ShopRepository } from '../domain/shop-repository.interface';

export interface CreateShopUseCase {
  execute(dto: {
    vendorId: string;
    name: string;
    description?: string;
    logoUrl?: string;
    contactPhone?: string;
    contactEmail?: string;
    location?: object;
    operatingHours?: object;
  }): Promise<Shop>;
}

export class CreateShopUseCaseImpl implements CreateShopUseCase {
  constructor(private readonly shopRepository: ShopRepository) {}

  async execute(dto: {
    vendorId: string;
    name: string;
    description?: string;
    logoUrl?: string;
    contactPhone?: string;
    contactEmail?: string;
    location?: object;
    operatingHours?: object;
  }): Promise<Shop> {
    const existingShop = await this.shopRepository.findByNameAndVendor(
      dto.name,
      dto.vendorId,
    );
    if (existingShop) {
      throw new Error('Shop with this name already exists for the vendor');
    }

    const shop = new Shop(
      require('uuid').v4(),
      dto.vendorId,
      dto.name,
      dto.description || null,
      dto.logoUrl || null,
      dto.contactPhone || null,
      dto.contactEmail || null,
      dto.location || null,
      dto.operatingHours || null,
      true,
      new Date(),
      new Date(),
    );

    await this.shopRepository.save(shop);
    return shop;
  }
}
