// src/infrastructure/repositories/prisma-category.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { ICategoryRepository } from '../../domain/repositories/category.repository';
import { Category } from '../../domain/entities/category.entity';

@Injectable()
export class PrismaCategoryRepository implements ICategoryRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Category | null> {
    const data = await this.prisma.category.findUnique({ where: { id } });
    return data ? Category.create(data) : null;
  }
}
