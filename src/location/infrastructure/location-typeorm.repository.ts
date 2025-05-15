import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from '../domain/location.entity';
import { LocationRepository } from '../domain/location-repository.interface';
import { LocationTypeOrmEntity } from './location-typeorm.entity';

@Injectable()
export class LocationTypeOrmRepository implements LocationRepository {
  constructor(
    @InjectRepository(LocationTypeOrmEntity)
    private readonly repository: Repository<LocationTypeOrmEntity>,
  ) {}

  async findById(id: string): Promise<Location | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;
    return new Location(
      entity.id,
      entity.shopId,
      entity.address,
      entity.latitude,
      entity.longitude,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  async findByShopId(shopId: string): Promise<Location | null> {
    const entity = await this.repository.findOne({ where: { shopId } });
    if (!entity) return null;
    return new Location(
      entity.id,
      entity.shopId,
      entity.address,
      entity.latitude,
      entity.longitude,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  async findNearby(
    latitude: number,
    longitude: number,
    radiusKm: number,
  ): Promise<Location[]> {
    // Haversine formula for distance calculation in SQL
    const entities = await this.repository.query(
      `
      SELECT *
      FROM locations
      WHERE (
        6371 * acos(
          cos(radians($1)) * cos(radians(latitude)) * cos(radians(longitude) - radians($2)) +
          sin(radians($1)) * sin(radians(latitude))
        )
      ) < $3
    `,
      [latitude, longitude, radiusKm],
    );

    return entities.map(
      (entity) =>
        new Location(
          entity.id,
          entity.shopId,
          entity.address,
          entity.latitude,
          entity.longitude,
          entity.created_at,
          entity.updated_at,
        ),
    );
  }

  async save(location: Location): Promise<void> {
    await this.repository.save({
      id: location.id,
      shopId: location.shopId,
      address: location.address,
      latitude: location.latitude,
      longitude: location.longitude,
      createdAt: location.createdAt,
      updatedAt: location.updatedAt,
    });
  }

  async update(location: Location): Promise<void> {
    await this.repository.update(location.id, {
      address: location.address,
      latitude: location.latitude,
      longitude: location.longitude,
      updatedAt: location.updatedAt,
    });
  }
}
