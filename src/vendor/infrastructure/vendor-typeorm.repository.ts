import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from '../domain/vendor.entity';
import { VendorRepository } from '../domain/vendor-repository.interface';
import { VendorTypeOrmEntity } from './vendor-typeorm.entity';

@Injectable()
export class VendorTypeOrmRepository implements VendorRepository {
  constructor(
    @InjectRepository(VendorTypeOrmEntity)
    private readonly repository: Repository<VendorTypeOrmEntity>,
  ) {}

  async findById(id: string): Promise<Vendor | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;
    return new Vendor(
      entity.id,
      entity.userId,
      entity.businessName,
      entity.contactPhone,
      entity.contactEmail,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  async findByUserId(userId: string): Promise<Vendor | null> {
    const entity = await this.repository.findOne({ where: { userId } });
    if (!entity) return null;
    return new Vendor(
      entity.id,
      entity.userId,
      entity.businessName,
      entity.contactPhone,
      entity.contactEmail,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  async save(vendor: Vendor): Promise<void> {
    await this.repository.save({
      id: vendor.id,
      userId: vendor.userId,
      businessName: vendor.businessName,
      contactPhone: vendor.contactPhone,
      contactEmail: vendor.contactEmail,
      createdAt: vendor.createdAt,
      updatedAt: vendor.updatedAt,
    });
  }

  async update(vendor: Vendor): Promise<void> {
    await this.repository.update(vendor.id, {
      businessName: vendor.businessName,
      contactPhone: vendor.contactPhone!,
      contactEmail: vendor.contactEmail!,
      updatedAt: vendor.updatedAt,
    });
  }
}
