import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loyalty } from '../domain/loyalty.entity';
import { LoyaltyRepository } from '../domain/loyalty-repository.interface';
import { LoyaltyTypeOrmEntity } from './loyalty-typeorm.entity';

@Injectable()
export class LoyaltyTypeOrmRepository implements LoyaltyRepository {
  constructor(
    @InjectRepository(LoyaltyTypeOrmEntity)
    private readonly repository: Repository<LoyaltyTypeOrmEntity>,
  ) {}

  async findById(id: string): Promise<Loyalty | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;
    return new Loyalty(
      entity.id,
      entity.userId,
      entity.points,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  async findByUserId(userId: string): Promise<Loyalty | null> {
    const entity = await this.repository.findOne({ where: { userId } });
    if (!entity) return null;
    return new Loyalty(
      entity.id,
      entity.userId,
      entity.points,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  async save(loyalty: Loyalty): Promise<void> {
    await this.repository.save({
      id: loyalty.id,
      userId: loyalty.userId,
      points: loyalty.points,
      createdAt: loyalty.createdAt,
      updatedAt: loyalty.updatedAt,
    });
  }

  async update(loyalty: Loyalty): Promise<void> {
    await this.repository.update(loyalty.id, {
      points: loyalty.points,
      updatedAt: loyalty.updatedAt,
    });
  }
}
