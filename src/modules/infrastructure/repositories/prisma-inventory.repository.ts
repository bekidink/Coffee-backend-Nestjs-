// src/infrastructure/repositories/prisma-inventory.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { IInventoryRepository } from '../../domain/repositories/inventory.repository';
import { Inventory } from '../../domain/entities/inventory.entity';

@Injectable()
export class PrismaInventoryRepository implements IInventoryRepository {
  constructor(private prisma: PrismaService) {}

  async save(inventory: Inventory): Promise<Inventory> {
    const data = await this.prisma.inventory.create({
      data: {
        id: inventory.id,
        productId: inventory.productId,
        shopId: inventory.shopId,
        stock: inventory.stock,
        lastUpdated: inventory.lastUpdated,
      },
    });
    return Inventory.create(data);
  }

  async findById(id: string): Promise<Inventory | null> {
    const data = await this.prisma.inventory.findUnique({ where: { id } });
    return data ? Inventory.create(data) : null;
  }

  async findByProductAndShop(
    productId: string,
    shopId: string,
  ): Promise<Inventory | null> {
    const data = await this.prisma.inventory.findUnique({
      where: { productId_shopId: { productId, shopId } },
    });
    return data ? Inventory.create(data) : null;
  }

  async findByShopId(shopId: string): Promise<Inventory[]> {
    const data = await this.prisma.inventory.findMany({ where: { shopId } });
    return data.map((item) => Inventory.create(item));
  }

  async findAll(): Promise<Inventory[]> {
    const data = await this.prisma.inventory.findMany();
    return data.map((item) => Inventory.create(item));
  }

  async update(inventory: Inventory): Promise<Inventory> {
    const data = await this.prisma.inventory.update({
      where: { id: inventory.id },
      data: {
        stock: inventory.stock,
        lastUpdated: inventory.lastUpdated,
      },
    });
    return Inventory.create(data);
  }
}
