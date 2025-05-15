import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Promotion } from '../domain/promotion.entity';
import { PromotionRepository } from '../domain/promotion-repository.interface';
import { PromotionTypeOrmEntity } from './promotion-typeorm.entity';

@Injectable()
export class PromotionTypeOrmRepository implements PromotionRepository {
  constructor(
    @InjectRepository(PromotionTypeOrmEntity)
    private readonly repository: Repository<PromotionTypeOrmEntity>,
  ) {}

  async findById(id: string): Promise<Promotion | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;
    return new Promotion(
      entity.id,
      entity.shopId,
      entity.menuItemId,
      entity.title,
      entity.description,
      entity.discountType,
      entity.discountValue,
      entity.validFrom,
      entity.validUntil,
      entity.isActive,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  async findByShopId(shopId: string): Promise<Promotion[]> {
    const entities = await this.repository.find({ where: { shopId } });
    return entities.map(
      (entity) =>
        new Promotion(
          entity.id,
          entity.shopId,
          entity.menuItemId,
          entity.title,
          entity.description,
          entity.discountType,
          entity.discountValue,
          entity.validFrom,
          entity.validUntil,
          entity.isActive,
          entity.createdAt,
          entity.updatedAt,
        ),
    );
  }

  async findByMenuItemId(menuItemId: string): Promise<Promotion[]> {
    const entities = await this.repository.find({ where: { menuItemId } });
    return entities.map(
      (entity) =>
        new Promotion(
          entity.id,
          entity.shopId,
          entity.menuItemId,
          entity.title,
          entity.description,
          entity.discountType,
          entity.discountValue,
          entity.validFrom,
          entity.validUntil,
          entity.isActive,
          entity.createdAt,
          entity.updatedAt,
        ),
    );
  }

  async save(promotion: Promotion): Promise<void> {
    await this.repository.save({
      id: promotion.id,
      shopId: promotion.shopId,
      menuItemId: promotion.menuItemId,
      title: promotion.title,
      description: promotion.description,
      discountType: promotion.discountType,
      discountValue: promotion.discountValue,
      validFrom: promotion.validFrom,
      validUntil: promotion.validUntil,
      isActive: promotion.isActive,
      createdAt: promotion.createdAt,
      updatedAt: promotion.updatedAt,
    });
  }

  async update(promotion: Promotion): Promise<void> {
    await this.repository.update(promotion.id, {
      title: promotion.title,
      description: promotion.description,
      discountType: promotion.discountType,
      discountValue: promotion.discountValue,
      validFrom: promotion.validFrom,
      validUntil: promotion.validUntil,
      isActive: promotion.isActive,
      updatedAt: promotion.updatedAt,
    });
  }
}
