import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recommendation } from '../domain/recommendation.entity';
import { Preference } from '../domain/preference.entity';
import { RecommendationRepository } from '../domain/recommendation-repository.interface';
import { RecommendationTypeOrmEntity } from './recommendation-typeorm.entity';
import { PreferenceTypeOrmEntity } from './preference-typeorm.entity';
import { OrderTypeOrmEntity } from './order-typeorm.entity';

@Injectable()
export class RecommendationTypeOrmRepository
  implements RecommendationRepository
{
  constructor(
    @InjectRepository(RecommendationTypeOrmEntity)
    private readonly recommendationRepository: Repository<RecommendationTypeOrmEntity>,
    @InjectRepository(PreferenceTypeOrmEntity)
    private readonly preferenceRepository: Repository<PreferenceTypeOrmEntity>,
    @InjectRepository(OrderTypeOrmEntity)
    private readonly orderRepository: Repository<OrderTypeOrmEntity>,
  ) {}

  async findRecommendationsByUserId(userId: string): Promise<Recommendation[]> {
    const entities = await this.recommendationRepository.find({
      where: { userId },
    });
    return entities.map(
      (entity) =>
        new Recommendation(
          entity.id,
          entity.userId,
          entity.menuItemId,
          entity.score,
          entity.createdAt,
        ),
    );
  }

  async saveRecommendation(recommendation: Recommendation): Promise<void> {
    await this.recommendationRepository.save({
      id: recommendation.id,
      userId: recommendation.userId,
      menuItemId: recommendation.menuItemId,
      score: recommendation.score,
      createdAt: recommendation.createdAt,
    });
  }

  async findPreferencesByUserId(userId: string): Promise<Preference | null> {
    const entity = await this.preferenceRepository.findOne({
      where: { userId },
    });
    if (!entity) return null;
    return new Preference(
      entity.id,
      entity.userId,
      entity.dietaryRestrictions,
      entity.favoriteCategories,
      entity.updatedAt,
    );
  }

  async savePreferences(preferences: Preference): Promise<void> {
    await this.preferenceRepository.save({
      id: preferences.id,
      userId: preferences.userId,
      dietaryRestrictions: preferences.dietaryRestrictions,
      favoriteCategories: preferences.favoriteCategories,
      updatedAt: preferences.updatedAt,
    });
  }

  async getUserOrders(userId: string): Promise<{ menuItemId: string }[]> {
    const orders = await this.orderRepository.find({
      where: { userId },
      select: ['menuItemId'],
    });
    return orders.map((order) => ({ menuItemId: order.menuItemId }));
  }

  async getAllOrders(): Promise<{ userId: string; menuItemId: string }[]> {
    const orders = await this.orderRepository.find({
      select: ['userId', 'menuItemId'],
    });
    return orders.map((order) => ({
      userId: order.userId,
      menuItemId: order.menuItemId,
    }));
  }
}
