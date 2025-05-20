// src/domain/repositorie/search.repository.ts
import { Product } from '../entities/product.entity';
import { Shop } from '../entities/shop.entity';
import { Promotion } from '../entities/promotion.entity';

export interface ISearchRepository {
  searchProducts(query: {
    keyword?: string;
    category?: string;
    shopId?: string;
    priceMin?: number;
    priceMax?: number;
    ratingMin?: number;
    inStock?: boolean;
    page: number;
    pageSize: number;
    sortBy?: 'relevance' | 'price_asc' | 'price_desc' | 'rating_desc';
  }): Promise<{ items: Product[]; total: number }>;

  searchShops(query: {
    keyword?: string;
    latitude?: number;
    longitude?: number;
    radiusKm?: number;
    ratingMin?: number;
    page: number;
    pageSize: number;
    sortBy?: 'relevance' | 'distance' | 'rating_desc';
  }): Promise<{ items: Shop[]; total: number }>;

  searchPromotions(query: {
    keyword?: string;
    shopId?: string;
    activeOnly?: boolean;
    page: number;
    pageSize: number;
  }): Promise<{ items: Promotion[]; total: number }>;
}
