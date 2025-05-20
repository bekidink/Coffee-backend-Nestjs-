// src/infrastructure/services/image-upload.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class ImageUploadService {
  constructor(private configService: ConfigService) {
    const cloudName = this.configService.get<string>('CLOUDINARY_CLOUD_NAME');
    const apiKey = this.configService.get<string>('CLOUDINARY_API_KEY');
    const apiSecret = this.configService.get<string>('CLOUDINARY_API_SECRET');

    if (!cloudName || !apiKey || !apiSecret) {
      throw new Error('Cloudinary configuration is missing');
    }

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });
  }

  async uploadImage(
    file: Express.Multer.File,
    folder: string,
  ): Promise<string> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    // Validate file type and size
    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('Only image files are allowed');
    }
    if (file.size > 1000000) {
      throw new BadRequestException('File size exceeds 1MB limit');
    }

    try {
      const result = await new Promise<UploadApiResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder, resource_type: 'image' },
          (error, result) => {
            if (error) return reject(error);
            if (!result) return reject(new Error('Upload failed'));
            resolve(result);
          },
        );
        toStream(file.buffer).pipe(uploadStream);
      });

      return result.secure_url;
    } catch (error) {
      throw new BadRequestException(`Failed to upload image: ${error.message}`);
    }
  }

  async uploadMultipleImages(
    files: Express.Multer.File[],
    folder: string,
  ): Promise<string[]> {
    if (!files || files.length === 0) {
      return [];
    }

    if (files.length > 10) {
      throw new BadRequestException('Cannot upload more than 10 images');
    }

    try {
      const uploadPromises = files.map(async (file) => {
        // Validate file type and size
        if (!file.mimetype.startsWith('image/')) {
          throw new BadRequestException('Only image files are allowed');
        }
        if (file.size > 1000000) {
          throw new BadRequestException('File size exceeds 1MB limit');
        }

        const result = await new Promise<UploadApiResponse>(
          (resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { folder, resource_type: 'image' },
              (error, result) => {
                if (error) return reject(error);
                if (!result) return reject(new Error('Upload failed'));
                resolve(result);
              },
            );
            toStream(file.buffer).pipe(uploadStream);
          },
        );

        return result.secure_url;
      });

      return Promise.all(uploadPromises);
    } catch (error) {
      throw new BadRequestException(
        `Failed to upload images: ${error.message}`,
      );
    }
  }

  async deleteImage(imageUrl: string): Promise<void> {
    if (!imageUrl) return;

    try {
      const publicId = imageUrl.split('/').slice(-2).join('/').split('.')[0];
      await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
    } catch (error) {
      throw new BadRequestException(`Failed to delete image: ${error.message}`);
    }
  }

  async deleteMultipleImages(imageUrls: string[]): Promise<void> {
    if (!imageUrls || imageUrls.length === 0) return;

    try {
      const publicIds = imageUrls
        .map((url) => url.split('/').slice(-2).join('/').split('.')[0])
        .filter((id) => id);
      if (publicIds.length > 0) {
        await Promise.all(
          publicIds.map((publicId) =>
            cloudinary.uploader.destroy(publicId, { resource_type: 'image' }),
          ),
        );
      }
    } catch (error) {
      throw new BadRequestException(
        `Failed to delete images: ${error.message}`,
      );
    }
  }
}
