import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from '../domain/staff.entity';
import { StaffRepository } from '../domain/staff-repository.interface';
import { StaffTypeOrmEntity } from './staff-typeorm.entity';

@Injectable()
export class StaffTypeOrmRepository implements StaffRepository {
  constructor(
    @InjectRepository(StaffTypeOrmEntity)
    private readonly repository: Repository<StaffTypeOrmEntity>,
  ) {}

  async findById(id: string): Promise<Staff | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;
    return new Staff(
      entity.id,
      entity.userId,
      entity.shopId,
      entity.role,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  async findByShopId(shopId: string): Promise<Staff[]> {
    const entities = await this.repository.find({ where: { shopId } });
    return entities.map(
      (entity) =>
        new Staff(
          entity.id,
          entity.userId,
          entity.shopId,
          entity.role,
          entity.createdAt,
          entity.updatedAt,
        ),
    );
  }

  async findByUserId(userId: string): Promise<Staff | null> {
    const entity = await this.repository.findOne({ where: { userId } });
    if (!entity) return null;
    return new Staff(
      entity.id,
      entity.userId,
      entity.shopId,
      entity.role,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  async save(staff: Staff): Promise<void> {
    await this.repository.save({
      id: staff.id,
      userId: staff.userId,
      shopId: staff.shopId,
      role: staff.role,
      createdAt: staff.createdAt,
      updatedAt: staff.updatedAt,
    });
  }

  async update(staff: Staff): Promise<void> {
    await this.repository.update(staff.id, {
      role: staff.role,
      updatedAt: staff.updatedAt,
    });
  }
}
