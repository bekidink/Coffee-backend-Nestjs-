import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../domain/review.entity';
import { ReviewRepository } from '../domain/review-repository.interface';
import { ReviewTypeOrmEntity } from './review-typeorm.entity';

@Injectable()
export class ReviewTypeOrmRepository implements ReviewRepository {
  constructor(
    @InjectRepository(ReviewTypeOrmEntity)
    private readonly repository: Repository<ReviewTypeOrmEntity>,
  ) {}

  async findById(id: string): Promise<Review | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;
    return new Review(
      entity.id,
      entity.userId,
      entity.shopId,
      entity.menuItemId,
      entity.rating,
      entity.comment,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  async findByShopId(shopId: string): Promise<Review[]> {
    const entities = await this.repository.find({ where: { shopId } });
    return entities.map(
      (entity) =>
        new Review(
          entity.id,
          entity.userId,
          entity.shopId,
          entity.menuItemId,
          entity.rating,
          entity.comment,
          entity.createdAt,
          entity.updatedAt,
        ),
    );
  }

  async findByMenuItemId(menuItemId: string): Promise<Review[]> {
    const entities = await this.repository.find({ where: { menuItemId } });
    return entities.map(
      (entity) =>
        new Review(
          entity.id,
          entity.userId,
          entity.shopId,
          entity.menuItemId,
          entity.rating,
          entity.comment,
          entity.createdAt,
          entity.updatedAt,
        ),
    );
  }

  async findByUserAndShop(
    userId: string,
    shopId: string,
  ): Promise<Review | null> {
    const entity = await this.repository.findOne({ where: { userId, shopId } });
    if (!entity) return null;
    return new Review(
      entity.id,
      entity.userId,
      entity.shopId,
      entity.menuItemId,
      entity.rating,
      entity.comment,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  async save(review: Review): Promise<void> {
    await this.repository.save({
      id: review.id,
      userId: review.userId,
      shopId: review.shopId,
      menuItemId: review.menuItemId,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    });
  }

  async update(review: Review): Promise<void> {
    await this.repository.update(review.id, {
      rating: review.rating,
      comment: review.comment!,
      updatedAt: review.updatedAt,
    });
  }
}
