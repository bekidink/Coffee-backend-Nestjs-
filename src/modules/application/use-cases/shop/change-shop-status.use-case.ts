// src/application/use-cases/shop/change-shop-status.use-case.ts
import { Injectable } from '@nestjs/common';
import { IShopRepository } from '../../../domain/repositories/shop.repository';
import { ChangeShopStatusDto } from '../../dtos/shop.dto';
import { Shop } from 'src/modules/domain/entities/shop.entity';

@Injectable()
export class ChangeShopStatusUseCase {
  constructor(private shopRepository: IShopRepository) {}

  async execute(dto: ChangeShopStatusDto): Promise<Shop> {
    const shop = await this.shopRepository.findById(dto.shopId);
    if (!shop) {
      throw new Error('Shop not found');
    }

    shop.update({ status: dto.status });
    return this.shopRepository.update(shop);
  }
}
