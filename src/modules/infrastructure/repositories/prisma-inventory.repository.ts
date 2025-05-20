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
        quantity: inventory.stock,
        lastUpdated: inventory.lastUpdated,
      },
    });
    return Inventory.create({
      productId: data.productId,
      shopId: data.shopId,
      stock: data.quantity
    });
  }

  async findById(id: string): Promise<Inventory | null> {
    const data = await this.prisma.inventory.findUnique({ where: { id } });
    return data
      ? Inventory.create({
          productId: data.productId,
          shopId: data.shopId,
          stock: data.quantity,
        })
      : null;
  }

  async findByProductAndShop(
    productId: string,
    shopId: string,
  ): Promise<Inventory | null> {
    const data = await this.prisma.inventory.findUnique({
      where: { productId_shopId: { productId, shopId } },
    });
    return data
      ? Inventory.create({
          productId: data.productId,
          shopId: data.shopId,
          stock: data.quantity,
        })
      : null;
  }

  async findByShopId(shopId: string): Promise<Inventory[]> {
    const data = await this.prisma.inventory.findMany({ where: { shopId } });
    return data.map((item) =>
      Inventory.create({
        productId: item.productId,
        shopId: item.shopId,
        stock: item.quantity,
      }),
    );
  }

  async findAll(): Promise<Inventory[]> {
    const data = await this.prisma.inventory.findMany();
    return data.map((item) =>
      Inventory.create({
        productId: item.productId,
        shopId: item.shopId,
        stock: item.quantity,
      }),
    );
  }

  async update(inventory: Inventory): Promise<Inventory> {
    const data = await this.prisma.inventory.update({
      where: { id: inventory.id },
      data: {
        quantity: inventory.stock,
        lastUpdated: inventory.lastUpdated,
      },
    });
    return Inventory.create({
      productId: data.productId,
      shopId: data.shopId,
      stock: data.quantity,
    });
  }
}
