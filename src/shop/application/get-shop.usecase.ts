import { Shop } from '../domain/shop.entity';
import { ShopRepository } from '../domain/shop-repository.interface';

export interface GetShopUseCase {
  execute(id: string): Promise<Shop>;
}

export class GetShopUseCaseImpl implements GetShopUseCase {
  constructor(private readonly shopRepository: ShopRepository) {}

  async execute(id: string): Promise<Shop> {
    const shop = await this.shopRepository.findById(id);
    if (!shop) {
      throw new Error('Shop not found');
    }
    return shop;
  }
}
