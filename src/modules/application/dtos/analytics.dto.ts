// src/application/dtos/analytics.dto.ts
export class AnalyticsFilterDto {
  startDate?: string; // ISO date string
  endDate?: string; // ISO date string
  shopId?: string;
  vendorId?: string;
}
