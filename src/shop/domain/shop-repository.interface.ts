import { Shop } from './shop.entity';

export interface ShopRepository {
  findById(id: string): Promise<Shop | null>;
  findByVendorId(vendorId: string): Promise<Shop[]>;
  findByNameAndVendor(name: string, vendorId: string): Promise<Shop | null>;
  save(shop: Shop): Promise<void>;
  update(shop: Shop): Promise<void>;
}
