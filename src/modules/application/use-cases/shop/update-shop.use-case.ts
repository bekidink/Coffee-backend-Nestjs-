// src/application/use-cases/shop/update-shop.use-case.ts
import { Injectable } from '@nestjs/common';
import { IShopRepository } from '../../../domain/repositories/shop.repository';
import { UpdateShopDto } from '../../dtos/shop.dto';
import { Shop } from 'src/modules/domain/entities/shop.entity';

@Injectable()
export class UpdateShopUseCase {
  constructor(private shopRepository: IShopRepository) {}

  async execute(shopId: string, dto: UpdateShopDto): Promise<Shop> {
    const shop = await this.shopRepository.findById(shopId);
    if (!shop) {
      throw new Error('Shop not found');
    }

    shop.update(dto);
    return this.shopRepository.update(shop);
  }
}
