// src/application/services/product.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { IProductRepository } from '../../domain/repositories/product.repository';
import { Product } from '../../domain/entities/product.entity';
import { ImageUploadService } from '../../infrastructure/services/image-upload.service';

@Injectable()
export class ProductService {
  constructor(
    private productRepository: IProductRepository,
    private imageUploadService: ImageUploadService,
  ) {}

  async createProduct(
    data: {
      name: string;
      description?: string;
      price: number;
      vendorId: string;
      shopId: string;
      categoryId?: string;
      stockQuantity?: number;
    },
    thumbnail?: Express.Multer.File,
    images?: Express.Multer.File[],
  ): Promise<Product> {
    let thumbnailUrl: string | null = null;
    let imageUrls: string[] = [];

    if (thumbnail) {
      thumbnailUrl = await this.imageUploadService.uploadImage(
        thumbnail,
        'products',
      );
    }
    if (images && images.length > 0) {
      imageUrls = await this.imageUploadService.uploadMultipleImages(
        images,
        'products',
      );
    }

    const product = Product.create({
      categoryId:data.categoryId!,
      name:data.name,
      vendorId:data.vendorId,
      shopId:data.shopId,
      price:data.price,
      thumbnailUrl:thumbnailUrl!,
      imageUrls,
    });

    return this.productRepository.save(product);
  }

  async updateProduct(
    id: string,
    data: Partial<{
      name: string;
      shopId:string;
      description: string | null;
      price: number;
      categoryId: string | null;
      stockQuantity: number;
    }>,
    thumbnail?: Express.Multer.File,
    images?: Express.Multer.File[],
  ): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    let thumbnailUrl: string | null = product.thumbnailUrl;
    let imageUrls: string[] = product.imageUrls;

    if (thumbnail) {
      if (thumbnailUrl) {
        await this.imageUploadService.deleteImage(thumbnailUrl);
      }
      thumbnailUrl = await this.imageUploadService.uploadImage(
        thumbnail,
        'products',
      );
    }

    if (images && images.length > 0) {
      if (imageUrls.length > 0) {
        await this.imageUploadService.deleteMultipleImages(imageUrls);
      }
      imageUrls = await this.imageUploadService.uploadMultipleImages(
        images,
        'products',
      );
    }

    product.update({
      categoryId: data.categoryId!,
      name: data.name,
      
      shopId: data.shopId,
      price: data.price,
      
      
    });

    return this.productRepository.update(product);
  }

  async findById(id: string): Promise<Product | null> {
    return this.productRepository.findById(id);
  }

  // Other methods (findByShopId, etc.) remain unchanged
}
