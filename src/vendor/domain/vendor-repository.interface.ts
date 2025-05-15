import { Vendor } from './vendor.entity';

export interface VendorRepository {
  findById(id: string): Promise<Vendor | null>;
  findByUserId(userId: string): Promise<Vendor | null>;
  save(vendor: Vendor): Promise<void>;
  update(vendor: Vendor): Promise<void>;
}
