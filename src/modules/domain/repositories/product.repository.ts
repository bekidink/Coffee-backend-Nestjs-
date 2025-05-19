// src/domain/repositories/product.repository.ts
import { Product } from '../entities/product.entity';

export interface IProductRepository {
  save(product: Product): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  findByShopId(shopId: string): Promise<Product[]>;
  findByVendorId(vendorId: string): Promise<Product[]>;
  findByCategoryId(categoryId: string): Promise<Product[]>;
  findAll(): Promise<Product[]>;
  update(product: Product): Promise<Product>;
  delete(id: string): Promise<void>;
  assignToShop(productId: string, shopId: string): Promise<void>;
}
