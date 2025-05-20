// src/application/dtos/search.dto.ts
export class SearchProductsDto {
  keyword?: string;
  category?: string;
  shopId?: string;
  priceMin?: number;
  priceMax?: number;
  ratingMin?: number;
  inStock?: boolean;
  page: number = 1;
  pageSize: number = 10;
  sortBy?: 'relevance' | 'price_asc' | 'price_desc' | 'rating_desc';
}

export class SearchShopsDto {
  keyword?: string;
  latitude?: number;
  longitude?: number;
  radiusKm?: number;
  ratingMin?: number;
  page: number = 1;
  pageSize: number = 10;
  sortBy?: 'relevance' | 'distance' | 'rating_desc';
}

export class SearchPromotionsDto {
  keyword?: string;
  shopId?: string;
  activeOnly?: boolean;
  page: number = 1;
  pageSize: number = 10;
}
