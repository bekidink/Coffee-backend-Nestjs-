// src/application/services/shop.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { IShopRepository } from '../../domain/repositories/shop.repository';
import { Shop } from '../../domain/entities/shop.entity';
import { ImageUploadService } from '../../infrastructure/services/image-upload.service';

@Injectable()
export class ShopService {
  constructor(
    private shopRepository: IShopRepository,
    private imageUploadService: ImageUploadService,
  ) {}

  async createShop(
    data: {
      name: string;
      vendorId: string;
      description?: string;
    },
    image?: Express.Multer.File,
  ): Promise<Shop> {
    let imageUrl: string | null = null;
    if (image) {
      imageUrl = await this.imageUploadService.uploadImage(image, 'shops');
    }

    const shop = Shop.create({
      name:data.name,
      vendorId:data.vendorId,
      description:data.description,
      imageUrl:imageUrl!
    });

    return this.shopRepository.save(shop);
  }

  async updateShop(
    id: string,
    data: Partial<{
      name: string;
      description: string | null;
    }>,
    image?: Express.Multer.File,
  ): Promise<Shop> {
    const shop = await this.shopRepository.findById(id);
    if (!shop) {
      throw new NotFoundException(`Shop with ID ${id} not found`);
    }

    let imageUrl: string | null = shop.imageUrl;
    if (image) {
      if (imageUrl) {
        await this.imageUploadService.deleteImage(imageUrl);
      }
      imageUrl = await this.imageUploadService.uploadImage(image, 'shops');
    }

    shop.update({
      ...data,
      imageUrl,
    });

    return this.shopRepository.update(shop);
  }

  async findById(id: string): Promise<Shop | null> {
    return this.shopRepository.findById(id);
  }

  async findByVendorId(vendorId: string): Promise<Shop[]> {
    return this.shopRepository.findByVendorId(vendorId);
  }
}
