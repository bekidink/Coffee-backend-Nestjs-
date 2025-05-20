// src/infrastructure/repositorie/prisma-address.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { IAddressRepository } from '../../domain/repositories/address.repository';
import { Address } from '../../domain/entities/address.entity';

@Injectable()
export class PrismaAddressRepository implements IAddressRepository {
  constructor(private prisma: PrismaService) {}

  async save(address: Address): Promise<Address> {
    const data = await this.prisma.address.create({
      data: {
        id: address.id,
        entityId: address.entityId,
        entityType: address.entityType ?? 'CUSTOMER',
        formattedAddress: address.formattedAddress,
        street: address.street,
        city: address.city,
        state: address.state,
        country: address.country,
        postalCode:address.postalCode,
        latitude: address.latitude,
        longitude: address.longitude,
        isDefault: address.isDefault,
        createdAt: address.createdAt,
        updatedAt: address.updatedAt,
      },
    });
    return Address.create(data);
  }

  async findById(id: string): Promise<Address | null> {
    const data = await this.prisma.address.findUnique({ where: { id } });
    return data ? Address.create(data) : null;
  }

  async findByEntityId(
    entityId: string,
    entityType: 'CUSTOMER' | 'SHOP',
  ): Promise<Address[]> {
    const data = await this.prisma.address.findMany({
      where: { entityId, entityType },
    });
    return data.map((item) => Address.create(item));
  }

  async findDefaultByEntityId(
    entityId: string,
    entityType: 'CUSTOMER' | 'SHOP',
  ): Promise<Address | null> {
    const data = await this.prisma.address.findFirst({
      where: { entityId, entityType, isDefault: true },
    });
    return data ? Address.create(data) : null;
  }

  async update(address: Address): Promise<Address> {
    const data = await this.prisma.address.update({
      where: { id: address.id },
      data: {
        formattedAddress: address.formattedAddress,
        latitude: address.latitude,
        longitude: address.longitude,
        isDefault: address.isDefault,
        updatedAt: address.updatedAt,
      },
    });
    return Address.create(data);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.address.delete({ where: { id } });
  }

  async findNearbyShops(
    latitude: number,
    longitude: number,
    radiusKm: number,
  ): Promise<Address[]> {
    // Note: Prisma doesn't support native geospatial queries, so we fetch all shop addresses and filter using Haversine
    const shopAddresses = await this.prisma.address.findMany({
      where: { entityType: 'SHOP' },
    });
    const filteredAddresses = shopAddresses.filter((addr) => {
      const distance = this.calculateHaversineDistance(
        latitude,
        longitude,
        addr.latitude,
        addr.longitude,
      );
      return distance <= radiusKm;
    });
    return filteredAddresses.map((item) => Address.create(item));
  }

  private calculateHaversineDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  }
}
