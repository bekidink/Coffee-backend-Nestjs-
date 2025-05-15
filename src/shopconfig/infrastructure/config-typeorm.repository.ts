import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Config } from '../domain/config.entity';
import { ConfigRepository } from '../domain/config-repository.interface';
import { ConfigTypeOrmEntity } from './config-typeorm.entity';

@Injectable()
export class ConfigTypeOrmRepository implements ConfigRepository {
  constructor(
    @InjectRepository(ConfigTypeOrmEntity)
    private readonly repository: Repository<ConfigTypeOrmEntity>,
  ) {}

  async findById(id: string): Promise<Config | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;
    return new Config(
      entity.id,
      entity.shopId,
      entity.operatingHours,
      entity.deliveryEnabled,
      entity.pickupEnabled,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  async findByShopId(shopId: string): Promise<Config | null> {
    const entity = await this.repository.findOne({ where: { shopId } });
    if (!entity) return null;
    return new Config(
      entity.id,
      entity.shopId,
      entity.operatingHours,
      entity.deliveryEnabled,
      entity.pickupEnabled,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  async save(config: Config): Promise<void> {
    await this.repository.save({
      id: config.id,
      shopId: config.shopId,
      operatingHours: config.operatingHours,
      deliveryEnabled: config.deliveryEnabled,
      pickupEnabled: config.pickupEnabled,
      createdAt: config.createdAt,
      updatedAt: config.updatedAt,
    });
  }

  async update(config: Config): Promise<void> {
    await this.repository.update(config.id, {
      operatingHours: config.operatingHours,
      deliveryEnabled: config.deliveryEnabled,
      pickupEnabled: config.pickupEnabled,
      updatedAt: config.updatedAt,
    });
  }
}
