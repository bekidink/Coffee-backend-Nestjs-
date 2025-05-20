// src/application/use-cases/analytics/get-sales-analytics.use-case.ts
import { Injectable } from '@nestjs/common';
import { IAnalyticsRepository } from '../../../domain/repositories/analytics.repository';
import { IVendorRepository } from '../../../domain/repositories/vendor.repository';
import { IShopRepository } from '../../../domain/repositories/shop.repository';
import { AnalyticsFilterDto } from '../../dtos/analytics.dto';

@Injectable()
export class GetSalesAnalyticsUseCase {
  constructor(
    private analyticsRepository: IAnalyticsRepository,
    private vendorRepository: IVendorRepository,
    private shopRepository: IShopRepository,
  ) {}

  async execute(
    dto: AnalyticsFilterDto,
    requesterId: string,
    requesterRole: 'VENDOR' | 'ADMIN',
  ): Promise<any> {
    const filters = this.prepareFilters(dto, requesterId, requesterRole);
    return this.analyticsRepository.getSalesAnalytics(filters);
  }

  private prepareFilters(
    dto: AnalyticsFilterDto,
    requesterId: string,
    requesterRole: 'VENDOR' | 'ADMIN',
  ) {
    const filters: any = {};
    if (dto.startDate) filters.startDate = new Date(dto.startDate);
    if (dto.endDate) filters.endDate = new Date(dto.endDate);
    if (dto.shopId) filters.shopId = dto.shopId;
    if (dto.vendorId) filters.vendorId = dto.vendorId;

    if (requesterRole === 'VENDOR') {
      filters.vendorId = requesterId; // Restrict to vendor's data
    }

    return filters;
  }
}
