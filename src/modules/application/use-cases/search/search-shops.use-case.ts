// src/application/use-cases/search/search-shops.use-case.ts
import { Injectable } from '@nestjs/common';
import { ISearchRepository } from '../../../domain/repositories/search.repository';
import { SearchShopsDto } from '../../dtos/search.dto';
import { Shop } from '../../../domain/entities/shop.entity';

@Injectable()
export class SearchShopsUseCase {
  constructor(private searchRepository: ISearchRepository) {}

  async execute(
    dto: SearchShopsDto,
  ): Promise<{ items: Shop[]; total: number }> {
    if (dto.ratingMin && (dto.ratingMin < 0 || dto.ratingMin > 5)) {
      throw new Error('ratingMin must be between 0 and 5');
    }
    if (
      (dto.latitude || dto.longitude || dto.radiusKm) &&
      !(dto.latitude && dto.longitude && dto.radiusKm)
    ) {
      throw new Error(
        'latitude, longitude, and radiusKm must all be provided for location-based search',
      );
    }

    return this.searchRepository.searchShops({
      keyword: dto.keyword,
      latitude: dto.latitude,
      longitude: dto.longitude,
      radiusKm: dto.radiusKm,
      ratingMin: dto.ratingMin,
      page: dto.page,
      pageSize: dto.pageSize,
      sortBy: dto.sortBy,
    });
  }
}
