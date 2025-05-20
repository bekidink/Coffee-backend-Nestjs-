// src/infrastructure/repositorie/prisma-category.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { ICategoryRepository } from '../../domain/repositories/category.repository';
import { Category } from '../../domain/entities/category.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaCategoryRepository implements ICategoryRepository {
  constructor(private prisma: PrismaService) {}
  hasProducts(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  findChildren(id: string): Promise<Category[]> {
    throw new Error('Method not implemented.');
  }

  async save(category: Category): Promise<Category> {
    const data: Prisma.CategoryCreateInput = {
      id: category.id,
      name: category.name,
      description: category.description,
      imageUrl: category.imageUrl,
      parent: category.parentId
        ? { connect: { id: category.parentId } }
        : undefined,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };

    const savedData = await this.prisma.category.create({ data });
    return Category.create({
      id: savedData.id,
      name: savedData.name,
      description: savedData.description!,
      imageUrl: savedData.imageUrl!,
      parentId: savedData.parentId!,
    });
  }

  async update(category: Category): Promise<Category> {
    const data: Prisma.CategoryUpdateInput = {
      name: category.name,
      description: category.description,
      imageUrl: category.imageUrl,
      parent: category.parentId
        ? { connect: { id: category.parentId } }
        : { disconnect: true },
      updatedAt: category.updatedAt,
    };

    const updatedData = await this.prisma.category.update({
      where: { id: category.id },
      data,
    });

    return Category.create({
      id: updatedData.id,
      name: updatedData.name,
      description: updatedData.description!,
      imageUrl: updatedData.imageUrl!,
      parentId: updatedData.parentId!,
    });
  }

  async findById(id: string): Promise<Category | null> {
    const data = await this.prisma.category.findUnique({ where: { id } });
    if (!data) return null;

    return Category.create({
      id: data.id,
      name: data.name,
      description: data.description!,
      imageUrl: data.imageUrl!,
      parentId: data.parentId!,
    });
  }

  async findByName(name: string): Promise<Category | null> {
    const data = await this.prisma.category.findUnique({ where: { name } });
    if (!data) return null;

    return Category.create({
      id: data.id,
      name: data.name,
      description: data.description!,
      imageUrl: data.imageUrl!,
      parentId: data.parentId!,
    });
  }

  async findAll(): Promise<Category[]> {
    const data = await this.prisma.category.findMany();
    return data.map((item) =>
      Category.create({
        id: item.id,
        name: item.name,
        description: item.description!,
        imageUrl: item.imageUrl!,
        parentId: item.parentId!,
      }),
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.category.delete({ where: { id } });
  }
}
