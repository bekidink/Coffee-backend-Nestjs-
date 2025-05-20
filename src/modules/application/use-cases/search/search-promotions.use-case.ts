// src/application/use-cases/search/search-promotions.use-case.ts
import { Injectable } from '@nestjs/common';
import { ISearchRepository } from '../../../domain/repositories/search.repository';
import { SearchPromotionsDto } from '../../dtos/search.dto';
import { Promotion } from '../../../domain/entities/promotion.entity';

@Injectable()
export class SearchPromotionsUseCase {
  constructor(private searchRepository: ISearchRepository) {}

  async execute(
    dto: SearchPromotionsDto,
  ): Promise<{ items: Promotion[]; total: number }> {
    return this.searchRepository.searchPromotions({
      keyword: dto.keyword,
      shopId: dto.shopId,
      activeOnly: dto.activeOnly,
      page: dto.page,
      pageSize: dto.pageSize,
    });
  }
}
