// src/application/use-cases/analytics/get-customer-analytics.use-case.ts
import { Injectable } from '@nestjs/common';
import { IAnalyticsRepository } from '../../../domain/repositories/analytics.repository';
import { IVendorRepository } from '../../../domain/repositories/vendor.repository';
import { AnalyticsFilterDto } from '../../dtos/analytics.dto';

@Injectable()
export class GetCustomerAnalyticsUseCase {
  constructor(
    private analyticsRepository: IAnalyticsRepository,
    private vendorRepository: IVendorRepository,
  ) {}

  async execute(
    dto: AnalyticsFilterDto,
    requesterId: string,
    requesterRole: 'VENDOR' | 'ADMIN',
  ): Promise<any> {
    const filters = this.prepareFilters(dto, requesterId, requesterRole);
    return this.analyticsRepository.getCustomerAnalytics(filters);
  }

  private prepareFilters(
    dto: AnalyticsFilterDto,
    requesterId: string,
    requesterRole: 'VENDOR' | 'ADMIN',
  ) {
    const filters: any = {};
    if (dto.startDate) filters.startDate = new Date(dto.startDate);
    if (dto.endDate) filters.endDate = new Date(dto.endDate);
    if (dto.vendorId) filters.vendorId = dto.vendorId;

    if (requesterRole === 'VENDOR') {
      filters.vendorId = requesterId; // Restrict to vendor's data
    }

    return filters;
  }
}
