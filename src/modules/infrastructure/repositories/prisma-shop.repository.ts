// src/infrastructure/repositories/prisma-shop.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { IShopRepository } from '../../domain/repositories/shop.repository';
import { Shop } from '../../domain/entities/shop.entity';

@Injectable()
export class PrismaShopRepository implements IShopRepository {
  constructor(private prisma: PrismaService) {}

  async save(shop: Shop): Promise<Shop> {
    const data = await this.prisma.shop.create({
      data: {
        id: shop.id,
        vendorId: shop.vendorId,
        name: shop.name,
        description: shop.description,
        operatingHours: shop.operatingHours,
        status: shop.status,
        createdAt: shop.createdAt,
        updatedAt: shop.updatedAt,
      },
    });
    return Shop.create(data);
  }

  async findById(id: string): Promise<Shop | null> {
    const data = await this.prisma.shop.findUnique({ where: { id } });
    return data ? Shop.create(data) : null;
  }

  async findByVendorId(vendorId: string): Promise<Shop[]> {
    const data = await this.prisma.shop.findMany({ where: { vendorId } });
    return data.map((item) => Shop.create(item));
  }

  async findAll(): Promise<Shop[]> {
    const data = await this.prisma.shop.findMany();
    return data.map((item) => Shop.create(item));
  }

  async update(shop: Shop): Promise<Shop> {
    const data = await this.prisma.shop.update({
      where: { id: shop.id },
      data: {
        name: shop.name,
        description: shop.description,
        operatingHours: shop.operatingHours,
        status: shop.status,
        updatedAt: shop.updatedAt,
      },
    });
    return Shop.create(data);
  }
}
