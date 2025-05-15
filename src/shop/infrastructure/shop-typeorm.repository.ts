import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shop } from '../domain/shop.entity';
import { ShopRepository } from '../domain/shop-repository.interface';
import { ShopTypeOrmEntity } from './shop-typeorm.entity';

@Injectable()
export class ShopTypeOrmRepository implements ShopRepository {
  constructor(
    @InjectRepository(ShopTypeOrmEntity)
    private readonly repository: Repository<ShopTypeOrmEntity>,
  ) {}

  async findById(id: string): Promise<Shop | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;
    return new Shop(
      entity.id,
      entity.vendorId,
      entity.name,
      entity.description,
      entity.logoUrl,
      entity.contactPhone,
      entity.contactEmail,
      entity.location,
      entity.operatingHours,
      entity.isActive,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  async findByVendorId(vendorId: string): Promise<Shop[]> {
    const entities = await this.repository.find({ where: { vendorId } });
    return entities.map(
      (entity) =>
        new Shop(
          entity.id,
          entity.vendorId,
          entity.name,
          entity.description,
          entity.logoUrl,
          entity.contactPhone,
          entity.contactEmail,
          entity.location,
          entity.operatingHours,
          entity.isActive,
          entity.createdAt,
          entity.updatedAt,
        ),
    );
  }

  async findByNameAndVendor(
    name: string,
    vendorId: string,
  ): Promise<Shop | null> {
    const entity = await this.repository.findOne({ where: { name, vendorId } });
    if (!entity) return null;
    return new Shop(
      entity.id,
      entity.vendorId,
      entity.name,
      entity.description,
      entity.logoUrl,
      entity.contactPhone,
      entity.contactEmail,
      entity.location,
      entity.operatingHours,
      entity.isActive,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  async save(shop: Shop): Promise<void> {
    await this.repository.save({
      id: shop.id,
      vendorId: shop.vendorId,
      name: shop.name,
      description: shop.description,
      logoUrl: shop.logoUrl,
      contactPhone: shop.contactPhone,
      contactEmail: shop.contactEmail,
      location: shop.location,
      operatingHours: shop.operatingHours,
      isActive: shop.isActive,
      createdAt: shop.createdAt,
      updatedAt: shop.updatedAt,
    });
  }

  async update(shop: Shop): Promise<void> {
    await this.repository.update(shop.id, {
      name: shop.name,
      description: shop.description!,
      logoUrl: shop.logoUrl!,
      contactPhone: shop.contactPhone!,
      contactEmail: shop.contactEmail!,
      location: shop.location!,
      operatingHours: shop.operatingHours!,
      isActive: shop.isActive,
      updatedAt: shop.updatedAt,
    });
  }
}
