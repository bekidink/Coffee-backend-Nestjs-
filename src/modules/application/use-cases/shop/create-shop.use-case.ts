// src/application/use-cases/shop/create-shop.use-case.ts
import { Injectable } from '@nestjs/common';
import { IShopRepository } from '../../../domain/repositories/shop.repository';
import { IVendorRepository } from '../../../domain/repositories/vendor.repository';
import { Shop } from '../../../domain/entities/shop.entity';
import { CreateShopDto } from '../../dtos/shop.dto';

@Injectable()
export class CreateShopUseCase {
  constructor(
    private shopRepository: IShopRepository,
    private vendorRepository: IVendorRepository,
  ) {}

  async execute(dto: CreateShopDto): Promise<Shop> {
    const vendor = await this.vendorRepository.findById(dto.vendorId);
    if (!vendor) {
      throw new Error('Vendor not found');
    }

    if (vendor.status !== 'ACTIVE') {
      throw new Error('Vendor must be active to create a shop');
    }

    const shop = Shop.create(dto);
    return this.shopRepository.save(shop);
  }
}
