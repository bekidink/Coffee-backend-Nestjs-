// src/domain/repositories/vendor.repository.ts
import { Vendor } from '../entities/vendor.entity';

export interface IVendorRepository {
  save(vendor: Vendor): Promise<Vendor>;
  findById(id: string): Promise<Vendor | null>;
  findByEmail(email: string): Promise<Vendor | null>;
  findAll(): Promise<Vendor[]>;
  update(vendor: Vendor): Promise<Vendor>;
}
