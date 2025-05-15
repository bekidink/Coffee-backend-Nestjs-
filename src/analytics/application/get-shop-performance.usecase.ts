import { AnalyticsRepository } from '../domain/analytics-repository.interface';

export interface GetShopPerformanceUseCase {
  execute(
    shopId: string | null,
    startDate: Date,
    endDate: Date,
  ): Promise<
    {
      shopId: string;
      orderCount: number;
      totalRevenue: number;
    }[]
  >;
}

export class GetShopPerformanceUseCaseImpl
  implements GetShopPerformanceUseCase
{
  constructor(private readonly analyticsRepository: AnalyticsRepository) {}

  async execute(
    shopId: string | null,
    startDate: Date,
    endDate: Date,
  ): Promise<
    {
      shopId: string;
      orderCount: number;
      totalRevenue: number;
    }[]
  > {
    if (startDate > endDate) {
      throw new Error('Start date must be before end date');
    }
    return this.analyticsRepository.getShopPerformance(
      shopId,
      startDate,
      endDate,
    );
  }
}
