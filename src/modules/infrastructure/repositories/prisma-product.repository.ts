// src/infrastructure/repositories/prisma-product.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { IProductRepository } from '../../domain/repositories/product.repository';
import { Product } from '../../domain/entities/product.entity';

@Injectable()
export class PrismaProductRepository implements IProductRepository {
  constructor(private prisma: PrismaService) {}

  async save(product: Product): Promise<Product> {
    const data = await this.prisma.product.create({
      data: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: product.categoryId,
        vendorId: product.vendorId,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      },
    });
    return Product.create(data);
  }

  async findById(id: string): Promise<Product | null> {
    const data = await this.prisma.product.findUnique({ where: { id } });
    return data ? Product.create(data) : null;
  }

  async findByShopId(shopId: string): Promise<Product[]> {
    const data = await this.prisma.product.findMany({
      where: { shops: { some: { id: shopId } } },
    });
    return data.map((item) => Product.create(item));
  }

  async findByVendorId(vendorId: string): Promise<Product[]> {
    const data = await this.prisma.product.findMany({ where: { vendorId } });
    return data.map((item) => Product.create(item));
  }

  async findByCategoryId(categoryId: string): Promise<Product[]> {
    const data = await this.prisma.product.findMany({ where: { categoryId } });
    return data.map((item) => Product.create(item));
  }

  async findAll(): Promise<Product[]> {
    const data = await this.prisma.product.findMany();
    return data.map((item) => Product.create(item));
  }

  async update(product: Product): Promise<Product> {
    const data = await this.prisma.product.update({
      where: { id: product.id },
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: product.categoryId,
        updatedAt: product.updatedAt,
      },
    });
    return Product.create(data);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }

  async assignToShop(productId: string, shopId: string): Promise<void> {
    await this.prisma.product.update({
      where: { id: productId },
      data: {
        shops: { connect: { id: shopId } },
      },
    });
  }
}
