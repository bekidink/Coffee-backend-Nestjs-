// src/infrastructure/repositorie/prisma-shop.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { IShopRepository } from '../../domain/repositories/shop.repository';
import { Shop } from '../../domain/entities/shop.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaShopRepository implements IShopRepository {
  constructor(private prisma: PrismaService) {}

  async save(shop: Shop): Promise<Shop> {
    const data: Prisma.ShopCreateInput = {
      id: shop.id,
      name: shop.name,
      description: shop.description,
      imageUrl: shop.imageUrl,
      createdAt: shop.createdAt,
      updatedAt: shop.updatedAt,
      averageRating: shop.averageRating,
      vendor: { connect: { id: shop.vendorId } },
    };

    const savedData = await this.prisma.shop.create({ data });
    return Shop.create({
      id: savedData.id,
      name: savedData.name,
      vendorId: savedData.vendorId,
      description: savedData.description!,
      imageUrl: savedData.imageUrl!,
      averageRating: savedData.averageRating!,
    });
  }

  async update(shop: Shop): Promise<Shop> {
    const data: Prisma.ShopUpdateInput = {
      name: shop.name,
      description: shop.description,
      imageUrl: shop.imageUrl,
      updatedAt: shop.updatedAt,
      averageRating: shop.averageRating,
    };

    const updatedData = await this.prisma.shop.update({
      where: { id: shop.id },
      data,
    });

    return Shop.create({
      id: updatedData.id,
      name: updatedData.name,
      vendorId: updatedData.vendorId,
      description: updatedData.description!,
      imageUrl: updatedData.imageUrl!,
      averageRating: updatedData.averageRating!,
    });
  }

  async findById(id: string): Promise<Shop | null> {
    const data = await this.prisma.shop.findUnique({ where: { id } });
    if (!data) return null;

    return Shop.create({
      id: data.id,
      name: data.name,
      vendorId: data.vendorId,
      description: data.description!,
      imageUrl: data.imageUrl!,
      averageRating: data.averageRating!,
    });
  }

  async findByName(name: string): Promise<Shop | null> {
    const data = await this.prisma.shop.findFirst({ where: { name } });
    if (!data) return null;

    return Shop.create({
      id: data.id,
      name: data.name,
      vendorId: data.vendorId,
      description: data.description!,
      imageUrl: data.imageUrl!,
      averageRating: data.averageRating!,
    });
  }

  async findByVendorId(vendorId: string): Promise<Shop[]> {
    const data = await this.prisma.shop.findMany({ where: { vendorId } });
    return data.map((item) =>
      Shop.create({
        id: item.id,
        name: item.name,
        vendorId: item.vendorId,
        description: item.description!,
        imageUrl: item.imageUrl!,
        averageRating: item.averageRating!,
      }),
    );
  }

  async findAll(): Promise<Shop[]> {
    const data = await this.prisma.shop.findMany();
    return data.map((item) =>
      Shop.create({
        id: item.id,
        name: item.name,
        vendorId: item.vendorId,
        description: item.description!,
        imageUrl: item.imageUrl!,
        averageRating: item.averageRating!,
      }),
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.shop.delete({ where: { id } });
  }
}
