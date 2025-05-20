// src/application/services/promotion.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { IPromotionRepository } from '../../domain/repositories/promotion.repository';
import { Promotion } from '../../domain/entities/promotion.entity';
import { PromotionType } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class PromotionService {
  constructor(
    private promotionRepository: IPromotionRepository,
    private prisma: PrismaService,
  ) {}

  async createPromotion(data: {
    code: string;
    type: PromotionType;
    value: number;
    description: string;
    startDate: Date;
    endDate: Date;
    minOrderAmount?: number;
    maxUses?: number;
    shopId?: string;
    productId?: string;
    isActive?: boolean;
  }): Promise<Promotion> {
    // Validate code uniqueness
    const existing = await this.promotionRepository.findByCode(data.code);
    if (existing) {
      throw new BadRequestException('Promotion code already exists');
    }

    // Validate shopId if provided
    if (data.shopId) {
      const shopExists = await this.prisma.shop.findUnique({
        where: { id: data.shopId },
      });
      if (!shopExists) {
        throw new BadRequestException('Invalid shop ID');
      }
    }

    // Validate productId if provided
    if (data.productId) {
      const productExists = await this.prisma.product.findUnique({
        where: { id: data.productId },
      });
      if (!productExists) {
        throw new BadRequestException('Invalid product ID');
      }
    }

    try {
      const promotion = Promotion.create(data);
      return await this.promotionRepository.save(promotion);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Promotion code already exists');
      }
      throw new BadRequestException(
        `Failed to create promotion: ${error.message}`,
      );
    }
  }

  async updatePromotion(
    id: string,
    data: Partial<{
      code: string;
      type: PromotionType;
      value: number;
      description: string;
      startDate: Date;
      endDate: Date;
      minOrderAmount: number | null;
      maxUses: number | null;
      shopId: string | null;
      productId: string | null;
      isActive: boolean;
    }>,
  ): Promise<Promotion> {
    const promotion = await this.promotionRepository.findById(id);
    if (!promotion) {
      throw new NotFoundException(`Promotion with ID ${id} not found`);
    }

    // Validate code uniqueness if changed
    if (data.code && data.code !== promotion.code) {
      const existing = await this.promotionRepository.findByCode(data.code);
      if (existing) {
        throw new BadRequestException('Promotion code already exists');
      }
    }

    // Validate shopId if provided
    if (data.shopId) {
      const shopExists = await this.prisma.shop.findUnique({
        where: { id: data.shopId },
      });
      if (!shopExists) {
        throw new BadRequestException('Invalid shop ID');
      }
    }

    // Validate productId if provided
    if (data.productId) {
      const productExists = await this.prisma.product.findUnique({
        where: { id: data.productId },
      });
      if (!productExists) {
        throw new BadRequestException('Invalid product ID');
      }
    }

    try {
    //   promotion.update(data);
      return await this.promotionRepository.update(promotion);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Promotion code already exists');
      }
      throw new BadRequestException(
        `Failed to update promotion: ${error.message}`,
      );
    }
  }

  async findById(id: string): Promise<Promotion> {
    const promotion = await this.promotionRepository.findById(id);
    if (!promotion) {
      throw new NotFoundException(`Promotion with ID ${id} not found`);
    }
    return promotion;
  }

  async findByCode(code: string): Promise<Promotion> {
    const promotion = await this.promotionRepository.findByCode(code);
    if (!promotion) {
      throw new NotFoundException(`Promotion with code ${code} not found`);
    }
    return promotion;
  }

  async findByShopId(shopId: string): Promise<Promotion[]> {
    // Validate shopId
    const shopExists = await this.prisma.shop.findUnique({
      where: { id: shopId },
    });
    if (!shopExists) {
      throw new BadRequestException('Invalid shop ID');
    }
    return this.promotionRepository.findByShopId(shopId);
  }

//   async findAll(): Promise<Promotion[]> {
//     return this.promotionRepository.;
//   }

  async deletePromotion(id: string): Promise<void> {
    const promotion = await this.promotionRepository.findById(id);
    if (!promotion) {
      throw new NotFoundException(`Promotion with ID ${id} not found`);
    }

    // Check for related records
    const hasUsages = await this.prisma.promotionUsage.count({
      where: { promotionId: id },
    });
    const hasOrders = await this.prisma.order.count({
      where: { promotionId: id },
    });
    if (hasUsages || hasOrders) {
      throw new BadRequestException(
        'Cannot delete promotion with usages or orders',
      );
    }

    try {
    //   await this.promotionRepository.delete(id);
    } catch (error) {
      throw new BadRequestException(
        `Failed to delete promotion: ${error.message}`,
      );
    }
  }
}
