// src/infrastructure/repositorie/prisma-promotion.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { IPromotionRepository } from '../../domain/repositories/promotion.repository';
import { Promotion } from '../../domain/entities/promotion.entity';
import { PromotionUsage } from '../../domain/entities/promotion-usage.entity';

@Injectable()
export class PrismaPromotionRepository implements IPromotionRepository {
  constructor(private prisma: PrismaService) {}
  findAll(): Promise<Promotion[]> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async save(promotion: Promotion): Promise<Promotion> {
    const data = await this.prisma.promotion.create({
      data: {
        id: promotion.id,
        code: promotion.code,
        type: promotion.type,
        value: promotion.value,
        description: promotion.description,
        startDate: promotion.startDate,
        endDate: promotion.endDate,
        minOrderAmount: promotion.minOrderAmount,
        maxUses: promotion.maxUses,
        shopId: promotion.shopId,
        productId: promotion.productId,
        isActive: promotion.isActive,
        createdAt: promotion.createdAt,
        updatedAt: promotion.updatedAt,
      },
    });
    return Promotion.create({
      id: data.id,
      code: data.code,
      type: data.type,
      description: data.description,
      startDate: data.startDate,
      value: data.value,
      endDate: data.endDate,
    });
  }

  async findById(id: string): Promise<Promotion | null> {
    const data = await this.prisma.promotion.findUnique({ where: { id } });
    return data
      ? Promotion.create({
          id: data.id,
          code: data.code,
          type: data.type,
          description: data.description,
          startDate: data.startDate,
          value: data.value,
          endDate: data.endDate,
        })
      : null;
  }

  async findByCode(code: string): Promise<Promotion | null> {
    const data = await this.prisma.promotion.findUnique({ where: { code } });
    return data
      ? Promotion.create({
          id: data.id,
          code: data.code,
          type: data.type,
          description: data.description,
          startDate: data.startDate,
          value: data.value,
          endDate: data.endDate,
        })
      : null;
  }

  async findByShopId(shopId: string): Promise<Promotion[]> {
    const data = await this.prisma.promotion.findMany({
      where: { shopId, isActive: true },
    });
    return data.map((item) =>
      Promotion.create({
        id: item.id,
        code: item.code,
        type: item.type,
        description: item.description,
        startDate: item.startDate,
        value: item.value,
        endDate: item.endDate,
      }),
    );
  }

  async update(promotion: Promotion): Promise<Promotion> {
    const data = await this.prisma.promotion.update({
      where: { id: promotion.id },
      data: {
        code: promotion.code,
        type: promotion.type,
        value: promotion.value,
        description: promotion.description,
        startDate: promotion.startDate,
        endDate: promotion.endDate,
        minOrderAmount: promotion.minOrderAmount,
        maxUses: promotion.maxUses,
        shopId: promotion.shopId,
        productId: promotion.productId,
        isActive: promotion.isActive,
        updatedAt: promotion.updatedAt,
      },
    });
    return Promotion.create({
      id: data.id,
      code: data.code,
      type: data.type,
      description: data.description,
      startDate: data.startDate,
      value: data.value,
      endDate: data.endDate,
    });
  }

  async saveUsage(usage: PromotionUsage): Promise<PromotionUsage> {
    const data = await this.prisma.promotionUsage.create({
      data: {
        id: usage.id,
        promotionId: usage.promotionId,
        customerId: usage.customerId,
        orderId: usage.orderId,
        usedAt: usage.usedAt,
      },
    });
    return PromotionUsage.create({
      id: data.id,
     
      promotionId:data.promotionId,
      customerId:data.customerId,
      orderId:data.orderId
    });
  }

  async countUsages(promotionId: string): Promise<number> {
    return this.prisma.promotionUsage.count({ where: { promotionId } });
  }

  async hasCustomerUsedPromotion(
    promotionId: string,
    customerId: string,
  ): Promise<boolean> {
    const count = await this.prisma.promotionUsage.count({
      where: { promotionId, customerId },
    });
    return count > 0;
  }
}
