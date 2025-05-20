// src/infrastructure/repositorie/prisma-product.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { IProductRepository } from '../../domain/repositories/product.repository';
import { Product } from '../../domain/entities/product.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaProductRepository implements IProductRepository {
  constructor(private prisma: PrismaService) {}
  findByVendorId(vendorId: string): Promise<Product[]> {
    throw new Error('Method not implemented.');
  }
  assignToShop(productId: string, shopId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async save(product: Product): Promise<Product> {
    const data: Prisma.ProductCreateInput = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      vendor: { connect: { id: product.vendorId } },
      imageUrls: product.imageUrls || [],
      category: { connect: { id: product.categoryId } },
      shop: { connect: { id: product.shopId } },
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };

    try {
      const savedData = await this.prisma.product.create({ data });
      return Product.create({
        id: savedData.id,
        name: savedData.name,
        description: savedData.description!,
        price: savedData.price,
        imageUrls: savedData.imageUrls as string[],
        categoryId: savedData.categoryId!,
        shopId: savedData.shopId,
        thumbnailUrl:savedData.thumbnailUrl!,
        vendorId:savedData.vendorId
      });
    } catch (error) {
      throw new Error(`Failed to save product: ${error.message}`);
    }
  }

  async update(product: Product): Promise<Product> {
    const data: Prisma.ProductUpdateInput = {
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrls: product.imageUrls || [],
      category: { connect: { id: product.categoryId } },
      shop: { connect: { id: product.shopId } },
      updatedAt: product.updatedAt,
    };

    try {
      const updatedData = await this.prisma.product.update({
        where: { id: product.id },
        data,
      });

      return Product.create({
        id: updatedData.id,
        name: updatedData.name,
        description: updatedData.description!,
        price: updatedData.price,
        imageUrls: updatedData.imageUrls as string[],
        categoryId: updatedData.categoryId!,
        shopId: updatedData.shopId,
        thumbnailUrl: updatedData.thumbnailUrl!,
        vendorId:updatedData.vendorId
      });
    } catch (error) {
      throw new Error(`Failed to update product: ${error.message}`);
    }
  }

  async findById(id: string): Promise<Product | null> {
    try {
      const data = await this.prisma.product.findUnique({ where: { id } });
      if (!data) return null;

      return Product.create({
        id: data.id,
        name: data.name,
        description: data.description!,
        price: data.price,
        imageUrls: data.imageUrls as string[],
        categoryId: data.categoryId!,
        shopId: data.shopId,
        thumbnailUrl: data.thumbnailUrl!,
        vendorId: data.vendorId,
      });
    } catch (error) {
      throw new Error(`Failed to find product by ID: ${error.message}`);
    }
  }

  async findByName(name: string): Promise<Product | null> {
    try {
      const data = await this.prisma.product.findFirst({ where: { name } });
      if (!data) return null;

      return Product.create({
        id: data.id,
        name: data.name,
        description: data.description!,
        price: data.price,
        imageUrls: data.imageUrls as string[],
        categoryId: data.categoryId!,
        shopId: data.shopId,
        thumbnailUrl: data.thumbnailUrl!,
        vendorId: data.vendorId,
      });
    } catch (error) {
      throw new Error(`Failed to find product by name: ${error.message}`);
    }
  }

  async findByShopId(shopId: string): Promise<Product[]> {
    try {
      const data = await this.prisma.product.findMany({ where: { shopId } });
      return data.map((item) =>
        Product.create({
          id: item.id,
          name: item.name,
          description: item.description!,
          price: item.price,
          imageUrls: item.imageUrls as string[],
          categoryId: item.categoryId!,
          shopId: item.shopId,
          thumbnailUrl: item.thumbnailUrl!,
          vendorId: item.vendorId,
        }),
      );
    } catch (error) {
      throw new Error(`Failed to find products by shop ID: ${error.message}`);
    }
  }

  async findByCategoryId(categoryId: string): Promise<Product[]> {
    try {
      const data = await this.prisma.product.findMany({
        where: { categoryId },
      });
      return data.map((item) =>
        Product.create({
          id: item.id,
          name: item.name,
          description: item.description!,
          price: item.price,
          imageUrls: item.imageUrls as string[],
          categoryId: item.categoryId!,
          shopId: item.shopId,
          thumbnailUrl: item.thumbnailUrl!,
          vendorId: item.vendorId,
        }),
      );
    } catch (error) {
      throw new Error(
        `Failed to find products by category ID: ${error.message}`,
      );
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      const data = await this.prisma.product.findMany();
      return data.map((item) =>
        Product.create({
          id: item.id,
          name: item.name,
          description: item.description!,
          price: item.price,
          imageUrls: item.imageUrls as string[],
          categoryId: item.categoryId!,
          shopId: item.shopId,
          thumbnailUrl: item.thumbnailUrl!,
          vendorId:item.vendorId
        }),
      );
    } catch (error) {
      throw new Error(`Failed to find all products: ${error.message}`);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.product.delete({ where: { id } });
    } catch (error) {
      throw new Error(`Failed to delete product: ${error.message}`);
    }
  }
}
