import { AnalyticsRepository } from '../domain/analytics-repository.interface';

export interface GetCustomerActivityUseCase {
  execute(
    userId: string | null,
    startDate: Date,
    endDate: Date,
  ): Promise<
    {
      userId: string;
      orderCount: number;
      totalSpent: number;
    }[]
  >;
}

export class GetCustomerActivityUseCaseImpl
  implements GetCustomerActivityUseCase
{
  constructor(private readonly analyticsRepository: AnalyticsRepository) {}

  async execute(
    userId: string | null,
    startDate: Date,
    endDate: Date,
  ): Promise<
    {
      userId: string;
      orderCount: number;
      totalSpent: number;
    }[]
  > {
    if (startDate > endDate) {
      throw new Error('Start date must be before end date');
    }
    return this.analyticsRepository.getCustomerActivity(
      userId,
      startDate,
      endDate,
    );
  }
}
