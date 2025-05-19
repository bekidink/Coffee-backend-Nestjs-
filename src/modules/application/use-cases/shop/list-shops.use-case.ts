// src/application/use-cases/shop/list-shops.use-case.ts
import { Injectable } from '@nestjs/common';
import { IShopRepository } from '../../../domain/repositories/shop.repository';
import { Shop } from '../../../domain/entities/shop.entity';

@Injectable()
export class ListShopsUseCase {
  constructor(private shopRepository: IShopRepository) {}

  async execute(vendorId?: string): Promise<Shop[]> {
    if (vendorId) {
      return this.shopRepository.findByVendorId(vendorId);
    }
    return this.shopRepository.findAll();
  }
}
