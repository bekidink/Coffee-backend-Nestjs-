// src/presentation/controllers/search.controller.ts
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SearchProductsUseCase } from '../../application/use-cases/search/search-products.use-case';
import { SearchShopsUseCase } from '../../application/use-cases/search/search-shops.use-case';
import { SearchPromotionsUseCase } from '../../application/use-cases/search/search-promotions.use-case';
import {
  SearchProductsDto,
  SearchShopsDto,
  SearchPromotionsDto,
} from '../../application/dtos/search.dto';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import { OptionalJwtAuthGuard } from '../../infrastructure/auth/optional-jwt-auth.guard';

@Controller('search')
export class SearchController {
  constructor(
    private searchProductsUseCase: SearchProductsUseCase,
    private searchShopsUseCase: SearchShopsUseCase,
    private searchPromotionsUseCase: SearchPromotionsUseCase,
  ) {}

  @Get('products')
  @UseGuards(OptionalJwtAuthGuard)
  async searchProducts(@Query() dto: SearchProductsDto) {
    return this.searchProductsUseCase.execute(dto);
  }

  @Get('shops')
  @UseGuards(OptionalJwtAuthGuard)
  async searchShops(@Query() dto: SearchShopsDto) {
    return this.searchShopsUseCase.execute(dto);
  }

  @Get('promotions')
  @UseGuards(OptionalJwtAuthGuard)
  async searchPromotions(@Query() dto: SearchPromotionsDto) {
    return this.searchPromotionsUseCase.execute(dto);
  }
}
