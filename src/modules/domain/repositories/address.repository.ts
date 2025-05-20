// src/domain/repositories/address.repository.ts
import { Address } from '../entities/address.entity';

export interface IAddressRepository {
  save(address: Address): Promise<Address>;
  findById(id: string): Promise<Address | null>;
  findByEntityId(
    entityId: string,
    entityType: 'CUSTOMER' | 'SHOP',
  ): Promise<Address[]>;
  findDefaultByEntityId(
    entityId: string,
    entityType: 'CUSTOMER' | 'SHOP',
  ): Promise<Address | null>;
  update(address: Address): Promise<Address>;
  delete(id: string): Promise<void>;
  findNearbyShops(
    latitude: number,
    longitude: number,
    radiusKm: number,
  ): Promise<Address[]>;
}
