import { AnalyticsRepository } from '../domain/analytics-repository.interface';

export interface GetSalesReportUseCase {
  execute(
    shopId: string | null,
    startDate: Date,
    endDate: Date,
  ): Promise<{
    totalSales: number;
    orderCount: number;
    averageOrderValue: number;
  }>;
}

export class GetSalesReportUseCaseImpl implements GetSalesReportUseCase {
  constructor(private readonly analyticsRepository: AnalyticsRepository) {}

  async execute(
    shopId: string | null,
    startDate: Date,
    endDate: Date,
  ): Promise<{
    totalSales: number;
    orderCount: number;
    averageOrderValue: number;
  }> {
    if (startDate > endDate) {
      throw new Error('Start date must be before end date');
    }
    return this.analyticsRepository.getSalesReport(shopId, startDate, endDate);
  }
}
