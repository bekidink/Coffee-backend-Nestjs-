// src/application/use-cases/search/search-products.use-case.ts
import { Injectable } from '@nestjs/common';
import { ISearchRepository } from '../../../domain/repositories/search.repository';
import { SearchProductsDto } from '../../dtos/search.dto';
import { Product } from '../../../domain/entities/product.entity';

@Injectable()
export class SearchProductsUseCase {
  constructor(private searchRepository: ISearchRepository) {}

  async execute(
    dto: SearchProductsDto,
  ): Promise<{ items: Product[]; total: number }> {
    if (dto.priceMin && dto.priceMax && dto.priceMin > dto.priceMax) {
      throw new Error('priceMin cannot be greater than priceMax');
    }
    if (dto.ratingMin && (dto.ratingMin < 0 || dto.ratingMin > 5)) {
      throw new Error('ratingMin must be between 0 and 5');
    }

    return this.searchRepository.searchProducts({
      keyword: dto.keyword,
      category: dto.category,
      shopId: dto.shopId,
      priceMin: dto.priceMin,
      priceMax: dto.priceMax,
      ratingMin: dto.ratingMin,
      inStock: dto.inStock,
      page: dto.page,
      pageSize: dto.pageSize,
      sortBy: dto.sortBy,
    });
  }
}
