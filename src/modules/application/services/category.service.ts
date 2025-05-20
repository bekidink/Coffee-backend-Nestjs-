// src/application/services/category.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { ICategoryRepository } from '../../domain/repositories/category.repository';
import { Category } from '../../domain/entities/category.entity';
import { ImageUploadService } from '../../infrastructure/services/image-upload.service';

@Injectable()
export class CategoryService {
  constructor(
    private categoryRepository: ICategoryRepository,
    private imageUploadService: ImageUploadService,
  ) {}

  async createCategory(
    data: {
      name: string;
      description?: string;
      parentId?: string;
    },
    image?: Express.Multer.File,
  ): Promise<Category> {
    let imageUrl: string | null = null;
    if (image) {
      imageUrl = await this.imageUploadService.uploadImage(image, 'categories');
    }

    const category = Category.create({
        name:data.name,
        description:data.description,
        parentId:data.parentId
  });

    return this.categoryRepository.save(category);
  }

  async updateCategory(
    id: string,
    data: Partial<{
      name: string;
      description: string | null;
      parentId: string | null;
    }>,
    image?: Express.Multer.File,
  ): Promise<Category> {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    let imageUrl: string | null = category.imageUrl;
    if (image) {
      if (imageUrl) {
        await this.imageUploadService.deleteImage(imageUrl);
      }
      imageUrl = await this.imageUploadService.uploadImage(image, 'categories');
    }

    category.update({
      ...data,
      imageUrl,
    });

    return this.categoryRepository.update(category);
  }

  async findById(id: string): Promise<Category | null> {
    return this.categoryRepository.findById(id);
  }

  // Other methods remain unchanged
}
